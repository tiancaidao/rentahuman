import Link from 'next/link';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function BountiesPage({ searchParams }: { searchParams: Promise<{ tab?: string; category?: string }> }) {
    const { tab = 'new', category = '' } = await searchParams;

    const bounties = await prisma.bounty.findMany({
        where: {
            status: 'OPEN',
            ...(category ? { category: { contains: category } } : {}),
        },
        include: { poster: { select: { name: true, verified: true } } },
        orderBy: { createdAt: 'desc' },
        take: 30,
    });

    const tabs = ['new', 'top', 'my bounties', 'my applications'];
    const catIcon: Record<string, string> = { Research: '🔍', Delivery: '📦', Creative: '🎨', Tech: '💻', Hiring: '👔', default: '🎯' };

    const cats = [
        { id: '', name: 'All Bounties', icon: '🎯' },
        { id: 'Hiring', name: 'Hiring', icon: '👔' },
        { id: 'Research', name: 'Research & Fieldwork', icon: '🔍' },
        { id: 'Creative', name: 'Creative & Media', icon: '🎨' },
        { id: 'Tech', name: 'Tech & Dev', icon: '💻' },
        { id: 'Delivery', name: 'Delivery & Errands', icon: '📦' },
    ];

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <div className="wrap" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <h1 className="mono" style={{ fontSize: '1.25rem', fontWeight: 700 }}>task bounties</h1>
                        <span className="badge badge-red" style={{ fontSize: '0.6rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>new</span>
                    </div>
                    <button className="btn" style={{ background: '#fff', color: '#000', fontSize: '0.8125rem', padding: '0.5rem 1rem' }}>+ create bounty</button>
                </div>

                {/* Category cards — top horizontal */}
                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', marginBottom: '1rem', paddingBottom: '0.125rem' }}>
                    {cats.map(cat => (
                        <Link
                            key={cat.id}
                            href={`/bounties?tab=${tab}${cat.id ? `&category=${cat.id}` : ''}`}
                            style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem',
                                padding: '0.75rem 1.25rem', borderRadius: 'var(--radius)', whiteSpace: 'nowrap',
                                minWidth: '7rem', textDecoration: 'none', transition: 'all 0.15s', flexShrink: 0,
                                background: category === cat.id ? 'rgba(249,115,22,0.08)' : 'var(--bg-card)',
                                color: category === cat.id ? 'var(--orange)' : 'var(--text-3)',
                                border: category === cat.id ? '1px solid rgba(249,115,22,0.3)' : '1px solid var(--border)',
                            }}
                        >
                            <span style={{ fontSize: '1.5rem' }}>{cat.icon}</span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: category === cat.id ? 600 : 400 }}>{cat.name}</span>
                        </Link>
                    ))}
                </div>

                {/* Search / filter row */}
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                    <input
                        type="text"
                        placeholder="skill needed"
                        className="inp"
                        style={{ flex: 2, minWidth: '9rem', fontSize: '0.85rem' }}
                    />
                    <input
                        type="number"
                        placeholder="min price $"
                        className="inp"
                        style={{ flex: 1, minWidth: '6rem', fontSize: '0.85rem' }}
                    />
                    <input
                        type="number"
                        placeholder="max price $"
                        className="inp"
                        style={{ flex: 1, minWidth: '6rem', fontSize: '0.85rem' }}
                    />
                    <button className="btn" style={{ background: 'var(--orange)', color: '#000', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', padding: '0.5rem 1.25rem', whiteSpace: 'nowrap' }}>
                        Search
                    </button>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '1.5rem', borderBottom: '1px solid var(--border)', marginBottom: '1.5rem' }}>
                    {tabs.map(t => (
                        <Link key={t} href={`/bounties?tab=${t}${category ? `&category=${category}` : ''}`}
                            style={{
                                fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', paddingBottom: '0.75rem',
                                borderBottom: tab === t ? '2px solid var(--orange)' : '2px solid transparent',
                                color: tab === t ? 'var(--text)' : 'var(--text-3)', fontWeight: tab === t ? 600 : 400,
                                textDecoration: 'none', transition: 'color 0.15s', whiteSpace: 'nowrap'
                            }}>
                            {t}
                        </Link>
                    ))}
                </div>

                {/* Bounty list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {bounties.length === 0 ? (
                        <div style={{ border: '1px dashed var(--border)', borderRadius: 'var(--radius)', padding: '5rem', textAlign: 'center', color: 'var(--text-4)', fontFamily: 'var(--font-mono)' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🪺</div>
                            no bounties posted yet. be the first!
                        </div>
                    ) : (
                        bounties.map((b: any) => (
                            <div key={b.id} className="card" style={{ padding: '1rem', cursor: 'pointer' }}>
                                <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
                                    <div style={{ width: '2.5rem', height: '2.5rem', background: 'var(--bg-hover)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.125rem', flexShrink: 0 }}>
                                        {catIcon[b.category] || catIcon.default}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.375rem' }}>
                                            <div>
                                                <span className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-4)', textTransform: 'uppercase', marginRight: '0.5rem' }}>{b.category}</span>
                                                {b.poster?.verified && <span className="badge badge-orange" style={{ fontSize: '0.6rem' }}>VERIFIED ONLY</span>}
                                            </div>
                                            <div className="mono" style={{ fontSize: '0.875rem', fontWeight: 700, background: 'var(--bg)', border: '1px solid var(--border)', padding: '0.125rem 0.5rem', borderRadius: 'var(--radius-xs)', flexShrink: 0 }}>
                                                {b.minPrice && b.maxPrice ? `$${b.minPrice}–$${b.maxPrice}` : b.minPrice ? `$${b.minPrice}` : 'Negotiable'}
                                            </div>
                                        </div>
                                        <h3 className="mono" style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.375rem', color: 'var(--text)' }}>{b.title}</h3>
                                        <p style={{ color: 'var(--text-3)', fontSize: '0.8rem', lineHeight: 1.55, marginBottom: '0.75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{b.description}</p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            <span className="badge">📍 {b.location || 'Remote Ok'}</span>
                                            {b.dueDate && <span className="badge badge-red">⏳ Due {new Date(b.dueDate).toLocaleDateString()}</span>}
                                            <span className="badge">👥 {b.spots} spot{b.spots !== 1 ? 's' : ''}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
