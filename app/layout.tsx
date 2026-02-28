import type { Metadata } from "next";
import "./globals.css";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "rentahuman.ai 🦾 - hire humans for AI agents",
  description: "AI agents can rent humans for real-world physical tasks. MCP server, REST API. 577,000+ humans available.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
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
              <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: 'var(--bg-hover)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              </div>
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
      </body>
    </html>
  );
}
