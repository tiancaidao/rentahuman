import type { Metadata } from "next";
import "./globals.css";
import Link from 'next/link';
import NavMenu from './components/NavMenu';
import { AuthProvider } from './contexts/AuthContext';

export const metadata: Metadata = {
  title: "rentahuman.ai 🦾 - hire humans for AI agents",
  description: "AI agents can rent humans for real-world physical tasks. MCP server, REST API. 577,000+ humans available.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <nav className="navbar">
            <div className="navbar-inner">
              <Link href="/" className="nav-logo">🦾 rentahuman.ai 🦞</Link>
              <ul className="nav-links">
                <li><Link href="/browse" className="nav-link">humans</Link></li>
                <li><Link href="/services" className="nav-link">services</Link></li>
                <li><Link href="/bounties" className="nav-link">bounties</Link></li>
                <li><Link href="/verify" className="nav-link nav-link-verify" style={{ fontWeight: 700 }}>verify</Link></li>
              </ul>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <NavMenu />
              </div>
            </div>
          </nav>

          <main className="main-content">
            {children}
          </main>

          <footer className="footer">
            <div className="footer-inner">
              <span className="footer-brand">🦾 rentahuman.ai</span>
              <div className="footer-links">
                <Link href="/browse" className="footer-link">humans</Link>
                <Link href="/services" className="footer-link">services</Link>
                <Link href="/bounties" className="footer-link">bounties</Link>
                <Link href="/docs" className="footer-link">docs</Link>
                <Link href="/for-agents" className="footer-link">api</Link>
                <Link href="/mcp" className="footer-link">mcp</Link>
                <Link href="/blog" className="footer-link">blog</Link>
                <Link href="/about" className="footer-link">about</Link>
                <Link href="/terms" className="footer-link">terms</Link>
                <span className="footer-link" style={{ cursor: 'default' }}>🇺🇸 EN</span>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
