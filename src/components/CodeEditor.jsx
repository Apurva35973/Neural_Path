import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, Copy, CheckCircle2 } from 'lucide-react';

const LANGUAGE_TEMPLATES = {
  javascript: `// NeuralPath JavaScript Template
function runSimulation() {
  console.log("Starting simulation...");
  // Your logic here
  return "Model trained successfully!";
}

runSimulation();`,
  java: `// NeuralPath Java Template
public class Main {
    public static void main(String[] args) {
        System.out.println("NeuralPath Simulation Started");
        // Your logic here
    }
}`,
  cpp: `// NeuralPath C++ Template
#include <iostream>

int main() {
    std::cout << "NeuralPath Simulation Started" << std::endl;
    return 0;
}`,
  c: `// NeuralPath C Template
#include <stdio.h>

int main() {
    printf("NeuralPath Simulation Started\\n");
    return 0;
}`,
  csharp: `// NeuralPath C# Template
using System;

class Program {
    static void Main() {
        Console.WriteLine("NeuralPath Simulation Started");
    }
}`
};

export default function CodeEditor({ initialLanguage = 'javascript', initialCode, onRun }) {
  const [language, setLanguage] = useState(initialLanguage);
  const [code, setCode] = useState(initialCode || LANGUAGE_TEMPLATES[initialLanguage]);
  const [output, setOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialCode) setCode(initialCode);
    else setCode(LANGUAGE_TEMPLATES[language]);
  }, [language, initialCode]);

  const handleRun = () => {
    setIsRunning(true);
    setOutput(["[System] Initializing environment...", "[System] Compiling source...", "[System] Executing..."]);
    
    // Simulate execution
    setTimeout(() => {
      setOutput(prev => [...prev, `[Output] Simulation results ready for ${language}.`, "[Output] Accuracy: 94.2%", "[System] Execution finished."]);
      setIsRunning(false);
      if (onRun) onRun();
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-[600px] bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
      {/* ToolBar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-4">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-700 text-slate-200 text-sm rounded-md px-3 py-1.5 outline-none focus:ring-2 focus:ring-indigo-500 border-none transition-all"
          >
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="csharp">C#</option>
          </select>
          <div className="h-4 w-[1px] bg-slate-600" />
          <button 
            onClick={copyToClipboard}
            className="text-slate-400 hover:text-slate-200 transition-colors"
            title="Copy Code"
          >
            {copied ? <CheckCircle2 size={18} className="text-green-500" /> : <Copy size={18} />}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCode(LANGUAGE_TEMPLATES[language])}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-md transition-all"
            title="Reset"
          >
            <RotateCcw size={18} />
          </button>
          <button 
            onClick={handleRun}
            disabled={isRunning}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md font-medium transition-all ${
              isRunning 
                ? 'bg-slate-700 text-slate-500' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg active:scale-95'
            }`}
          >
            <Play size={16} fill="currentColor" />
            {isRunning ? 'Running...' : 'Run Simulation'}
          </button>
        </div>
      </div>

      {/* Editor & Console Split */}
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="flex-1 min-h-[300px]">
          <Editor
            height="100%"
            language={language}
            value={code}
            onChange={setCode}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 16 },
              smoothScrolling: true,
              cursorBlinking: 'smooth',
            }}
          />
        </div>

        {/* Console Box */}
        <div className="w-full md:w-80 bg-slate-950 border-t md:border-t-0 md:border-l border-slate-700 p-4 font-mono text-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 uppercase tracking-wider text-xs font-bold">Console Output</span>
            <button onClick={() => setOutput([])} className="text-slate-600 hover:text-slate-400 text-xs">Clear</button>
          </div>
          <div className="space-y-1 overflow-y-auto max-h-[200px] md:max-h-none">
            {output.length === 0 ? (
              <span className="text-slate-700">Ready to execute...</span>
            ) : (
              output.map((line, i) => (
                <div key={i} className={`flex gap-2 ${
                  line.startsWith('[System]') ? 'text-indigo-400' : 
                  line.startsWith('[Output]') ? 'text-emerald-400 font-bold' : 'text-slate-300'
                }`}>
                  <span className="text-slate-600 select-none">{i + 1}</span>
                  <span>{line}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
