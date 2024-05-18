import Link from 'next/link';
import { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { Navbar } from '@/components/navbar';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

const links = [{ slug: '/', label: 'RelevanceAI' }];

export const MainLayout = ({ children, className }: MainLayoutProps) => {
  const wrapperStyles = cn('flex flex-col min-h-screen', className);

  return (
    <div className={wrapperStyles}>
      <header className="bg-slate-900 p-2">
        <ul className="flex items-center gap-10 text-gray-50">
          {links.map(({ slug, label }) => (
            <li key={slug}>
              <Link href={slug} className="inline-block p-2 transition-colors hover:text-green-300">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </header>
      <div className="min-h-screen p-4 bg-slate-100">
        <Navbar />
        {children}
      </div>
      <footer className="flex items-center justify-center p-4">
        © Avinash Adluri Copyright 2024
      </footer>
    </div>
  );
};
