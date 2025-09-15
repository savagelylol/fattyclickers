import { Character } from '@/types/game';

interface StatsHudProps {
  character: Character;
}

const weightStageNames = ['Slim', 'Chubby', 'Overweight', 'Obese', 'Very Fat'];

export function StatsHud({ character }: StatsHudProps) {
  return (
    <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Health */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <i className="fas fa-heart text-red-500 mr-2"></i>
            <span className="text-sm font-medium text-muted-foreground">Health</span>
          </div>
          <div className="bg-muted rounded-full h-2 mb-1">
            <div 
              className="stat-bar h-full rounded-full" 
              style={{ 
                width: `${character.health}%`, 
                background: 'linear-gradient(90deg, #EF4444, #F87171)' 
              }}
            />
          </div>
          <div className="text-xs font-mono text-foreground" data-testid="text-health">
            {Math.floor(character.health)}/100
          </div>
        </div>

        {/* Happiness */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <i className="fas fa-smile text-yellow-500 mr-2"></i>
            <span className="text-sm font-medium text-muted-foreground">Happiness</span>
          </div>
          <div className="bg-muted rounded-full h-2 mb-1">
            <div 
              className="stat-bar h-full rounded-full" 
              style={{ 
                width: `${character.happiness}%`, 
                background: 'linear-gradient(90deg, #EAB308, #FDE047)' 
              }}
            />
          </div>
          <div className="text-xs font-mono text-foreground" data-testid="text-happiness">
            {Math.floor(character.happiness)}/100
          </div>
        </div>

        {/* Energy */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <i className="fas fa-bolt text-blue-500 mr-2"></i>
            <span className="text-sm font-medium text-muted-foreground">Energy</span>
          </div>
          <div className="bg-muted rounded-full h-2 mb-1">
            <div 
              className="stat-bar h-full rounded-full" 
              style={{ 
                width: `${character.energy}%`, 
                background: 'linear-gradient(90deg, #3B82F6, #60A5FA)' 
              }}
            />
          </div>
          <div className="text-xs font-mono text-foreground" data-testid="text-energy">
            {Math.floor(character.energy)}/100
          </div>
        </div>

        {/* Click Power */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <i className="fas fa-mouse text-primary mr-2"></i>
            <span className="text-sm font-medium text-muted-foreground">Click Power</span>
          </div>
          <div className="text-lg font-mono font-bold text-primary" data-testid="text-click-power">
            +{character.clickPower}
          </div>
          <div className="text-xs text-muted-foreground">per click</div>
        </div>
      </div>
    </div>
  );
}
