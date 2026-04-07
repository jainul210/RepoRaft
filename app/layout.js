import { Inter } from 'next/font/google';
import "./globals.css";
import Providers from './providers';
import Navbar from '@/components/Navbar';

const inter = Inter({ 
  subsets: ['latin'] 
});

export const metadata = {
  title: "RepoRaft — Community Resource Hub",
  description:
    'A community-curated platform where students share the best tutorials, GitHub repos, PDFs, and learning resources.',
  keywords: ['student resources', 'tutorials', 'learning', 'community', 'education'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <footer className="mt-24 border-t border-white/5 py-8 text-center text-xs text-muted-foreground">
            <p>
              Built with ❤️ by students for students ·{' '}
              <span className="text-violet-400">RepoRaft</span>
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
