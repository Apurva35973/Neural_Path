export const BADGES = [
  { id: 'tree_detective', name: 'Logic Master', description: 'Mastered Decision Trees', icon: '🌳', iconName: 'Trees' },
  { id: 'fit_line', name: 'Regression Wizard', description: 'Perfected Linear Regression', icon: '📈', iconName: 'LineChart' },
  { id: 'spam_catcher', name: 'Classification Pro', description: 'Superb Email Sorting', icon: '📩', iconName: 'Shield' },
  { id: 'cluster_fruits', name: 'Cluster King', description: 'Organized Data Clusters', icon: '🍎', iconName: 'LayoutGrid' },
  { id: 'train_robot', name: 'Robot Whisperer', description: 'Taught the Robot well', icon: '🤖', iconName: 'Bot' },
  { id: 'hyperplane_hero', name: 'Separator', description: 'Defined the Perfect Margin', icon: '🛡️', iconName: 'Divide' },
  { id: 'neural_connect', name: 'Neural Architect', description: 'Linked all Neurons', icon: '⚡', iconName: 'Activity' },
  { id: 'gradient_escape', name: 'Mountain Climber', description: 'Found the Global Minimum', icon: '⛰️', iconName: 'TrendingDown' },
];

export const LEVELS = [
  { level: 1, minXp: 0, title: 'Novice' },
  { level: 2, minXp: 200, title: 'Explorer' },
  { level: 3, minXp: 500, title: 'Analyst' },
  { level: 4, minXp: 1000, title: 'Expert' },
  { level: 5, minXp: 2000, title: 'Master' },
  { level: 6, minXp: 4000, title: 'Champion' },
  { level: 7, minXp: 7000, title: 'Legend' },
  { level: 8, minXp: 11000, title: 'Wizard' },
  { level: 9, minXp: 16000, title: 'Neural God' },
  { level: 10, minXp: 25000, title: 'AI Overlord' },
];

export const GAME_METADATA = {
  'decision-tree': {
    name: 'Decision Tree Detective',
    concept: 'Decision Trees & Classification',
    summary: 'You learned how Decision Trees classify using yes/no branching logic.',
    application: 'Used in Loan Approval, Medical Diagnosis, and Credit Scoring.',
    difficulty: 1,
  },
  'fit-the-line': {
    name: 'Fit The Line',
    concept: 'Linear Regression',
    summary: 'You learned how Regression predicts values using a best-fit line.',
    application: 'Used in Price Prediction, Trend Analysis, and Sales Forecasting.',
    difficulty: 1,
  },
  'spam-catcher': {
    name: 'Spam Catcher',
    concept: 'Binary Classification',
    summary: 'You learned how classifiers sort data into two distinct categories.',
    application: 'Used in Email Filtering, Fraud Detection, and Medical Screening.',
    difficulty: 2,
  },
  'cluster-fruits': {
    name: 'Cluster Fruits',
    concept: 'K-Means Clustering',
    summary: 'You learned how Clustering groups similar data without labels.',
    application: 'Used in Customer Segmentation, Image Compression, and Anomaly Detection.',
    difficulty: 2,
  },
  'train-robot': {
    name: 'Train The Robot',
    concept: 'Reinforcement Learning',
    summary: 'You learned Reinforcement Learning using rewards and penalties.',
    application: 'Used in Robotics, Self-Driving Cars, and AlphaGo.',
    difficulty: 3,
  },
  'hyperplane-hero': {
    name: 'Hyperplane Hero',
    concept: 'Support Vector Machines (SVM)',
    summary: 'You learned how SVM separates categories using an optimal boundary.',
    application: 'Used in Face Detection, Bioinformatics, and Text Classification.',
    difficulty: 3,
  },
  'neural-connect': {
    name: 'Neural Connect',
    concept: 'Neural Networks',
    summary: 'You learned how Neural Networks pass signals through multiple layers.',
    application: 'Used in Image Recognition, NLP, and Deep Learning.',
    difficulty: 3,
  },
  'gradient-escape': {
    name: 'Gradient Escape',
    concept: 'Gradient Descent',
    summary: 'You learned how Gradient Descent reduces error to find the minimum.',
    application: 'Used in Training almost all AI models to minimize loss.',
    difficulty: 2,
  },
};
