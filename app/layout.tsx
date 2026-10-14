import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'A Universe Made for Talal — Happy 27th Birthday | With Love, Maria',
  description:
    'An immersive 3D cinematic birthday universe dedicated to Talal Ahmad, created with love by Maria (Your Jhalo Rani). Featuring 3D interactive environments, a 13-portrait gallery, live age countdown, 3D cake, and a personal love letter.',
  keywords: [
    'Talal Ahmad',
    'Happy Birthday Talal',
    'Maria',
    'Jhalo Rani',
    '3D Birthday Website',
    'Three.js',
    'Cinematic Birthday Experience',
  ],
  authors: [{ name: 'Maria' }],
  openGraph: {
    title: 'A Universe Made for Talal — A Birthday Surprise by Maria',
    description: 'An interactive 3D universe celebrating Talal Ahmad’s 27th birthday.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#060407" />
      </head>
      <body>{children}</body>
    </html>
  );
}
