import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../src/app/globals.css';
import { ThemeProvider } from '../components/ThemeProvider';

// Load Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'LocoLama - Local AI Chat Engine',
  description: 'A 100% local AI chat interface powered by Ollama',
  icons: {
    icon: '/eye-of-kai_favicon.png',
    apple: '/eye-of-kai_favicon.png',
  },
  authors: [
    { name: 'FlameOS', url: 'https://flameos.io' }
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
