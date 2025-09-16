import { useState, useEffect, useCallback } from 'react';
import { GameState, FoodItem, CosmeticItem, UpgradeItem, Achievement, DailyChallenge } from '@/types/game';

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-click',
    name: 'First Bite',
    description: 'Click the character 10 times',
    completed: false,
    reward: 100,
    icon: 'fas fa-mouse-pointer',
    requirement: 10,
  },
  {
    id: 'weight-gain',
    name: 'Getting Started',
    description: 'Reach 200 lbs',
    completed: false,
    reward: 500,
    icon: 'fas fa-weight',
    requirement: 200,
  },
  {
    id: 'big-spender',
    name: 'Big Spender',
    description: 'Spend 10,000 calories',
    completed: false,
    reward: 2000,
    icon: 'fas fa-coins',
    requirement: 10000,
  },
  {
    id: 'food-lover',
    name: 'Food Lover',
    description: 'Eat 50 food items',
    completed: false,
    reward: 1000,
    icon: 'fas fa-utensils',
    requirement: 50,
  },
  {
    id: 'heavyweight',
    name: 'Heavyweight',
    description: 'Reach 500 lbs',
    completed: false,
    reward: 5000,
    icon: 'fas fa-trophy',
    requirement: 500,
  },
];

const INITIAL_GAME_STATE: GameState = {
  character: {
    name: '',
    gender: 'male',
    skinTone: 1,
    weight: 150,
    weightStage: 1,
    health: 85,
    happiness: 70,
    energy: 60,
    clickPower: 1,
  },
  currency: {
    calories: 1000,
  },
  upgrades: {
    clickMultiplier: 1,
    autoEater: 0,
    metabolismBooster: 0,
    happinessMultiplier: 1,
  },
  inventory: [],
  cosmetics: {
    hairstyle: 'default',
    clothing: 'default',
    accessories: [],
  },
  rebirth: {
    rebirthCount: 0,
    totalMultiplier: 1,
    currentGoal: 1000000, // 1 million pounds
  },
  achievements: [...INITIAL_ACHIEVEMENTS],
  dailyChallenge: null,
  miniGames: {
    lottery: {
      lastPlay: 0,
      dailyPlays: 0,
    },
  },
  isInitialized: false,
};

const FOOD_ITEMS: FoodItem[] = [
  // Healthy Foods
  { id: 'salad', name: 'Salad', emoji: '🥗', category: 'healthy', weightGain: 5, healthEffect: 10, happinessEffect: 0, energyEffect: 5, price: 50 },
  { id: 'apple', name: 'Apple', emoji: '🍎', category: 'healthy', weightGain: 3, healthEffect: 8, happinessEffect: 2, energyEffect: 3, price: 30 },
  { id: 'carrot', name: 'Carrot', emoji: '🥕', category: 'healthy', weightGain: 2, healthEffect: 6, happinessEffect: 1, energyEffect: 2, price: 25 },
  { id: 'broccoli', name: 'Broccoli', emoji: '🥦', category: 'healthy', weightGain: 4, healthEffect: 12, happinessEffect: -2, energyEffect: 4, price: 40 },
  
  // Junk Foods
  { id: 'burger', name: 'Burger', emoji: '🍔', category: 'junk', weightGain: 15, healthEffect: -5, happinessEffect: 8, energyEffect: -3, price: 100 },
  { id: 'pizza', name: 'Pizza', emoji: '🍕', category: 'junk', weightGain: 20, healthEffect: -8, happinessEffect: 10, energyEffect: -5, price: 150 },
  { id: 'fries', name: 'Fries', emoji: '🍟', category: 'junk', weightGain: 12, healthEffect: -3, happinessEffect: 6, energyEffect: -2, price: 80 },
  { id: 'hotdog', name: 'Hot Dog', emoji: '🌭', category: 'junk', weightGain: 18, healthEffect: -6, happinessEffect: 7, energyEffect: -4, price: 120 },
  { id: 'taco', name: 'Taco', emoji: '🌮', category: 'junk', weightGain: 14, healthEffect: -4, happinessEffect: 8, energyEffect: -2, price: 90 },
  { id: 'chicken', name: 'Fried Chicken', emoji: '🍗', category: 'junk', weightGain: 22, healthEffect: -7, happinessEffect: 9, energyEffect: -3, price: 140 },
  
  // Desserts
  { id: 'cake', name: 'Cake', emoji: '🍰', category: 'dessert', weightGain: 30, healthEffect: -10, happinessEffect: 15, energyEffect: 5, price: 200 },
  { id: 'cookie', name: 'Cookie', emoji: '🍪', category: 'dessert', weightGain: 8, healthEffect: -2, happinessEffect: 5, energyEffect: 2, price: 60 },
  { id: 'donut', name: 'Donut', emoji: '🍩', category: 'dessert', weightGain: 25, healthEffect: -8, happinessEffect: 12, energyEffect: 3, price: 180 },
  { id: 'icecream', name: 'Ice Cream', emoji: '🍦', category: 'dessert', weightGain: 22, healthEffect: -6, happinessEffect: 10, energyEffect: 4, price: 160 },
  { id: 'chocolate', name: 'Chocolate', emoji: '🍫', category: 'dessert', weightGain: 16, healthEffect: -4, happinessEffect: 8, energyEffect: 6, price: 120 },
  { id: 'candy', name: 'Candy', emoji: '🍬', category: 'dessert', weightGain: 10, healthEffect: -3, happinessEffect: 6, energyEffect: 8, price: 70 },
];

const COSMETIC_ITEMS: CosmeticItem[] = [
  // Hairstyles
  { id: 'short-hair', name: 'Short Hair', type: 'hairstyle', price: 200 },
  { id: 'long-hair', name: 'Long Hair', type: 'hairstyle', price: 250 },
  { id: 'curly-hair', name: 'Curly Hair', type: 'hairstyle', price: 300 },
  { id: 'spiky-hair', name: 'Spiky Hair', type: 'hairstyle', price: 280 },
  { id: 'bald', name: 'Bald', type: 'hairstyle', price: 150 },
  
  // Clothing
  { id: 'tshirt', name: 'T-Shirt', type: 'clothing', price: 150, emoji: '👕' },
  { id: 'suit', name: 'Suit', type: 'clothing', price: 500, emoji: '👔' },
  { id: 'dress', name: 'Dress', type: 'clothing', price: 300, emoji: '👗' },
  { id: 'jeans', name: 'Jeans', type: 'clothing', price: 200, emoji: '👖' },
  { id: 'hoodie', name: 'Hoodie', type: 'clothing', price: 250 },
  { id: 'tank-top', name: 'Tank Top', type: 'clothing', price: 120 },
  { id: 'sweater', name: 'Sweater', type: 'clothing', price: 280 },
  { id: 'jacket', name: 'Jacket', type: 'clothing', price: 350 },
  
  // Accessories
  { id: 'glasses', name: 'Glasses', type: 'accessory', price: 100, emoji: '👓' },
  { id: 'hat', name: 'Hat', type: 'accessory', price: 120, emoji: '🎩' },
  { id: 'sunglasses', name: 'Sunglasses', type: 'accessory', price: 150, emoji: '🕶️' },
  { id: 'watch', name: 'Watch', type: 'accessory', price: 200, emoji: '⌚' },
];

const UPGRADE_ITEMS: UpgradeItem[] = [
  {
    id: 'click-multiplier',
    name: 'Click Multiplier',
    description: 'Doubles your click power',
    icon: 'fas fa-mouse-pointer',
    price: 1000,
    currentLevel: 1,
    effect: 'clickPower',
  },
  {
    id: 'auto-eater',
    name: 'Auto Eater',
    description: 'Automatically gains weight per second',
    icon: 'fas fa-robot',
    price: 2000,
    currentLevel: 0,
    effect: 'autoEater',
  },
  {
    id: 'metabolism-booster',
    name: 'Metabolism Booster',
    description: 'Improves health regeneration',
    icon: 'fas fa-heart',
    price: 1500,
    currentLevel: 0,
    effect: 'metabolismBooster',
  },
  {
    id: 'happiness-multiplier',
    name: 'Happiness Multiplier',
    description: 'Increases happiness gain from food',
    icon: 'fas fa-smile',
    price: 3000,
    currentLevel: 0,
    effect: 'happinessMultiplier',
  },
];

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);

  // Load game from localStorage on mount
  useEffect(() => {
    const savedGame = localStorage.getItem('becomeFatSimulator');
    if (savedGame) {
      try {
        const parsed = JSON.parse(savedGame);
        setGameState(prev => ({ ...prev, ...parsed, isInitialized: true }));
      } catch (error) {
        console.error('Failed to load saved game:', error);
      }
    }
  }, []);

  // Save game to localStorage whenever state changes
  useEffect(() => {
    if (gameState.isInitialized) {
      localStorage.setItem('becomeFatSimulator', JSON.stringify(gameState));
    }
  }, [gameState]);

  // Idle progression
  useEffect(() => {
    if (!gameState.isInitialized) return;

    const interval = setInterval(() => {
      setGameState(prev => {
        const newState = { ...prev };
        
        // Auto weight gain
        if (newState.upgrades.autoEater > 0) {
          newState.character.weight += newState.upgrades.autoEater * 0.1;
          newState.currency.calories += newState.upgrades.autoEater * 0.1;
        }
        
        // Health regeneration
        if (newState.character.health < 100) {
          const regenRate = newState.upgrades.metabolismBooster > 0 ? 0.2 : 0.1;
          newState.character.health = Math.min(100, newState.character.health + regenRate);
        }
        
        // Energy regeneration
        if (newState.character.energy < 100) {
          newState.character.energy = Math.min(100, newState.character.energy + 0.2);
        }
        
        // Update weight stage
        updateWeightStage(newState);
        
        return newState;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.isInitialized]);

  const updateWeightStage = (state: GameState) => {
    const weight = state.character.weight;
    let newStage;
    
    if (weight < 170) newStage = 1; // Slim
    else if (weight < 200) newStage = 2; // Chubby
    else if (weight < 250) newStage = 3; // Overweight
    else if (weight < 300) newStage = 4; // Obese
    else newStage = 5; // Very Fat
    
    state.character.weightStage = newStage;
  };

  const initializeCharacter = useCallback((name: string, gender: 'male' | 'female', skinTone: number) => {
    setGameState(prev => ({
      ...prev,
      character: {
        ...prev.character,
        name,
        gender,
        skinTone,
      },
      isInitialized: true,
    }));
  }, []);

  const clickCharacter = useCallback(() => {
    setGameState(prev => {
      const newState = { ...prev };
      const baseMultiplier = newState.character.clickPower * newState.upgrades.clickMultiplier * newState.rebirth.totalMultiplier;
      
      // Weight gain: 0.25 lbs per click (affected by multipliers)
      const weightGain = 0.25 * baseMultiplier;
      newState.character.weight += weightGain;
      
      // Calories gain: 1.5 per click (affected by multipliers) but rounded down
      const caloriesGain = Math.floor(1.5 * baseMultiplier);
      newState.currency.calories += caloriesGain;
      
      // Reduce energy slightly
      newState.character.energy = Math.max(0, newState.character.energy - 1);
      
      updateWeightStage(newState);
      checkAchievements(newState);
      
      return newState;
    });
  }, []);

  const eatFood = useCallback((foodItem: FoodItem) => {
    setGameState(prev => {
      if (prev.currency.calories < foodItem.price) return prev;
      
      const newState = { ...prev };
      
      // Deduct calories
      newState.currency.calories -= foodItem.price;
      
      // Apply food effects
      newState.character.weight += foodItem.weightGain;
      newState.character.health = Math.max(0, Math.min(100, newState.character.health + foodItem.healthEffect));
      newState.character.happiness = Math.max(0, Math.min(100, newState.character.happiness + foodItem.happinessEffect * newState.upgrades.happinessMultiplier));
      newState.character.energy = Math.max(0, Math.min(100, newState.character.energy + foodItem.energyEffect));
      
      updateWeightStage(newState);
      checkAchievements(newState);
      
      return newState;
    });
  }, []);

  const buyCosmetic = useCallback((cosmeticItem: CosmeticItem) => {
    setGameState(prev => {
      if (prev.currency.calories < cosmeticItem.price) return prev;
      
      const newState = { ...prev };
      newState.currency.calories -= cosmeticItem.price;
      
      if (cosmeticItem.type === 'hairstyle') {
        newState.cosmetics.hairstyle = cosmeticItem.id;
      } else if (cosmeticItem.type === 'clothing') {
        newState.cosmetics.clothing = cosmeticItem.id;
      } else if (cosmeticItem.type === 'accessory') {
        if (!newState.cosmetics.accessories.includes(cosmeticItem.id)) {
          newState.cosmetics.accessories.push(cosmeticItem.id);
        }
      }
      
      return newState;
    });
  }, []);

  const buyUpgrade = useCallback((upgradeItem: UpgradeItem) => {
    setGameState(prev => {
      let currentPrice;
      
      if (upgradeItem.effect === 'clickPower') {
        // Calculate level from current clickPower (starts at 1, doubles each upgrade)
        const level = Math.log2(prev.character.clickPower || 1);
        currentPrice = upgradeItem.price * Math.pow(2, level);
      } else {
        currentPrice = upgradeItem.price * Math.pow(2, prev.upgrades[upgradeItem.effect as keyof typeof prev.upgrades]);
      }
      
      if (prev.currency.calories < currentPrice) return prev;
      
      const newState = { ...prev };
      newState.currency.calories -= currentPrice;
      
      if (upgradeItem.effect === 'clickPower') {
        newState.character.clickPower *= 2;
      } else {
        (newState.upgrades as any)[upgradeItem.effect] += 1;
      }
      
      return newState;
    });
  }, []);

  const exercise = useCallback(() => {
    setGameState(prev => {
      const newState = { ...prev };
      
      // Simple exercise mechanic - lose some weight, gain energy
      newState.character.weight = Math.max(140, newState.character.weight - 2);
      newState.character.energy = Math.min(100, newState.character.energy + 10);
      
      // Update weight stage
      updateWeightStage(newState);
      
      return newState;
    });
  }, []);

  const performRebirth = useCallback(() => {
    setGameState(prev => {
      const newState = { ...prev };
      
      // Increase rebirth count and multiplier
      newState.rebirth.rebirthCount += 1;
      newState.rebirth.totalMultiplier = 1 + (newState.rebirth.rebirthCount * 0.5); // 50% increase per rebirth
      
      // Set new goal (25x increase each time)
      newState.rebirth.currentGoal = newState.rebirth.currentGoal * 25;
      
      // Reset character to starting stats but keep cosmetics and some upgrades
      newState.character.weight = 150;
      newState.character.weightStage = 1;
      newState.character.health = 85;
      newState.character.happiness = 70;
      newState.character.energy = 60;
      // Keep clickPower but reset other upgrades partially
      newState.upgrades.clickMultiplier = Math.max(1, Math.floor(newState.upgrades.clickMultiplier / 2));
      newState.upgrades.autoEater = Math.floor(newState.upgrades.autoEater / 2);
      newState.upgrades.metabolismBooster = Math.floor(newState.upgrades.metabolismBooster / 2);
      newState.upgrades.happinessMultiplier = Math.max(1, newState.upgrades.happinessMultiplier / 2);
      
      // Give some bonus calories
      newState.currency.calories += 5000 * newState.rebirth.rebirthCount;
      
      return newState;
    });
  }, []);

  // Check achievements progress
  const checkAchievements = useCallback((newState: GameState) => {
    newState.achievements.forEach((achievement) => {
      if (!achievement.completed) {
        let progress = 0;
        switch (achievement.id) {
          case 'weight-gain':
          case 'heavyweight':
            progress = newState.character.weight;
            break;
          case 'first-click':
            // This would need click tracking - simplified for now
            progress = newState.character.weight > 150 ? achievement.requirement : 0;
            break;
          default:
            break;
        }
        
        if (progress >= achievement.requirement) {
          achievement.completed = true;
          newState.currency.calories += achievement.reward;
        }
      }
    });
  }, []);

  // Lottery mini-game
  const playLottery = useCallback(() => {
    setGameState(prev => {
      const now = Date.now();
      const today = new Date(now).toDateString();
      const lastPlayDate = new Date(prev.miniGames.lottery.lastPlay).toDateString();
      
      const newState = { ...prev };
      
      // Reset daily plays if it's a new day
      if (today !== lastPlayDate) {
        newState.miniGames.lottery.dailyPlays = 0;
      }
      
      // Check if player has plays left (max 3 per day)
      if (newState.miniGames.lottery.dailyPlays >= 3) {
        return prev; // No more plays today
      }
      
      // Cost: 1000 calories
      if (newState.currency.calories < 1000) {
        return prev; // Not enough calories
      }
      
      newState.currency.calories -= 1000;
      newState.miniGames.lottery.lastPlay = now;
      newState.miniGames.lottery.dailyPlays += 1;
      
      // Random outcomes
      const random = Math.random();
      let winnings = 0;
      
      if (random < 0.05) { // 5% chance - jackpot
        winnings = 50000;
      } else if (random < 0.15) { // 10% chance - big win
        winnings = 10000;
      } else if (random < 0.35) { // 20% chance - medium win
        winnings = 3000;
      } else if (random < 0.55) { // 20% chance - small win
        winnings = 1500;
      }
      // 45% chance - no win
      
      newState.currency.calories += winnings;
      
      return newState;
    });
  }, []);

  // Generate daily challenge
  const generateDailyChallenge = useCallback(() => {
    const challenges = [
      {
        id: 'daily-click',
        name: 'Click Master',
        description: 'Click the character 100 times',
        progress: 0,
        target: 100,
        reward: 2000,
        completed: false,
        icon: 'fas fa-mouse-pointer',
      },
      {
        id: 'daily-weight',
        name: 'Weight Gain',
        description: 'Gain 50 lbs today',
        progress: 0,
        target: 50,
        reward: 3000,
        completed: false,
        icon: 'fas fa-weight',
      },
      {
        id: 'daily-food',
        name: 'Food Frenzy',
        description: 'Eat 20 food items',
        progress: 0,
        target: 20,
        reward: 2500,
        completed: false,
        icon: 'fas fa-utensils',
      },
    ];
    
    return challenges[Math.floor(Math.random() * challenges.length)];
  }, []);

  // Check if can play lottery
  const canPlayLottery = useCallback(() => {
    const now = Date.now();
    const today = new Date(now).toDateString();
    const lastPlayDate = new Date(gameState.miniGames.lottery.lastPlay).toDateString();
    
    const dailyPlays = today === lastPlayDate ? gameState.miniGames.lottery.dailyPlays : 0;
    
    return gameState.currency.calories >= 1000 && dailyPlays < 3;
  }, [gameState.currency.calories, gameState.miniGames.lottery]);

  // Check for rebirth eligibility
  const canRebirth = gameState.character.weight >= gameState.rebirth.currentGoal;

  return {
    gameState,
    foodItems: FOOD_ITEMS,
    cosmeticItems: COSMETIC_ITEMS,
    upgradeItems: UPGRADE_ITEMS,
    initializeCharacter,
    clickCharacter,
    eatFood,
    buyCosmetic,
    buyUpgrade,
    exercise,
    performRebirth,
    canRebirth,
    playLottery,
    canPlayLottery,
    generateDailyChallenge,
  };
}
