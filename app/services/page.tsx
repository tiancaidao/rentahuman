import Link from 'next/link';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function ServicesPage({ searchParams }: { searchParams: Promise<{ category?: string; verified?: string }> }) {
    const { category = '', verified = '' } = await searchParams;

    const services = await prisma.service.findMany({
        where: {
            ...(category ? { category: { contains: category } } : {}),
        },
        include: { human: { select: { id: true, name: true, verified: true, location: true } } },
        orderBy: { createdAt: 'desc' },
        take: 50,
    });

    const cats = [
        { id: '', name: 'All', icon: '⊞' },
        { id: 'Hiring', name: 'Hiring', icon: '👔' },
        { id: 'Research', name: 'Research', icon: '🔍' },
        { id: 'Companionship', name: 'Companionship', icon: '🫂' },
        { id: 'Delivery', name: 'Delivery', icon: '📦' },
        { id: 'Creative', name: 'Creative', icon: '🎨' },
        { id: 'Tech', name: 'Tech', icon: '💻' },
        { id: 'Writing', name: 'Writing', icon: '✍️' },
    ];

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <div className="wrap" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>

                {/* Page title */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <h1 className="mono" style={{ fontSize: '1.25rem', fontWeight: 700 }}>explore services</h1>
                    <span className="mono" style={{ color: 'var(--text-4)', fontSize: '0.75rem' }}>{services.length} found</span>
                </div>

                {/* Top filter bar */}
                <div style={{ marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

                    {/* Search row */}
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <div style={{ flex: 1, position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-4)', fontSize: '0.875rem', pointerEvents: 'none' }}>🔎</span>
                            <input
                                type="text"
                                placeholder="search services…"
                                className="inp"
                                style={{ width: '100%', paddingLeft: '2.25rem', fontSize: '0.85rem' }}
                            />
                        </div>
                        <Link
                            href={`/services${category ? `?category=${category}` : ''}${verified === '1' ? '' : `${category ? '&' : '?'}verified=1`}`}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 0.875rem',
                                borderRadius: 'var(--radius-xs)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
                                textDecoration: 'none', whiteSpace: 'nowrap', transition: 'all 0.15s',
                                background: verified === '1' ? 'rgba(249,115,22,0.08)' : 'var(--bg-card)',
                                color: verified === '1' ? 'var(--orange)' : 'var(--text-3)',
                                border: verified === '1' ? '1px solid rgba(249,115,22,0.3)' : '1px solid var(--border)',
                            }}
                        >
                            ● Verified
                        </Link>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 0.875rem',
                            borderRadius: 'var(--radius-xs)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
                            background: 'var(--bg-card)', color: 'var(--text-3)', border: '1px solid var(--border)', cursor: 'pointer', whiteSpace: 'nowrap',
                        }}>
                            ↕ Sort
                        </div>
                    </div>

                    {/* Category pills */}
                    <div style={{ display: 'flex', gap: '0.375rem', overflowX: 'auto', paddingBottom: '0.125rem' }}>
                        {cats.map(cat => (
                            <Link key={cat.id} href={`/services${cat.id ? `?category=${cat.id}` : ''}${verified === '1' ? `${cat.id ? '&' : '?'}verified=1` : ''}`}
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                                    padding: '0.375rem 0.875rem', borderRadius: '9999px', whiteSpace: 'nowrap',
                                    fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textDecoration: 'none', transition: 'all 0.15s',
                                    background: category === cat.id ? 'var(--orange)' : 'var(--bg-card)',
                                    color: category === cat.id ? '#000' : 'var(--text-3)',
                                    border: category === cat.id ? '1px solid var(--orange)' : '1px solid var(--border)',
                                    fontWeight: category === cat.id ? 600 : 400,
                                }}>
                                <span>{cat.icon}</span>
                                <span>{cat.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Service grid */}
                {services.length === 0 ? (
                    <div style={{ border: '1px dashed var(--border)', borderRadius: 'var(--radius)', padding: '5rem', textAlign: 'center', color: 'var(--text-4)', fontFamily: 'var(--font-mono)' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>👻</div>
                        no services found
                    </div>
                ) : (
                    <div className="grid-3" style={{ gap: '0.875rem' }}>
                        {services.map((s: any) => (
                            <Link key={s.id} href={`/services/${s.humanId}/${s.id}`}
                                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', textDecoration: 'none', display: 'flex', flexDirection: 'column', transition: 'border-color 0.15s' }}>
                                <div style={{ height: '5rem', background: 'var(--bg-hover)', position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '0.5rem' }}>
                                    <span style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', background: 'rgba(9,9,11,0.8)', border: '1px solid var(--border)', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', padding: '0.125rem 0.5rem', borderRadius: 'var(--radius-xs)' }}>{s.category}</span>
                                    <span style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'var(--orange)', color: '#000', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, padding: '0.125rem 0.5rem', borderRadius: 'var(--radius-xs)' }}>${s.price}{s.pricingType === 'HOURLY' ? '/hr' : ''}</span>
                                </div>
                                <div style={{ padding: '0.875rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                                    <h3 className="mono" style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>{s.title}</h3>
                                    <p style={{ color: 'var(--text-3)', fontSize: '0.75rem', lineHeight: 1.55, flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{s.description}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.625rem', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
                                        <span className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.human?.name}</span>
                                        {s.human?.verified && <span style={{ color: 'var(--blue)', fontSize: '0.65rem' }}>● verified</span>}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
