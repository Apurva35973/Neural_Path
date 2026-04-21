import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/chat', async (req, res) => {
  const { messages, context } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Valid messages array is required.' });
  }

  // Filter out any messages without content
  const validMessages = messages.filter(m => m.content && m.content.trim() !== '');

  if (validMessages.length === 0) {
    return res.status(400).json({ error: 'Messages must contain content.' });
  }

  try {
    const systemPrompt = `You are NeuralPath AI Tutor. Teach AI/ML concepts simply, clearly, and practically.
Context: The user is currently learning about ${context || 'General AI/ML'}.
Maintain chat history. Explain concepts in simple terms (ELI5 if requested).
Solve coding doubts and provide examples in Java, Python, C++, or JavaScript.
Generate quiz questions if asked.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...validMessages
      ],
      temperature: 0.7,
    });

    res.json({
      role: 'assistant',
      content: response.choices[0].message.content,
    });
  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
