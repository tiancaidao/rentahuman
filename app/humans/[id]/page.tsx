import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export default async function HumanProfile({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const human = await prisma.user.findUnique({
        where: { id },
        include: { services: { orderBy: { createdAt: 'desc' } } },
    });
    if (!human) notFound();

    const initials = (human.name || '?').split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
    const views = 100 + ((id.charCodeAt(0) || 1) * 37) % 4000;

    // Derive unique skill tags from service categories + titles
    const skillTags = [...new Set(human.services.flatMap((s: any) => [s.category, ...s.title.split(/[\s&,]+/).slice(0, 2)]))]
        .filter(Boolean).slice(0, 8);

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <div className="wrap-sm" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>

                {/* Top nav */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <Link href="/browse" className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-3)', display: 'inline-flex', alignItems: 'center', gap: '0.375rem', transition: 'color 0.15s' }}>
                        ← back
                    </Link>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '0.375rem 0.875rem', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-3)' }}>
                        ↗ share
                    </button>
                </div>

                {/* Profile card */}
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                        {/* Avatar */}
                        <div style={{ width: '5rem', height: '5rem', borderRadius: '50%', background: 'var(--bg-hover)', border: '2px solid var(--border-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--text-3)', flexShrink: 0 }}>
                            {initials}
                        </div>
                        {/* Info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.375rem' }}>
                                <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.375rem', fontWeight: 700 }}>{human.name}</h1>
                                {human.remoteOk && (
                                    <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>available</span>
                                )}
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.78rem', color: 'var(--text-4)', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem', alignItems: 'center' }}>
                                <span>★ new</span>
                                <span>👁 {views} views</span>
                            </div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.375rem', fontWeight: 700, color: 'var(--orange)' }}>
                                ${human.hourlyRate || 50}<span style={{ fontSize: '0.75rem', color: 'var(--text-3)', fontWeight: 400 }}>/hr</span>
                            </div>
                        </div>
                        {/* CTA */}
                        <button className="btn btn-primary" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                            💬 message
                        </button>
                    </div>

                    {human.bio && (
                        <p style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.7 }}>
                            {human.bio}
                        </p>
                    )}
                    {human.location && (
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-4)', fontFamily: 'var(--font-mono)', marginTop: '0.5rem' }}>
                            📍 {human.location}
                        </p>
                    )}
                </div>

                {/* Skills */}
                {skillTags.length > 0 && (
                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem', marginBottom: '1rem' }}>
                        <p className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>skills</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {skillTags.map((skill: string, i: number) => (
                                <span key={i} style={{ padding: '0.3rem 0.75rem', background: 'var(--bg)', border: '1px solid var(--border-md)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-2)' }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem' }}>
                        <p className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>languages</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <span style={{ padding: '0.3rem 0.75rem', background: 'var(--bg)', border: '1px solid var(--border-md)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-2)' }}>
                                English
                            </span>
                            {human.location?.includes('JP') && (
                                <span style={{ padding: '0.3rem 0.75rem', background: 'var(--bg)', border: '1px solid var(--border-md)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-2)' }}>Japanese</span>
                            )}
                            {human.location?.includes('ES') && (
                                <span style={{ padding: '0.3rem 0.75rem', background: 'var(--bg)', border: '1px solid var(--border-md)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-2)' }}>Spanish</span>
                            )}
                            {human.location?.includes('PT') && (
                                <span style={{ padding: '0.3rem 0.75rem', background: 'var(--bg)', border: '1px solid var(--border-md)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-2)' }}>Portuguese</span>
                            )}
                        </div>
                    </div>
                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem' }}>
                        <p className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>hourly rate</p>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--orange)' }}>
                            ${human.hourlyRate || 50}<span style={{ fontSize: '0.7rem', color: 'var(--text-3)', fontWeight: 400 }}>/hr</span>
                        </div>
                        {human.verified && (
                            <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: 'var(--blue)', fontFamily: 'var(--font-mono)' }}>
                                ● verified human
                            </div>
                        )}
                    </div>
                </div>

                {/* Availability */}
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem', marginBottom: '1rem' }}>
                    <p className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.875rem' }}>availability</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', marginBottom: '0.875rem' }}>
                        <span>tz: UTC</span>
                        <span>radius: 25mi</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.375rem' }}>
                        {DAYS.map(day => (
                            <div key={day} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
                                <span style={{ color: 'var(--text-4)', minWidth: '2rem' }}>{day}</span>
                                <span style={{ color: 'var(--green)' }}>09:00–17:00</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Services */}
                {human.services.length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.875rem' }}>
                            <p className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>services</p>
                            <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-4)' }}>{human.services.length} active</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                            {human.services.map((s: any) => (
                                <Link key={s.id} href={`/services/${human.id}/${s.id}`}
                                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '0.875rem 1rem', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'border-color 0.15s', gap: '1rem' }}>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div className="mono" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.25rem' }}>{s.title}</div>
                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                            <span className="badge">{s.category}</span>
                                            <span style={{ fontSize: '0.7rem', color: 'var(--text-4)', fontFamily: 'var(--font-mono)' }}>⏱ {s.estimatedDuration || '1 hour'}</span>
                                        </div>
                                    </div>
                                    <div className="mono" style={{ fontWeight: 700, color: 'var(--orange)', fontSize: '0.9rem', flexShrink: 0 }}>
                                        ${s.price}<span style={{ color: 'var(--text-4)', fontWeight: 400, fontSize: '0.7rem' }}>/{s.pricingType === 'FIXED' ? 'flat' : 'hr'}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* For agents */}
                <div style={{ background: 'rgba(249,115,22,0.04)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 'var(--radius)', padding: '1.25rem', marginBottom: '1rem' }}>
                    <p className="mono" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.375rem' }}>🤖 for agents</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginBottom: '0.875rem' }}>book via mcp or rest api</p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Link href="/api" className="mono" style={{ fontSize: '0.8rem', color: 'var(--orange)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>api →</Link>
                        <Link href="/mcp" className="mono" style={{ fontSize: '0.8rem', color: 'var(--orange)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>mcp →</Link>
                    </div>
                </div>

                {/* Report */}
                <button style={{ width: '100%', padding: '0.875rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', cursor: 'pointer', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem' }}>
                    🚩 report this profile
                </button>
            </div>
        </div>
    );
}
