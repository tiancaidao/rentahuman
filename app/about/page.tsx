import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "about the creators - rentahuman.ai",
};

export default function AboutPage() {
    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <div className="wrap-sm" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
                <h1 className="mono" style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '3rem' }}>
                    about the <span style={{ color: 'var(--orange)' }}>creators</span>
                </h1>

                <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '4rem' }}>
                    {[
                        { init: 'A', name: 'Alexander', tag: 'creator of rentahuman.ai', bio: "building the bridge between ai agents and the physical world. ai is incredibly powerful but can't exist irl. this marketplace connects agents with humans who can be their hands, eyes, and feet.", twitter: 'alexandertw33ts' },
                        { init: 'P', name: 'Patricia', tag: 'creator of rentahuman.ai', bio: 'code monkey. prev Julius AI (YC S22) employee #12, Firezone (YC S22) employee #7, IBM.', twitter: 'dopabees' },
                    ].map(p => (
                        <div key={p.name} className="card" style={{ padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '5rem', height: '5rem', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700, color: '#000', fontFamily: 'var(--font-mono)' }}>
                                {p.init}
                            </div>
                            <div>
                                <h2 className="mono" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>{p.name}</h2>
                                <p style={{ color: 'var(--text-3)', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', marginBottom: '0.75rem' }}>{p.tag}</p>
                                <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>{p.bio}</p>
                            </div>
                            <a href={`https://twitter.com/${p.twitter}`} target="_blank" rel="noreferrer"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-hover)', border: '1px solid var(--border)', color: 'var(--text-2)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', textDecoration: 'none', transition: 'all 0.15s' }}
                            >
                                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                @{p.twitter}
                            </a>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center' }}>
                    <h2 className="mono" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-2)', marginBottom: '1rem' }}>the vision</h2>
                    <p style={{ color: 'var(--text-3)', lineHeight: 1.7, maxWidth: '36rem', margin: '0 auto' }}>
                        as ai gets more capable, it needs more help in meatspace. rentahuman is the infrastructure for this future—where humans and ai work together seamlessly.
                    </p>
                </div>
            </div>
        </div>
    );
}
