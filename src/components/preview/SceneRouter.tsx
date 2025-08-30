'use client';

import { useThemeStore } from '@/state/themeStore';
import { Scene } from '@/state/themeStore';
import { CardsScene } from './Scenes/CardsScene';
import { DashboardScene } from './Scenes/DashboardScene';
import { MailScene } from './Scenes/MailScene';
import { PricingScene } from './Scenes/PricingScene';
import { ColorsScene } from './Scenes/ColorsScene';

export function SceneRouter() {
  const { activeScene } = useThemeStore();

  // Render the appropriate scene based on activeScene
  switch (activeScene) {
    case 'cards':
      return <CardsScene />;
    case 'dashboard':
      return <DashboardScene />;
    case 'mail':
      return <MailScene />;
    case 'pricing':
      return <PricingScene />;
    case 'colors':
      return <ColorsScene />;
    default:
      return <CardsScene />;
  }
}
