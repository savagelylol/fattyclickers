export interface Character {
  name: string;
  gender: 'male' | 'female';
  skinTone: number; // 1-5
  weight: number;
  weightStage: number; // 1-5 (slim to very fat)
  health: number;
  happiness: number;
  energy: number;
  clickPower: number;
}

export interface Currency {
  calories: number;
}

export interface Upgrades {
  clickMultiplier: number;
  autoEater: number;
  metabolismBooster: number;
  happinessMultiplier: number;
}

export interface Cosmetics {
  hairstyle: string;
  clothing: string;
  accessories: string[];
}

export interface RebirthData {
  rebirthCount: number;
  totalMultiplier: number;
  currentGoal: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  reward: number; // calories
  icon: string;
  requirement: number;
}

export interface DailyChallenge {
  id: string;
  name: string;
  description: string;
  progress: number;
  target: number;
  reward: number;
  completed: boolean;
  icon: string;
}

export interface MiniGameState {
  lottery: {
    lastPlay: number; // timestamp
    dailyPlays: number;
  };
}

export interface GameState {
  character: Character;
  currency: Currency;
  upgrades: Upgrades;
  inventory: FoodItem[];
  cosmetics: Cosmetics;
  rebirth: RebirthData;
  achievements: Achievement[];
  dailyChallenge: DailyChallenge | null;
  miniGames: MiniGameState;
  isInitialized: boolean;
}

export interface FoodItem {
  id: string;
  name: string;
  emoji: string;
  category: 'healthy' | 'junk' | 'dessert';
  weightGain: number;
  healthEffect: number;
  happinessEffect: number;
  energyEffect: number;
  price: number;
}

export interface CosmeticItem {
  id: string;
  name: string;
  type: 'hairstyle' | 'clothing' | 'accessory';
  price: number;
  emoji?: string;
}

export interface UpgradeItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  price: number;
  currentLevel: number;
  effect: string;
}
