import { Inter } from 'next/font/google';
import "./globals.css";
import Providers from './providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: "RepoRaft — Community Resource Hub",
  description:
    'A community-curated platform where students share the best tutorials, GitHub repos, PDFs, and learning resources.',
  keywords: ['student resources', 'tutorials', 'learning', 'community', 'education'],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className={inter.className} style={{ backgroundColor: 'var(--background)', color: 'var(--on-background)' }}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
