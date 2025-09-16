import { CharacterCreation } from '@/components/character-creation';
import { CharacterCanvas } from '@/components/character-canvas';
import { StatsHud } from '@/components/stats-hud';
import { ShopPanel } from '@/components/shop-panel';
import { useGameState } from '@/hooks/use-game-state';
import { Button } from '@/components/ui/button';

const weightStageNames = ['Slim', 'Chubby', 'Overweight', 'Obese', 'Very Fat'];

export default function Game() {
  const {
    gameState,
    foodItems,
    cosmeticItems,
    upgradeItems,
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
  } = useGameState();

  if (!gameState.isInitialized) {
    return <CharacterCreation onCreateCharacter={initializeCharacter} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-display text-primary">Become Fat Simulator</h1>
          
          {/* Currency Display */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full">
              <i className="fas fa-fire text-sm"></i>
              <span className="font-mono font-semibold" data-testid="text-calories">
                {Math.floor(gameState.currency.calories)}
              </span>
              <span className="text-sm">Calories</span>
            </div>
            
            <div className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-full">
              <i className="fas fa-weight text-sm"></i>
              <span className="font-mono font-semibold" data-testid="text-weight">
                {Math.floor(gameState.character.weight)}
              </span>
              <span className="text-sm">lbs</span>
            </div>

            {gameState.rebirth.rebirthCount > 0 && (
              <div className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full">
                <i className="fas fa-star text-sm"></i>
                <span className="font-mono font-semibold" data-testid="text-rebirth-count">
                  {gameState.rebirth.rebirthCount}
                </span>
                <span className="text-sm">Rebirths</span>
              </div>
            )}

            <button className="p-2 text-muted-foreground hover:text-foreground" title="Settings">
              <i className="fas fa-cog text-xl"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <div className="flex flex-col lg:flex-row min-h-screen bg-background">
        {/* Left Panel - Character View */}
        <div className="lg:w-3/5 p-6 flex flex-col">
          {/* Character Name Display */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-display text-foreground mb-2" data-testid="text-player-name">
              {gameState.character.name}
            </h2>
            <div className="text-lg text-muted-foreground">
              Weight Stage: 
              <span className="font-semibold text-primary ml-1" data-testid="text-weight-stage">
                {weightStageNames[gameState.character.weightStage - 1]}
              </span>
            </div>
            
            {/* Rebirth Progress */}
            <div className="mt-4 bg-card p-4 rounded-xl border border-border">
              <div className="text-sm text-muted-foreground mb-2">
                Rebirth Goal: {(gameState.rebirth.currentGoal / 1000000).toFixed(1)}M lbs
                {gameState.rebirth.totalMultiplier > 1 && (
                  <span className="ml-2 text-purple-600 font-semibold">
                    ({gameState.rebirth.totalMultiplier.toFixed(1)}x multiplier)
                  </span>
                )}
              </div>
              <div className="bg-muted rounded-full h-3 mb-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-300"
                  style={{ 
                    width: `${Math.min(100, (gameState.character.weight / gameState.rebirth.currentGoal) * 100)}%` 
                  }}
                />
              </div>
              <div className="text-xs text-muted-foreground text-center">
                Progress: {((gameState.character.weight / gameState.rebirth.currentGoal) * 100).toFixed(2)}%
              </div>
              
              {canRebirth && (
                <Button
                  onClick={performRebirth}
                  data-testid="button-rebirth"
                  className="w-full mt-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
                >
                  <i className="fas fa-star mr-2"></i>
                  REBIRTH!
                </Button>
              )}
            </div>
          </div>

          {/* Character Display Area */}
          <div className="flex-1 flex items-center justify-center mb-6">
            <CharacterCanvas 
              character={gameState.character} 
              onCharacterClick={clickCharacter}
            />
          </div>

          {/* Stats HUD */}
          <StatsHud character={gameState.character} />

          {/* Quick Actions */}
          <div className="mt-6 flex gap-4">
            <Button 
              data-testid="button-eat-food"
              onClick={clickCharacter}
              className="flex-1 bg-primary text-primary-foreground py-3 px-6 font-semibold game-button flex items-center justify-center gap-2"
            >
              <i className="fas fa-utensils"></i>
              <span>Eat Food</span>
            </Button>
            <Button 
              data-testid="button-exercise"
              className="flex-1 bg-secondary text-secondary-foreground py-3 px-6 font-semibold game-button flex items-center justify-center gap-2"
              onClick={exercise}
            >
              <i className="fas fa-dumbbell"></i>
              <span>Exercise</span>
            </Button>
          </div>
        </div>

        {/* Right Panel - Shop and Stuff */}
        <ShopPanel
          calories={gameState.currency.calories}
          foodItems={foodItems}
          cosmeticItems={cosmeticItems}
          upgradeItems={upgradeItems}
          upgrades={gameState.upgrades}
          onBuyFood={eatFood}
          onBuyCosmetic={buyCosmetic}
          onBuyUpgrade={buyUpgrade}
        />
      </div>
    </div>
  );
}
