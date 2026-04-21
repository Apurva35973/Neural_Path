export const quizzes = {
  'decision-trees': [
    { q: 'What does a decision tree use to split data at each node?', options: ['Random selection', 'Feature-based rules and splitting criteria', 'Neural network weights', 'Gradient descent'], answer: 1, explanation: 'Decision trees evaluate features using criteria like Information Gain or Gini Impurity to choose the best split at each internal node.' },
    { q: 'What does a Gini Impurity value of 0 indicate?', options: ['Maximum disorder', 'Equal distribution', 'Perfect purity', 'Overfitting'], answer: 2, explanation: 'A Gini value of 0 means every sample in the node belongs to the same class.' },
    { q: 'Which technique helps prevent a decision tree from overfitting?', options: ['Adding features', 'Increasing depth', 'Pruning', 'Removing validation data'], answer: 2, explanation: 'Pruning reduces tree complexity and prevents memorising training data.' },
    { q: 'In a decision tree, what does a leaf node represent?', options: ['A test', 'A branch', 'A final prediction', 'A root'], answer: 2, explanation: 'Leaf nodes hold the final output.' },
    { q: 'What ensemble method combines many decision trees?', options: ['Linear Regression', 'Random Forest', 'K-Means', 'SVM'], answer: 1, explanation: 'Random Forests aggregate predictions from multiple trees.' }
  ],
  'neural-networks': [
    { q: 'What is the purpose of an activation function?', options: ['Weight initialization', 'Handling non-linearity', 'Data normalization', 'Reducing learning rate'], answer: 1, explanation: 'Activation functions allow networks to learn non-linear patterns.' },
    { q: 'What does back-propagation compute?', options: ['Predictions', 'Loss', 'Gradients of the loss w.r.t weights', 'Optimal step size'], answer: 2, explanation: 'It uses the chain rule to compute gradients for weight updates.' },
    { q: 'Which activation function outputs (0, 1)?', options: ['ReLU', 'Tanh', 'Sigmoid', 'Leaky ReLU'], answer: 2, explanation: 'Sigmoid squashes input into the 0-1 range.' },
    { q: 'What is an epoch?', options: ['A single update', 'A full pass through the training data', 'A layer', 'A neuron'], answer: 1, explanation: 'One epoch is one complete pass over the dataset.' },
    { q: 'What does a deep neural network have?', options: ['One layer', 'No weights', 'Multiple hidden layers', 'Only inputs'], answer: 2, explanation: 'Deep learning implies many hidden layers.' }
  ],
  'classification': [
    { q: 'What type of task is classification?', options: ['Unsupervised', 'Reinforcement', 'Supervised', 'Dimensionality reduction'], answer: 2, explanation: 'It learns from labelled data.' },
    { q: 'What does Precision measure?', options: ['Actual positives identified', 'Positive predictions that are actual positives', 'Accuracy', 'Error rate'], answer: 1, explanation: 'Precision = TP / (TP + FP).' },
    { q: 'Which is a multi-class classifier example?', options: ['Spam detection', 'Digit recognition 0-9', 'Predicting house price', 'Coin flip prediction'], answer: 1, explanation: 'Digit recognition involves 10 classes.' },
    { q: 'What is the F1-Score?', options: ['Mean of all scores', 'Harmonic mean of precision and recall', 'Accuracy squared', 'Sum of weights'], answer: 1, explanation: 'F1 balances precision and recall.' },
    { q: 'Which algorithm finds a hyperplane to separate classes?', options: ['K-Means', 'SVM', 'Linear Regression', 'PCA'], answer: 1, explanation: 'SVM searches for a maximum-margin hyperplane.' }
  ],
  'clustering': [
    { q: 'What type of learning is clustering?', options: ['Supervised', 'Unsupervised', 'Reinforcement', 'Transfer'], answer: 1, explanation: 'It groups unlabelled data.' },
    { q: 'What does K-Means minimize?', options: ['Centroid count', 'Within-cluster sum of squares', 'Iteration count', 'Learning rate'], answer: 1, explanation: 'K-Means minimizes inertia (WCSS).' },
    { q: 'What is the Elbow Method used for?', options: ['Updating weights', 'Choosing K', 'Reducing dimensions', 'Smoothing lines'], answer: 1, explanation: 'It plots inertia vs K to find the "elbow".' },
    { q: 'What can DBSCAN do that K-Means cannot easily do?', options: ['Find spherical clusters', 'Identify noise/outliers', 'Run faster', 'Predict values'], answer: 1, explanation: 'DBSCAN handles noise and arbitrary shapes.' },
    { q: 'What is the Silhouette Score range?', options: ['0 to 1', '-1 to 1', 'Infinity to 0', '0 to 100'], answer: 1, explanation: 'Higher values near 1 indicate well-separated clusters.' }
  ],
  'regression': [
    { q: 'What does OLS stand for?', options: ['Optimal Linear Selection', 'Ordinary Least Squares', 'Only Linear Solutions', 'Overfit Least Squares'], answer: 1, explanation: 'Ordinary Least Squares minimizes squared residuals.' },
    { q: 'What is the bias term in y = mx + b?', options: ['m', 'x', 'b', 'y'], answer: 2, explanation: 'b is the y-intercept (bias).' },
    { q: 'What happens if the learning rate is too high?', options: ['Slow convergence', 'Overshooting/Divergence', 'Underfitting', 'Nothing'], answer: 1, explanation: 'Gradient descent may oscillate or fail to find the minimum.' },
    { q: 'Which regression handles L1 regularization?', options: ['Ridge', 'Lasso', 'Elastic Net', 'OLS'], answer: 1, explanation: 'Lasso (L1) can zero out coefficients.' },
    { q: 'What does R-squared measure?', options: ['The slope', 'The variance explained by the model', 'The error rate', 'The learning speed'], answer: 1, explanation: 'R2 shows how well the independent variables explain the target variance.' }
  ],
  'svm': [
    { q: 'What is the main goal of SVM?', options: ['Minimize weight values', 'Maximize the margin between classes', 'Cluster data into groups', 'Reduce dimensions'], answer: 1, explanation: 'SVM finds the best hyperplane to separate classes with maximum margin.' },
    { q: 'What are Support Vectors?', options: ['Mean values of features', 'Points closest to the decision boundary', 'The weights in a neural network', 'Outliers in the data'], answer: 1, explanation: 'Support vectors are the points actually defining the decision boundary.' },
    { q: 'What does the Kernel Trick do?', options: ['Speeds up learning', 'Maps data to a higher-dimensional space', 'Filters out noise', 'Reduces overfitting'], answer: 1, explanation: 'It allows SVM to find non-linear boundaries.' },
    { q: 'Which is a common SVM kernel?', options: ['ReLU', 'RBF (Radial Basis Function)', 'Sigmoid', 'Mean Absolute Error'], answer: 1, explanation: 'RBF is widely used for non-linear data.' },
    { q: 'What happens when we use a "soft margin"?', options: ['No errors allowed', 'Some misclassifications allowed to generalize better', 'The line becomes a curve', 'Training stops early'], answer: 1, explanation: 'Soft margins handle overlapping data points.' }
  ],
  'random-forest': [
    { q: 'How does Random Forest make a classification?', options: ['By a single expert tree', 'By majority voting from many trees', 'By taking the average of all weights', 'By clustering the output'], answer: 1, explanation: 'The forest uses the consensus of its member trees.' },
    { q: 'What is Bootstrapping?', options: ['Hardcoding logic', 'Training on random subsets of data with replacement', 'Adding more features', 'Visualizing the forest'], answer: 1, explanation: 'It creates different training sets for different trees.' },
    { q: 'Why do trees in a forest stay diverse?', options: ['They have different names', 'They use random subsets of features for each split', 'They are grown in different orders', 'They use different loss functions'], answer: 1, explanation: 'Feature randomness prevents trees from looking identical.' },
    { q: 'Is Random Forest more prone to overfitting than a single tree?', options: ['Yes', 'No, it reduces variance', 'They are the same', 'Only on small data'], answer: 1, explanation: 'By averaging many trees, Random Forest significantly reduces overfitting.' },
    { q: 'What is "Out-of-Bag" (OOB) error?', options: ['Error in the packaging', 'Error calculated on data samples not seen by a particular tree', 'The loss at the root node', 'The maximum possible error'], answer: 1, explanation: 'OOB samples act as a built-in validation set.' }
  ],
  'gradient-descent': [
    { q: 'What is the "Gradient" in Gradient Descent?', options: ['A type of layer', 'The vector of partial derivatives', 'The final prediction', 'The learning rate'], answer: 1, explanation: 'The gradient points to the direction of steepest ascent.' },
    { q: 'Why do we use "Stochastic" Gradient Descent (SGD)?', options: ['It is more accurate', 'It is faster for large data as it uses one sample at a time', 'It prevents overfitting', 'It works only for deep learning'], answer: 1, explanation: 'SGD updates parameters after every single sample instead of the whole batch.' },
    { q: 'What is a "local minimum"?', options: ['The ultimate best solution', 'A low point that is not the absolute lowest', 'The starting point', 'A point with zero weights'], answer: 1, explanation: 'Optimization might get stuck in a "dip" thinking it found the bottom.' },
    { q: 'What does the Learning Rate control?', options: ['Accuracy', 'Step size during updates', 'Number of layers', 'Data size'], answer: 1, explanation: 'It scales the gradient to update the weights.' },
    { q: 'What is "Momentum" in optimization?', options: ['Speeding up updates using previous gradients', 'Adding random noise', 'Stopping early', 'Visualizing results'], answer: 0, explanation: 'Momentum helps the optimizer push through shallow local minima.' }
  ],
  'pca': [
    { q: 'What is the primary goal of PCA?', options: ['Predicting labels', 'Reducing dimensions while keeping variance', 'Clustering data', 'Building trees'], answer: 1, explanation: 'PCA compresses data into Principal Components.' },
    { q: 'What is a Principal Component?', options: ['The main feature of data', 'A direction in feature space with the most variance', 'The bias term', 'The classification result'], answer: 1, explanation: 'The first component captures the "main" trend in the data.' },
    { q: 'PCA is what type of learning?', options: ['Supervised', 'Unsupervised', 'Reinforcement', 'Labelled'], answer: 1, explanation: 'PCA doesn\'t need labels to find patterns in data.' },
    { q: 'What does Scree Plot show?', options: ['Predictions', 'Explained variance by each component', 'Loss over time', 'Tree depth'], answer: 1, explanation: 'It helps decide how many components to keep.' },
    { q: 'Can PCA be used to visualize high-dimensional data?', options: ['Yes, by reducing it to 2 or 3 dimensions', 'No, PCA is for math only', 'Only for linear data', 'Only with SVM'], answer: 0, explanation: 'PCA is great for making 2D or 3D scatter plots of complex data.' }
  ],
  'reinforcement-learning': [
    { q: 'Who is the main actor in RL?', options: ['The environment', 'The user', 'The agent', 'The hardware'], answer: 2, explanation: 'The agent learns to perform actions.' },
    { q: 'What does the agent receive after an action?', options: ['A label', 'A reward or penalty', 'A gradient', 'A new feature'], answer: 1, explanation: 'Feedback comes in the form of rewards.' },
    { q: 'What is a "Policy" in RL?', options: ['A legal document', 'The strategy to choose actions', 'The final score', 'The learning rate'], answer: 1, explanation: 'A policy maps states to actions.' },
    { q: 'What does "Exploitation" mean in RL?', options: ['Taking random actions', 'Using known good actions to get rewards', 'Training the agent', 'Evaluating the model'], answer: 1, explanation: 'Exploitation is using what you\'ve learned, vs Exploration which is tried new things.' },
    { q: 'What is the "Discount Factor" (Gamma)?', options: ['The percentage of error', 'Importance given to future rewards', 'The number of neurons', 'The speed of light'], answer: 1, explanation: 'Gamma determines if the agent cares about immediate vs long-term rewards.' }
  ]
};
