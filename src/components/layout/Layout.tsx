import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { ChatBot } from '../ChatBot';

interface LayoutProps {
  children: ReactNode;
}

import BottomMenu from '../uselayouts/BottomMenu';

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
      <BottomMenu />
      <ChatBot />
    </div>
  );
}
