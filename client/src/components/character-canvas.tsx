import { useEffect, useRef } from 'react';
import { Character } from '@/types/game';

interface CharacterCanvasProps {
  character: Character;
  onCharacterClick: () => void;
}

const skinTones = ['#FDBCB4', '#EAA186', '#C68642', '#8B4513', '#654321'];

export function CharacterCanvas({ character, onCharacterClick }: CharacterCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawCharacter(ctx, character);
  }, [character]);

  const drawCharacter = (ctx: CanvasRenderingContext2D, character: Character) => {
    const canvas = ctx.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Scale based on weight stage
    const scale = 0.8 + (character.weightStage - 1) * 0.3;
    
    const skinColor = skinTones[character.skinTone - 1];
    
    // Draw character body
    ctx.fillStyle = skinColor;
    
    // Head
    ctx.beginPath();
    ctx.arc(centerX, centerY - 80, 30 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    // Body (ellipse for weight variation)
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, 40 * scale, 60 * scale, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Arms
    ctx.fillRect(centerX - 60 * scale, centerY - 40, 20 * scale, 60 * scale);
    ctx.fillRect(centerX + 40 * scale, centerY - 40, 20 * scale, 60 * scale);
    
    // Legs
    ctx.fillRect(centerX - 25 * scale, centerY + 40, 20 * scale, 80 * scale);
    ctx.fillRect(centerX + 5 * scale, centerY + 40, 20 * scale, 80 * scale);
    
    // Face
    ctx.fillStyle = '#000';
    
    // Eyes
    ctx.beginPath();
    ctx.arc(centerX - 8, centerY - 85, 3, 0, Math.PI * 2);
    ctx.arc(centerX + 8, centerY - 85, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Mouth (happiness affects expression)
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (character.happiness > 70) {
      // Happy smile
      ctx.arc(centerX, centerY - 70, 8, 0, Math.PI);
    } else if (character.happiness > 30) {
      // Neutral
      ctx.moveTo(centerX - 8, centerY - 70);
      ctx.lineTo(centerX + 8, centerY - 70);
    } else {
      // Sad
      ctx.arc(centerX, centerY - 60, 8, Math.PI, 0);
    }
    ctx.stroke();
  };

  const handleClick = () => {
    onCharacterClick();
    
    // Add click animation
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.classList.add('eating-animation');
      setTimeout(() => {
        canvas.classList.remove('eating-animation');
      }, 300);
    }
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        data-testid="character-canvas"
        width={300}
        height={400}
        onClick={handleClick}
        className="character-canvas rounded-xl pixel-perfect cursor-pointer hover:shadow-lg transition-shadow border-3 border-border"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.8), rgba(255,255,255,0.4))',
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
}
