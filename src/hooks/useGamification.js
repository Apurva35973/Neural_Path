import { useState, useCallback } from 'react';
import { getUser, updateUser } from '../utils/auth';
import { LEVELS, BADGES } from '../data/gamification';

export function useGamification() {
  const [user, setUser] = useState(getUser);

  const refreshUser = useCallback(() => {
    const updated = getUser();
    setUser(updated);
    return updated;
  }, []);

  const addGameResult = useCallback((gameId, result) => {
    const current = getUser();
    if (!current) return null;

    const { score, accuracy, time, mistakes } = result;
    
    // XP and Coin logic
    const xpEarned = Math.round(score * (accuracy / 100));
    const coinsEarned = Math.round(score / 5);
    
    const newXp = (current.xp || 0) + xpEarned;
    const newCoins = (current.coins || 0) + coinsEarned;
    
    // Level Up logic
    const nextLevel = LEVELS.find(l => newXp >= l.minXp && (!LEVELS[LEVELS.indexOf(l) + 1] || newXp < LEVELS[LEVELS.indexOf(l) + 1].minXp));
    const level = nextLevel ? nextLevel.level : current.level;

    // Badge Logic
    const gameIdToBadge = {
      'decision-tree': 'tree_detective',
      'fit-the-line': 'fit_line',
      'spam-catcher': 'spam_catcher',
      'cluster-fruits': 'cluster_fruits',
      'train-robot': 'train_robot',
      'hyperplane-hero': 'hyperplane_hero',
      'neural-connect': 'neural_connect',
      'gradient-escape': 'gradient_escape'
    };

    const badgeId = gameIdToBadge[gameId];
    const newBadges = [...(current.badges || [])];
    let badgeUnlocked = null;

    if (badgeId && !newBadges.includes(badgeId) && accuracy >= 90) {
      newBadges.push(badgeId);
      badgeUnlocked = BADGES.find(b => b.id === badgeId);
    }

    // History
    const historyItem = {
      gameId,
      score,
      accuracy,
      time,
      date: new Date().toISOString()
    };

    const updatedData = {
      xp: newXp,
      coins: newCoins,
      level,
      badges: newBadges,
      gameHistory: [historyItem, ...(current.gameHistory || [])].slice(0, 50), // Keep last 50
      score: (current.score || 0) + xpEarned // Sync score with XP for leaderboard
    };

    const updatedUser = updateUser(updatedData);
    setUser(updatedUser);

    return {
      xpEarned,
      coinsEarned,
      badgeUnlocked,
      newLevel: level > current.level ? level : null,
      rank: accuracy >= 90 ? 'Gold' : accuracy >= 70 ? 'Silver' : 'Bronze'
    };
  }, []);

  return {
    user,
    refreshUser,
    addGameResult,
    BADGES,
    LEVELS
  };
}
