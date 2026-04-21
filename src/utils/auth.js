const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

export function register(name, email, pass) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const exists = users.find(u => u.email === email);
  if (exists) return { error: 'Email already registered' };
  const user = {
    name,
    email,
    pass,
    score: 0,
    xp: 0,
    coins: 0,
    level: 1,
    streak: 0,
    badges: [],
    gameHistory: [],
    masteredConcepts: [],
    completedModules: [],
    lastActive: new Date().toISOString(),
  };
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return { user };
}

export function login(email, pass) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const user = users.find(u => u.email === email && u.pass === pass);
  if (!user) return { error: 'Invalid email or password' };
  user.lastActive = new Date().toISOString();
  const idx = users.findIndex(u => u.email === email);
  users[idx] = user;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return { user };
}

export function getUser() {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function updateUser(data) {
  const current = getUser();
  if (!current) return null;
  const updated = { ...current, ...data, lastActive: new Date().toISOString() };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updated));
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const idx = users.findIndex(u => u.email === current.email);
  if (idx !== -1) {
    users[idx] = updated;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
  return updated;
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}
