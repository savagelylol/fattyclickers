import { useState } from 'react';
import { FoodItem, CosmeticItem, UpgradeItem } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ShopPanelProps {
  calories: number;
  foodItems: FoodItem[];
  cosmeticItems: CosmeticItem[];
  upgradeItems: UpgradeItem[];
  upgrades: any;
  onBuyFood: (item: FoodItem) => void;
  onBuyCosmetic: (item: CosmeticItem) => void;
  onBuyUpgrade: (item: UpgradeItem) => void;
}

export function ShopPanel({
  calories,
  foodItems,
  cosmeticItems,
  upgradeItems,
  upgrades,
  onBuyFood,
  onBuyCosmetic,
  onBuyUpgrade,
}: ShopPanelProps) {
  const healthyFoods = foodItems.filter(item => item.category === 'healthy');
  const junkFoods = foodItems.filter(item => item.category === 'junk');
  const desserts = foodItems.filter(item => item.category === 'dessert');

  const hairstyles = cosmeticItems.filter(item => item.type === 'hairstyle');
  const clothing = cosmeticItems.filter(item => item.type === 'clothing');
  const accessories = cosmeticItems.filter(item => item.type === 'accessory');

  const renderFoodCategory = (items: FoodItem[], title: string, icon: string, iconColor: string) => (
    <div className="mb-6">
      <h4 className="text-lg font-semibold mb-3 text-foreground flex items-center">
        <i className={`${icon} ${iconColor} mr-2`}></i>
        {title}
      </h4>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="item-card bg-background p-4 rounded-lg border border-border transition-all hover:transform hover:-translate-y-1 hover:shadow-lg">
            <div className="text-3xl mb-2">{item.emoji}</div>
            <h5 className="font-medium text-foreground">{item.name}</h5>
            <p className="text-xs text-muted-foreground mb-2">
              +{item.weightGain} weight
              {item.healthEffect !== 0 && `, ${item.healthEffect > 0 ? '+' : ''}${item.healthEffect} health`}
              {item.happinessEffect !== 0 && `, ${item.happinessEffect > 0 ? '+' : ''}${item.happinessEffect} happiness`}
            </p>
            <Button
              data-testid={`button-buy-food-${item.id}`}
              onClick={() => onBuyFood(item)}
              disabled={calories < item.price}
              className={`w-full py-1 px-2 text-sm font-medium ${
                item.category === 'healthy' 
                  ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                  : item.category === 'junk'
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
              }`}
            >
              {item.price} calories
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCosmeticCategory = (items: CosmeticItem[], title: string, icon: string, iconColor: string) => (
    <div className="mb-6">
      <h4 className="text-lg font-semibold mb-3 text-foreground flex items-center">
        <i className={`${icon} ${iconColor} mr-2`}></i>
        {title}
      </h4>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="item-card bg-background p-4 rounded-lg border border-border transition-all hover:transform hover:-translate-y-1 hover:shadow-lg">
            {item.emoji ? (
              <div className="text-3xl mb-2">{item.emoji}</div>
            ) : (
              <div className="w-full h-16 bg-muted rounded mb-2 flex items-center justify-center">
                <i className="fas fa-user-tie text-2xl text-muted-foreground"></i>
              </div>
            )}
            <h5 className="font-medium text-foreground">{item.name}</h5>
            <Button
              data-testid={`button-buy-cosmetic-${item.id}`}
              onClick={() => onBuyCosmetic(item)}
              disabled={calories < item.price}
              className="w-full bg-secondary text-secondary-foreground py-1 px-2 text-sm font-medium mt-2 hover:bg-secondary/90"
            >
              {item.price} calories
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="lg:w-2/5 bg-card border-l border-border">
      <div className="p-6 border-b border-border">
        <h3 className="text-2xl font-display text-foreground mb-4">Shop and Stuff</h3>
      </div>

      <div className="p-6 overflow-y-auto" style={{ height: 'calc(100vh - 200px)' }}>
        <Tabs defaultValue="food" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="food" data-testid="tab-food">
              <i className="fas fa-hamburger mr-2"></i>Food
            </TabsTrigger>
            <TabsTrigger value="cosmetic" data-testid="tab-cosmetic">
              <i className="fas fa-tshirt mr-2"></i>Cosmetic
            </TabsTrigger>
            <TabsTrigger value="upgrades" data-testid="tab-upgrades">
              <i className="fas fa-arrow-up mr-2"></i>Upgrades
            </TabsTrigger>
          </TabsList>

          <TabsContent value="food">
            {renderFoodCategory(healthyFoods, 'Healthy Foods', 'fas fa-apple-alt', 'text-green-500')}
            {renderFoodCategory(junkFoods, 'Junk Foods', 'fas fa-hamburger', 'text-yellow-500')}
            {renderFoodCategory(desserts, 'Desserts', 'fas fa-birthday-cake', 'text-pink-500')}
          </TabsContent>

          <TabsContent value="cosmetic">
            {renderCosmeticCategory(hairstyles, 'Hairstyles', 'fas fa-cut', 'text-purple-500')}
            {renderCosmeticCategory(clothing, 'Clothing', 'fas fa-tshirt', 'text-blue-500')}
            {renderCosmeticCategory(accessories, 'Accessories', 'fas fa-glasses', 'text-red-500')}
          </TabsContent>

          <TabsContent value="upgrades">
            <div className="space-y-4">
              {upgradeItems.map((item) => {
                const currentPrice = item.price * Math.pow(2, upgrades[item.effect as keyof typeof upgrades] || 0);
                const currentLevel = upgrades[item.effect as keyof typeof upgrades] || 0;
                
                return (
                  <div key={item.id} className="item-card bg-background p-4 rounded-lg border border-border transition-all hover:transform hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-foreground flex items-center">
                        <i className={`${item.icon} text-primary mr-2`}></i>
                        {item.name}
                      </h5>
                      <span className="text-sm text-muted-foreground">Level {currentLevel}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{item.description}</p>
                    <Button
                      data-testid={`button-buy-upgrade-${item.id}`}
                      onClick={() => onBuyUpgrade(item)}
                      disabled={calories < currentPrice}
                      className="w-full bg-accent text-accent-foreground py-2 px-4 font-medium hover:bg-accent/90"
                    >
                      {currentLevel === 0 ? 'Purchase' : 'Upgrade'} - {Math.floor(currentPrice)} calories
                    </Button>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
