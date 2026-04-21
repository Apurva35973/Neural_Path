export const modules = [
  {
    id: 'decision-trees',
    title: 'Decision Trees',
    level: 'Beginner',
    description: 'Learn how decision trees split data using feature-based rules to make predictions. Understand information gain, Gini impurity, and tree pruning.',
    layman: 'Imagine you are playing "20 Questions". You ask a question (like "Is it an animal?"), and the answer helps you narrow down what the thing is. A Decision Tree does exactly that with data!',
    sections: [
      {
        heading: 'What Is a Decision Tree?',
        body: 'A decision tree is a supervised learning algorithm used for both classification and regression tasks. It works by recursively splitting the dataset into subsets based on the value of input features.',
      },
      {
        heading: 'Splitting Criteria',
        body: 'Algorithms use metrics like Gini Impurity or Information Gain (Entropy) to decide which feature splits the data best at each node.',
      },
      {
        heading: 'Overfitting',
        body: 'Trees can become too complex. Pruning is used to simplify the tree and help it generalise to new data.',
      },
    ],
    code: {
      javascript: `// Decision Tree classification in JS (Concept)
function predict(node, sample) {
  if (node.isLeaf) return node.label;
  if (sample[node.feature] <= node.threshold) {
    return predict(node.left, sample);
  } else {
    return predict(node.right, sample);
  }
}`,
      java: `// Decision Tree Predict in Java
public class DecisionTree {
    public String predict(Node node, Map<String, Double> sample) {
        if (node.isLeaf) return node.label;
        if (sample.get(node.feature) <= node.threshold) {
            return predict(node.left, sample);
        } else {
            return predict(node.right, sample);
        }
    }
}`,
      cpp: `// Decision Tree Predict in C++
string predict(Node* node, map<string, double>& sample) {
    if (node->isLeaf) return node->label;
    if (sample[node->feature] <= node->threshold) {
        return predict(node->left, sample);
    } else {
        return predict(node->right, sample);
    }
}`,
    },
  },
  {
    id: 'neural-networks',
    title: 'Neural Networks',
    level: 'Beginner',
    description: 'Explore the building blocks of deep learning — neurons, layers, activation functions, and back-propagation.',
    layman: 'Think of a stadium crowd doing "The Wave". One person stands up, then their neighbor, then the next. A Neural Network is like millions of tiny connections passing signals to reach a final decision.',
    sections: [
      {
        heading: 'Neurons and Layers',
        body: 'An artificial neural network is inspired by biological neurons. It has input, hidden, and output layers.',
      },
      {
        heading: 'Activation Functions',
        body: 'Activation functions like ReLU or Sigmoid introduce non-linearity, allowing the network to learn complex patterns.',
      },
      {
        heading: 'Back-propagation',
        body: 'The standard algorithm for training networks by calculating the error at the output and propagating it back to adjust weights.',
      },
    ],
    code: {
      javascript: `// Simple Neuron calculation
const activate = x => 1 / (1 + Math.exp(-x));
const output = activate(inputs.reduce((acc, val, i) => acc + val * weights[i], bias));`,
      java: `// Neuron Activation in Java
public double sigmoid(double x) {
    return 1 / (1 + Math.exp(-x));
}
double output = sigmoid(dotProduct(inputs, weights) + bias);`,
      cpp: `// Neuron Activation in C++
double sigmoid(double x) {
    return 1.0 / (1.0 + exp(-x));
}
double output = sigmoid(inner_product(inputs.begin(), inputs.end(), weights.begin(), 0.0) + bias);`,
    },
  },
  {
    id: 'classification',
    title: 'Classification',
    level: 'Intermediate',
    description: 'Understand supervised classification algorithms like Logistic Regression and SVMs.',
    layman: 'Classification is like sorting laundry. You look at a garment and decide if it belongs in the "Socks" pile or the "Shirts" pile based on its features.',
    sections: [
      {
        heading: 'What Is Classification?',
        body: 'Classification is a supervised learning task where the model learns to assign input samples to one of a set of predefined categories.',
      },
      {
        heading: 'Decision Boundaries',
        body: 'Algorithms find a boundary in feature space that separates different classes.',
      },
      {
        heading: 'Metrics',
        body: 'Precision, Recall, and F1-score are crucial for evaluating how well the classifier is performing.',
      },
    ],
    code: {
      javascript: `// Logistic Regression prediction
const predict = (x, weights) => {
  const score = weights.reduce((acc, w, i) => acc + w * x[i], 0);
  return 1 / (1 + Math.exp(-score)) > 0.5 ? 1 : 0;
}`,
      java: `// Logistic Regression in Java
public int predict(double[] x, double[] weights) {
    double score = 0;
    for (int i = 0; i < x.length; i++) score += weights[i] * x[i];
    return (1 / (1 + Math.exp(-score))) > 0.5 ? 1 : 0;
}`,
      cpp: `// Logistic Regression in C++
int predict(const vector<double>& x, const vector<double>& weights) {
    double score = inner_product(x.begin(), x.end(), weights.begin(), 0.0);
    return (1.0 / (1.0 + exp(-score))) > 0.5 ? 1 : 0;
}`,
    },
  },
  {
    id: 'clustering',
    title: 'Clustering & K-Means',
    level: 'Intermediate',
    description: 'Discover unsupervised clustering techniques — K-Means and how to group unlabelled data.',
    layman: 'If you dropped a bunch of different colored Legos on the floor, clustering is the act of grouping all the red ones here, the blue ones there, and the yellow ones over there.',
    sections: [
      {
        heading: 'Unsupervised Learning',
        body: 'Clustering works with unlabelled data, finding hidden structures on its own.',
      },
      {
        heading: 'K-Means Algorithm',
        body: 'Iteratively moves centroids to the center of data point groups until they stabilize.',
      },
      {
        heading: 'Choosing K',
        body: 'Methods like the "Elbow Method" help determine the optimal number of groups.',
      },
    ],
    code: {
      javascript: `// K-Means: Assigning points to centroids
const getClosestCentroid = (point, centroids) => {
  let min = Infinity, closest = 0;
  centroids.forEach((c, i) => {
    const dist = distance(point, c);
    if (dist < min) { min = dist; closest = i; }
  });
  return closest;
}`,
      java: `// K-Means centroid assignment in Java
int getClosestCentroid(double[] point, double[][] centroids) {
    double min = Double.MAX_VALUE; int closest = 0;
    for (int i = 0; i < centroids.length; i++) {
        double d = distance(point, centroids[i]);
        if (d < min) { min = d; closest = i; }
    }
    return closest;
}`,
      cpp: `// K-Means in C++
int getClosestCentroid(const vector<double>& point, const vector<vector<double>>& centroids) {
    double min = numeric_limits<double>::max(); int closest = 0;
    for (int i = 0; i < centroids.size(); i++) {
        double d = euclidean_distance(point, centroids[i]);
        if (d < min) { min = d; closest = i; }
    }
    return closest;
}`,
    },
  },
  {
    id: 'regression',
    title: 'Linear Regression',
    level: 'Advanced',
    description: 'Master the mathematics behind linear regression — least squares and gradient descent.',
    layman: 'Regression is like predicting how tall a kid will be based on their current height. We find the "best fit" line that connects the dots.',
    sections: [
      {
        heading: 'Simple Linear Regression',
        body: 'Modelling the relationship between a dependent and independent variable using a straight line.',
      },
      {
        heading: 'Loss Functions',
        body: 'Mean Squared Error (MSE) measures the difference between actual and predicted values.',
      },
      {
        heading: 'Gradient Descent',
        body: 'An optimization algorithm used to minimize the loss function by iteratively moving toward the bottom of the "valley".',
      },
    ],
    code: {
      javascript: `// MSE Calculation
const mse = (yTrue, yPred) => 
  yTrue.reduce((acc, val, i) => acc + Math.pow(val - yPred[i], 2), 0) / yTrue.length;`,
      java: `// MSE in Java
public double mse(double[] yTrue, double[] yPred) {
    double sum = 0;
    for (int i = 0; i < yTrue.length; i++) sum += Math.pow(yTrue[i] - yPred[i], 2);
    return sum / yTrue.length;
}`,
      cpp: `// MSE in C++
double mse(const vector<double>& yTrue, const vector<double>& yPred) {
    double sum = 0;
    for (size_t i = 0; i < yTrue.size(); ++i) sum += pow(yTrue[i] - yPred[i], 2);
    return sum / yTrue.size();
}`,
    },
  },
  {
    id: 'svm',
    title: 'Support Vector Machines',
    level: 'Intermediate',
    description: 'Find the maximum margin hyperplane that separates classes with high accuracy.',
    layman: 'Imagine you want to build a white fence between a crowd of red fans and blue fans. SVM finds the path for the fence that stays as far as possible from both groups.',
    sections: [
      {
        heading: 'Hyperplanes',
        body: 'In SVM, we look for a boundary (hyperplane) that separates classes with the widest gap.',
      },
      {
        heading: 'Support Vectors',
        body: 'These are the data points closest to the hyperplane — they are the most important for defining the boundary.',
      },
      {
        heading: 'Kernel Trick',
        body: 'Allows SVM to create non-linear boundaries by transforming data into higher dimensions.',
      },
    ],
    code: {
      javascript: `// Simple SVM-like hinge loss calculation
const hingeLoss = (y, score) => Math.max(0, 1 - y * score);`,
      java: `// Hinge Loss in Java
public double hingeLoss(int y, double score) {
    return Math.max(0, 1 - y * score);
}`,
      cpp: `// Hinge Loss in C++
double hingeLoss(int y, double score) {
    return max(0.0, 1.0 - y * score);
}`,
    },
  },
  {
    id: 'random-forest',
    title: 'Random Forest',
    level: 'Intermediate',
    description: 'Harness the power of ensembles by combining multiple decision trees.',
    layman: 'Instead of asking one expert for advice, you ask a thousand. Some might be wrong, but on average, the group will reach the best decision. That is a Random Forest!',
    sections: [
      {
        heading: 'Ensemble Learning',
        body: 'Random Forest combines many weak learners (Decision Trees) into one robust model.',
      },
      {
        heading: 'Bagging',
        body: 'Short for "Bootstrap Aggregating", it involves training each tree on a random subset of data.',
      },
      {
        heading: 'Feature Randomness',
        body: 'Each tree only sees a random subset of features, ensuring they stay diverse.',
      },
    ],
    code: {
      javascript: `// Forest prediction via majority vote
const forestPredict = (forest, sample) => {
  const votes = forest.map(tree => tree.predict(sample));
  return getMajority(votes);
}`,
      java: `// Random Forest Vote in Java
public String vote(List<Tree> forest, Map<String, Double> sample) {
    List<String> votes = forest.stream().map(t -> t.predict(sample)).collect(toList());
    return majorityOf(votes);
}`,
      cpp: `// Random Forest Vote in C++
string vote(const vector<Tree>& forest, const map<string, double>& sample) {
    vector<string> votes;
    for(auto& t : forest) votes.push_back(t.predict(sample));
    return majorityOf(votes);
}`,
    },
  },
  {
    id: 'gradient-descent',
    title: 'Gradient Descent',
    level: 'Advanced',
    description: 'The engine of AI: optimize parameters by following the steepest descent.',
    layman: 'You are blindfolded on a foggy mountain and want to find the bottom. You feel with your feet which way is down and take a small step. Repeat until you are at the bottom!',
    sections: [
      {
        heading: 'Optimization',
        body: 'Gradient Descent is an algorithm used to minimize a function (the loss) by iteratively moving in the direction of steepest descent.',
      },
      {
        heading: 'Learning Rate',
        body: 'Determines the size of the steps. Too large, and you miss the bottom. Too small, and it takes forever.',
      },
      {
        heading: 'Local vs Global Minima',
        body: 'The challenge of getting stuck in a small "dip" instead of the truly lowest point.',
      },
    ],
    code: {
      javascript: `// Param update in Gradient Descent
const update = (w, gradient, lr) => w - lr * gradient;`,
      java: `// Weight update in Java
public double update(double w, double gradient, double lr) {
    return w - lr * gradient;
}`,
      cpp: `// Weight update in C++
double update(double w, double gradient, double lr) {
    return w - lr * gradient;
}`,
    },
  },
  {
    id: 'pca',
    title: 'PCA (Dimensionality Reduction)',
    level: 'Advanced',
    description: 'Compress complex data into its most important components.',
    layman: 'Imagine taking a photo of a 3D statue. You lose one dimension, but you can still recognize the statue. PCA finds the best angle to take that photo to keep the most detail.',
    sections: [
      {
        heading: 'Variance Maximization',
        body: 'PCA finds the directions (principal components) where the data varies the most.',
      },
      {
        heading: 'Dimensionality Reduction',
        body: 'By ignoring less important components, we can simplify data and speed up other algorithms.',
      },
      {
        heading: 'Eigenvectors and Eigenvalues',
        body: 'The linear algebra tools used to find the principal components.',
      },
    ],
    code: {
      javascript: `// Concept of projectiing data onto a component
const project = (data, component) => dotProduct(data, component);`,
      java: `// PCA Projection in Java
public double project(double[] data, double[] component) {
    return dotProduct(data, component);
}`,
      cpp: `// PCA Projection in C++
double project(const vector<double>& data, const vector<double>& component) {
    return inner_product(data.begin(), data.end(), component.begin(), 0.0);
}`,
    },
  },
  {
    id: 'reinforcement-learning',
    title: 'Reinforcement Learning',
    level: 'Advanced',
    description: 'Train agents to make decisions by rewarding good actions and penalizing bad ones.',
    layman: 'Think of training a puppy. You give a treat for a good trick and say "No" for a bad one. Eventually, the puppy learns to do the tricks to get the most treats!',
    sections: [
      {
        heading: 'Agents and Environments',
        body: 'An agent interacts with an environment, taking actions and observing outcomes.',
      },
      {
        heading: 'Rewards and Penalties',
        body: 'The feedback loop that guides the agent toward its goal.',
      },
      {
        heading: 'Policy and Q-Learning',
        body: 'The strategy an agent uses to decide which action to take next to maximize total reward.',
      },
    ],
    code: {
      javascript: `// Q-Learning update rule
qTable[state][action] = qTable[state][action] + alpha * (reward + gamma * Math.max(...qTable[nextState]) - qTable[state][action]);`,
      java: `// Q-Learning Update in Java
qTable[s][a] += alpha * (r + gamma * max(qTable[nextS]) - qTable[s][a]);`,
      cpp: `// Q-Learning Update in C++
qTable[s][a] += alpha * (r + gamma * (*max_element(qTable[nextS].begin(), qTable[nextS].end())) - qTable[s][a]);`,
    },
  },
];
