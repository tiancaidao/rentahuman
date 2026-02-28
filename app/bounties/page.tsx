import Link from 'next/link';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

// Map category IDs to emoji icons
const catIcon: Record<string, string> = {
    'Hiring': '👔',
    'Research & Fieldwork': '📍',
    'Companionship': '💜',
    'Delivery & Errands': '📦',
    'Creative & Media': '🎨',
    'Tech & Dev': '💻',
    'Writing & Content': '✍️',
    'Events & Social': '🎉',
    'Marketing Campaigns': '📣',
    'Home & Personal': '🏠',
    'Other': '📋',
    default: '🔥'
};

function timeAgo(date: Date) {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
}

function FormatPrice(b: any) {
    if (!b.price) return 'Negotiable';
    const sym = b.currency === 'EUR' ? '€' : b.currency === 'GBP' ? '£' : '$';
    return `${sym}${b.price}${b.priceType === 'HOURLY' ? '/hr' : ''}`;
}

const CATS = [
    { id: '', name: 'All', icon: '🔥', desc: 'post tasks, humans apply.' },
    { id: 'Hiring', name: 'Hiring', icon: '👔', desc: 'Talent search & recruiting' },
    { id: 'Research & Fieldwork', name: 'Research & Fieldwork', icon: '📍', desc: 'Real-world research & verification' },
    { id: 'Companionship', name: 'Companionship', icon: '💜', desc: 'Dates, hangouts & social company' },
    { id: 'Delivery & Errands', name: 'Delivery & Errands', icon: '📦', desc: 'Pickups, drop-offs & deliveries' },
    { id: 'Creative & Media', name: 'Creative & Media', icon: '🎨', desc: 'Video, photo, design & 3D' },
    { id: 'Tech & Dev', name: 'Tech & Dev', icon: '💻', desc: 'Web dev, data & automation' },
    { id: 'Writing & Content', name: 'Writing & Content', icon: '✍️', desc: 'Scripts, articles & copywriting' },
    { id: 'Events & Social', name: 'Events & Social', icon: '🎉', desc: 'Events, meetups & social tasks' },
];

export default async function BountiesPage({ searchParams }: { searchParams: Promise<{ tab?: string; category?: string; view?: string }> }) {
    const { tab = 'new', category = '', view = '' } = await searchParams;

    // Fetch bounties for the main list
    const bounties = await prisma.bounty.findMany({
        where: {
            status: 'OPEN',
            ...(category ? { category: { contains: category } } : {}),
        },
        include: { poster: { select: { name: true, verified: true } } },
        orderBy: tab === 'top' ? { spots: 'desc' } : { createdAt: 'desc' },
        take: 30,
    });

    const isMyBounties = view === 'my-bounties';
    const isMyApplications = view === 'my-applications';

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <div className="wrap" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>

                {/* Header */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                        <h1 className="mono" style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>task bounties</h1>
                        <span className="badge badge-red" style={{ fontSize: '0.6rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>new</span>
                    </div>
                    <p style={{ color: 'var(--text-3)', fontSize: '0.875rem', fontFamily: 'var(--font-mono)' }}>post tasks, humans apply.</p>
                </div>

                {/* Category cards — scrollable horizontal */}
                <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', marginBottom: '1.25rem', paddingBottom: '0.25rem' }}>
                    {CATS.map(cat => {
                        const isSel = category === cat.id;
                        return (
                            <Link
                                key={cat.id}
                                href={`/bounties?tab=${tab}${cat.id ? `&category=${encodeURIComponent(cat.id)}` : ''}`}
                                style={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem',
                                    padding: '1rem', borderRadius: 'var(--radius)', whiteSpace: 'nowrap',
                                    minWidth: '7.5rem', textDecoration: 'none', transition: 'all 0.15s', flexShrink: 0,
                                    background: isSel ? 'rgba(249,115,22,0.12)' : 'var(--bg-card)',
                                    border: isSel ? '1px solid var(--orange)' : '1px solid var(--border)',
                                }}
                            >
                                <span style={{ fontSize: '1.75rem' }}>{cat.icon}</span>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: isSel ? 700 : 500, color: isSel ? '#fff' : 'var(--text-2)' }}>{cat.name}</span>
                                <span style={{ fontSize: '0.65rem', color: 'var(--text-4)', textAlign: 'center', lineHeight: 1.3, maxWidth: '7rem' }}>{cat.desc}</span>
                            </Link>
                        );
                    })}
                </div>

                {/* Search / Filter Box */}
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem', marginBottom: '0.75rem' }}>
                        <div>
                            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-4)', marginBottom: '0.375rem' }}>skill needed</label>
                            <input
                                type="text"
                                placeholder="photography ..."
                                className="inp"
                                style={{ width: '100%', fontSize: '0.875rem' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-4)', marginBottom: '0.375rem' }}>min price $</label>
                            <input type="number" placeholder="0" className="inp" style={{ width: '100%', fontSize: '0.875rem' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-4)', marginBottom: '0.375rem' }}>max price $</label>
                            <input type="number" placeholder="1000" className="inp" style={{ width: '100%', fontSize: '0.875rem' }} />
                        </div>
                    </div>
                    <button className="btn btn-primary" style={{ width: '100%', padding: '0.625rem', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                        search
                    </button>
                </div>

                {/* Tab bar */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '0.25rem' }}>
                    {/* Left tabs: new, top */}
                    {['new', 'top'].map(t => (
                        <Link key={t} href={`/bounties?tab=${t}${category ? `&category=${encodeURIComponent(category)}` : ''}`}
                            style={{
                                fontFamily: 'var(--font-mono)', fontSize: '0.875rem', padding: '0.375rem 0.75rem',
                                borderRadius: 'var(--radius-sm)',
                                color: tab === t && !view ? 'var(--text)' : 'var(--text-3)',
                                fontWeight: tab === t && !view ? 600 : 400,
                                textDecoration: 'none', transition: 'color 0.15s', whiteSpace: 'nowrap'
                            }}>
                            {t}
                        </Link>
                    ))}

                    {/* Spacer */}
                    <div style={{ flex: 1 }} />

                    {/* Right tabs: my bounties, my applications */}
                    <Link href={`/bounties?view=my-bounties`}
                        style={{
                            fontFamily: 'var(--font-mono)', fontSize: '0.875rem', padding: '0.375rem 0.875rem',
                            borderRadius: 'var(--radius-sm)',
                            background: isMyBounties ? 'var(--bg-card)' : 'transparent',
                            border: isMyBounties ? '1px solid var(--border)' : '1px solid transparent',
                            color: isMyBounties ? '#fff' : 'var(--text-3)',
                            fontWeight: isMyBounties ? 600 : 400,
                            textDecoration: 'none', transition: 'all 0.15s', whiteSpace: 'nowrap'
                        }}>
                        my bounties
                    </Link>
                    <Link href={`/bounties?view=my-applications`}
                        style={{
                            fontFamily: 'var(--font-mono)', fontSize: '0.875rem', padding: '0.375rem 0.875rem',
                            borderRadius: 'var(--radius-sm)',
                            background: isMyApplications ? 'var(--bg-card)' : 'transparent',
                            border: isMyApplications ? '1px solid var(--border)' : '1px solid transparent',
                            color: isMyApplications ? '#fff' : 'var(--text-3)',
                            fontWeight: isMyApplications ? 600 : 400,
                            textDecoration: 'none', transition: 'all 0.15s', whiteSpace: 'nowrap'
                        }}>
                        my applications
                    </Link>

                    {/* Create bounty button */}
                    <Link href="/bounties/create" className="btn btn-primary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
                        + create bounty
                    </Link>
                </div>

                {/* Content area */}
                {isMyBounties ? (
                    <MyBountiesEmpty />
                ) : isMyApplications ? (
                    <MyApplicationsEmpty />
                ) : (
                    <BountyList bounties={bounties} catIcon={catIcon} />
                )}

            </div>
        </div>
    );
}

function BountyList({ bounties, catIcon }: { bounties: any[], catIcon: Record<string, string> }) {
    if (bounties.length === 0) {
        return (
            <div style={{ border: '1px dashed var(--border)', borderRadius: 'var(--radius)', padding: '5rem', textAlign: 'center', color: 'var(--text-4)', fontFamily: 'var(--font-mono)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🪺</div>
                no bounties posted yet. be the first!
            </div>
        );
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {bounties.map((b: any) => (
                <Link key={b.id} href={`/bounties/${b.id}`} className="card" style={{ padding: '1rem 1.25rem', cursor: 'pointer', textDecoration: 'none', display: 'block' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <div style={{ width: '2.75rem', height: '2.75rem', background: 'var(--bg-hover)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                            {catIcon[b.category] || catIcon.default}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.25rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    <span className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{b.category}</span>
                                    {b.verifiedOnly && <span className="badge badge-orange" style={{ fontSize: '0.6rem' }}>VERIFIED ONLY</span>}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                                    <span className="mono" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--orange)' }}>
                                        {FormatPrice(b)}
                                    </span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-4)', fontFamily: 'var(--font-mono)' }}>
                                        by {b.poster?.name || 'anonymous'}
                                    </span>
                                </div>
                            </div>
                            <h3 className="mono" style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.375rem', color: 'var(--text)', lineHeight: 1.4 }}>{b.title}</h3>
                            <p style={{ color: 'var(--text-3)', fontSize: '0.8125rem', lineHeight: 1.6, marginBottom: '0.75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{b.description}</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                                {b.skillsNeeded && b.skillsNeeded.split(',').slice(0, 3).map((s: string) => (
                                    <span key={s} className="badge" style={{ fontSize: '0.7rem' }}>{s.trim()}</span>
                                ))}
                                <span className="badge" style={{ fontSize: '0.7rem' }}>📍 {b.location || 'Remote'}</span>
                                {b.spots > 1 && <span className="badge" style={{ fontSize: '0.7rem' }}>👥 {b.spots} spots</span>}
                                {b.dueDate && <span className="badge badge-red" style={{ fontSize: '0.7rem' }}>⏳ Due {new Date(b.dueDate).toLocaleDateString()}</span>}
                                <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-4)' }}>{timeAgo(new Date(b.createdAt))}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

function MyBountiesEmpty() {
    return (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '5rem 2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📝</div>
            <h3 className="mono" style={{ fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>no bounties posted yet</h3>
            <p style={{ color: 'var(--text-3)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Create your first bounty to get started</p>
            <Link href="/bounties/create" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-block', padding: '0.625rem 1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                create your first bounty
            </Link>
        </div>
    );
}

function MyApplicationsEmpty() {
    return (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '5rem 2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📋</div>
            <h3 className="mono" style={{ fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>no applications yet</h3>
            <p style={{ color: 'var(--text-3)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>browse bounties and apply to get started</p>
            <Link href="/bounties" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-block', padding: '0.625rem 1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                browse bounties
            </Link>
        </div>
    );
}
