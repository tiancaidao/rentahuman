import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

const catIcon: Record<string, string> = {
    Hiring: '📋', Research: '🔍', Creative: '🎨', Tech: '💻',
    Delivery: '📦', Companionship: '🫂', Writing: '✍️', default: '🎯',
};

function timeAgo(date: Date) {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
}

export default async function BountyDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const bounty = await prisma.bounty.findUnique({
        where: { id },
        include: { poster: { select: { id: true, name: true, verified: true, location: true } } },
    });
    if (!bounty) notFound();

    const poster = bounty.poster;
    const posterInitials = (poster.name || '?').split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
    const views = 55 + ((id.charCodeAt(0) || 1) * 23) % 200;
    const applications = Math.floor(views / 12);

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <div className="wrap" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
                {/* Breadcrumb */}
                <Link href="/bounties" className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-3)', display: 'inline-flex', alignItems: 'center', gap: '0.375rem', marginBottom: '1.5rem', transition: 'color 0.15s' }}>
                    ← back to bounties
                </Link>

                {/* Two-col layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 20rem', gap: '1.5rem', alignItems: 'flex-start' }}>

                    {/* LEFT — Main Content */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                        {/* Header card */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.875rem' }}>
                                <span style={{ fontSize: '1.25rem' }}>{catIcon[bounty.category] || catIcon.default}</span>
                                <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{bounty.category}</span>
                                <span className="badge badge-green" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>open</span>
                            </div>
                            <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '1rem', color: 'var(--text)' }}>
                                {bounty.title}
                            </h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Link href={`/humans/${poster.id}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                                    <div style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', background: 'var(--bg-hover)', border: '1px solid var(--border-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.65rem', color: 'var(--text-3)', flexShrink: 0 }}>
                                        {posterInitials}
                                    </div>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>Posted by</span>
                                    <span className="mono" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text)' }}>{poster.name}</span>
                                    <span className="badge" style={{ fontSize: '0.6rem' }}>human</span>
                                </Link>
                                <span style={{ color: 'var(--text-4)', fontSize: '0.75rem' }}>•</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-4)', fontFamily: 'var(--font-mono)' }}>{timeAgo(new Date(bounty.createdAt))}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
                            <p className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.875rem' }}>description</p>
                            <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: 1.75, fontStyle: 'italic' }}>{bounty.description}</p>
                        </div>

                        {/* Photos placeholder */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
                            <p className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.875rem' }}>photos</p>
                            <div style={{ height: '10rem', background: 'var(--bg)', border: '1px dashed var(--border)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-4)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                                no photos attached
                            </div>
                        </div>

                        {/* Requirements */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
                            <p className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.875rem' }}>requirements</p>
                            <ul style={{ paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-2)', fontSize: '0.875rem' }}>
                                    <span style={{ color: 'var(--orange)', fontWeight: 700, flexShrink: 0 }}>•</span>
                                    Must be available {bounty.location === 'Remote' || bounty.location === 'Remote only' ? 'remotely' : `in ${bounty.location}`}
                                </li>
                                {bounty.spots > 1 && (
                                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-2)', fontSize: '0.875rem' }}>
                                        <span style={{ color: 'var(--orange)', fontWeight: 700, flexShrink: 0 }}>•</span>
                                        Looking for {bounty.spots} people
                                    </li>
                                )}
                                {bounty.dueDate && (
                                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-2)', fontSize: '0.875rem' }}>
                                        <span style={{ color: 'var(--orange)', fontWeight: 700, flexShrink: 0 }}>•</span>
                                        Due by {new Date(bounty.dueDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </li>
                                )}
                            </ul>
                        </div>

                        {/* Skills needed */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
                            <p className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.875rem' }}>skills needed</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                <span style={{ padding: '0.375rem 0.875rem', background: 'var(--bg)', border: '1px solid var(--border-md)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-2)' }}>{bounty.category}</span>
                                {bounty.location && bounty.location !== 'Remote' && (
                                    <span style={{ padding: '0.375rem 0.875rem', background: 'var(--bg)', border: '1px solid var(--border-md)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-2)' }}>Local presence</span>
                                )}
                            </div>
                        </div>

                        {/* Comments */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
                            <p className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.875rem' }}>comments</p>
                            <textarea
                                placeholder="flag a scam, vouch for legitimacy, or ask a question..."
                                style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', color: 'var(--text)', fontFamily: 'var(--font-sans)', fontSize: '0.875rem', resize: 'vertical', minHeight: '5rem', outline: 'none' }}
                            />
                            <button className="btn btn-outline" style={{ marginTop: '0.75rem', fontSize: '0.8rem', padding: '0.4rem 0.875rem' }}>post comment</button>
                            <p style={{ marginTop: '1rem', color: 'var(--text-4)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>no comments yet</p>
                        </div>
                    </div>

                    {/* RIGHT — Sidebar */}
                    <div style={{ position: 'sticky', top: '4.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                        {/* Price card */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem' }}>
                            <div style={{ marginBottom: '0.5rem' }}>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 700, color: 'var(--orange)' }}>
                                    ${bounty.minPrice && bounty.maxPrice && bounty.minPrice !== bounty.maxPrice
                                        ? `${bounty.minPrice}–${bounty.maxPrice}`
                                        : bounty.minPrice || bounty.maxPrice || '?'}
                                </span>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--text-3)', marginLeft: '0.375rem' }}>
                                    {bounty.minPrice && bounty.maxPrice && bounty.minPrice !== bounty.maxPrice ? '' : 'fixed'}
                                </span>
                            </div>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-4)' }}>USD</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.875rem', paddingTop: '0.875rem', borderTop: '1px solid var(--border)' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>Estimated hours</span>
                                <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-2)', fontWeight: 600 }}>~2h</span>
                            </div>
                        </div>

                        {/* Location */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem' }}>
                            <p className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>location</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-2)' }}>
                                <span>📍</span>
                                <span>{bounty.location || 'Remote only'}</span>
                            </div>
                            {bounty.dueDate && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-3)', marginTop: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                                    <span>⏳</span>
                                    <span>Due {new Date(bounty.dueDate).toLocaleDateString()}</span>
                                </div>
                            )}
                        </div>

                        {/* Stats */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem' }}>
                            <p className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.875rem' }}>stats</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>
                                    {bounty.spots > 1 ? `${bounty.spots} spots available` : ''}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>Applications</span>
                                <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-2)', fontWeight: 600 }}>{applications}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.375rem' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>Views</span>
                                <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-2)', fontWeight: 600 }}>{views}</span>
                            </div>
                        </div>

                        {/* CTA */}
                        <button className="btn btn-primary" style={{ width: '100%', padding: '0.875rem', fontSize: '0.875rem' }}>
                            apply for this bounty
                        </button>

                        {/* Report */}
                        <button style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', cursor: 'pointer', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem' }}>
                            🚩 report this bounty
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
