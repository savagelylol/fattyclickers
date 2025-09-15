import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CharacterCreationProps {
  onCreateCharacter: (name: string, gender: 'male' | 'female', skinTone: number) => void;
}

const skinTones = [
  { id: 1, color: '#FDBCB4' },
  { id: 2, color: '#EAA186' },
  { id: 3, color: '#C68642' },
  { id: 4, color: '#8B4513' },
  { id: 5, color: '#654321' },
];

export function CharacterCreation({ onCreateCharacter }: CharacterCreationProps) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [skinTone, setSkinTone] = useState(1);

  const handleSubmit = () => {
    if (name.trim().length < 1) {
      alert('Please enter a character name!');
      return;
    }
    onCreateCharacter(name.trim(), gender, skinTone);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="text-3xl font-display text-center text-foreground">
            Create Your Character
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="character-name" className="block text-sm font-medium mb-2 text-muted-foreground">
              Character Name
            </Label>
            <Input
              id="character-name"
              data-testid="input-character-name"
              type="text"
              maxLength={20}
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <Label className="block text-sm font-medium mb-3 text-muted-foreground">Gender</Label>
            <div className="flex gap-4">
              <button
                data-testid="button-gender-male"
                onClick={() => setGender('male')}
                className={`flex flex-col items-center cursor-pointer p-4 border-2 rounded-lg transition-colors ${
                  gender === 'male' ? 'border-primary' : 'border-border hover:border-primary'
                }`}
              >
                <i className="fas fa-male text-2xl text-muted-foreground mb-2"></i>
                <span className="text-sm">Male</span>
              </button>
              <button
                data-testid="button-gender-female"
                onClick={() => setGender('female')}
                className={`flex flex-col items-center cursor-pointer p-4 border-2 rounded-lg transition-colors ${
                  gender === 'female' ? 'border-primary' : 'border-border hover:border-primary'
                }`}
              >
                <i className="fas fa-female text-2xl text-muted-foreground mb-2"></i>
                <span className="text-sm">Female</span>
              </button>
            </div>
          </div>

          <div>
            <Label className="block text-sm font-medium mb-3 text-muted-foreground">Skin Tone</Label>
            <div className="flex gap-2 justify-center">
              {skinTones.map((tone) => (
                <button
                  key={tone.id}
                  data-testid={`button-skin-tone-${tone.id}`}
                  onClick={() => setSkinTone(tone.id)}
                  className={`w-8 h-8 rounded-full cursor-pointer border-2 transition-colors ${
                    skinTone === tone.id ? 'border-primary' : 'border-transparent hover:border-primary'
                  }`}
                  style={{ backgroundColor: tone.color }}
                />
              ))}
            </div>
          </div>

          <Button
            data-testid="button-start-game"
            onClick={handleSubmit}
            className="w-full bg-primary text-primary-foreground py-4 text-lg font-semibold game-button"
          >
            Start Your Journey!
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
