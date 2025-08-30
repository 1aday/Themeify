'use client';

import { SidebarEditor } from '@/components/editor/SidebarEditor';
import { ThemePreview } from '@/components/preview/ThemePreview';

/**
 * Main Theme Generator layout
 * Left sidebar (360px) + right preview content as specified in the PRD
 */
export default function Home() {
  return (
    <main className="grid grid-cols-[360px_1fr] h-screen bg-background">
      <SidebarEditor />
      <ThemePreview />
    </main>
  );
}
