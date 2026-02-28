import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export default async function HumanProfile({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const human = await prisma.user.findUnique({ where: { id }, include: { services: true } });
    if (!human) notFound();

    const initials = (human.name || '?').split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
    const views = 100 + ((id.charCodeAt(0) || 1) * 37) % 4000;

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <div className="wrap-sm" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>

                {/* Profile card */}
                <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                        <div style={{ width: '5rem', height: '5rem', borderRadius: '50%', background: 'var(--bg-hover)', border: '1px solid var(--border-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--text-3)', flexShrink: 0 }}>
                            {initials}
                        </div>
                        <div style={{ flex: 1, minWidth: '12rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                <h1 className="mono" style={{ fontSize: '1.25rem', fontWeight: 700 }}>{human.name}</h1>
                                {human.verified && <span style={{ color: 'var(--blue)', fontSize: '0.75rem' }}>● verified</span>}
                            </div>
                            <div style={{ display: 'flex', gap: '0.875rem', fontSize: '0.75rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', marginBottom: '0.625rem' }}>
                                <span>★ new</span><span>👁 {views}</span>
                                {human.remoteOk && <span className="badge badge-green">remote</span>}
                            </div>
                            {human.location && <p style={{ color: 'var(--text-3)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>📍 {human.location}</p>}
                            {human.bio && human.bio !== 'Crawled human from rentahuman.ai' && (
                                <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.65 }}>{human.bio}</p>
                            )}
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <div className="mono" style={{ color: 'var(--orange)', fontWeight: 700, fontSize: '1.5rem' }}>
                                ${human.hourlyRate || 50}<span style={{ fontSize: '0.75rem', color: 'var(--text-3)', fontWeight: 400 }}>/hr</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
                        <button className="btn btn-primary" style={{ flex: 1 }}>rent now</button>
                        <button className="btn btn-outline" style={{ flex: 1 }}>message</button>
                    </div>
                </div>

                {/* Services */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h2 className="mono" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-2)' }}>services</h2>
                        <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-4)' }}>{human.services.length} active</span>
                    </div>

                    {human.services.length > 0 ? (
                        <div className="grid-2" style={{ gap: '0.75rem' }}>
                            {human.services.map((s: any) => (
                                <div key={s.id} className="card" style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                        <h3 className="mono" style={{ fontSize: '0.875rem', fontWeight: 600, flex: 1, marginRight: '1rem' }}>{s.title}</h3>
                                        <span className="mono" style={{ color: 'var(--orange)', fontWeight: 700, fontSize: '0.875rem', flexShrink: 0 }}>
                                            ${s.price}<span style={{ color: 'var(--text-3)', fontWeight: 400, fontSize: '0.7rem' }}>/{s.pricingType === 'HOURLY' ? 'hr' : 'flat'}</span>
                                        </span>
                                    </div>
                                    <p style={{ color: 'var(--text-3)', fontSize: '0.8rem', marginBottom: '0.75rem', lineHeight: 1.6 }}>{s.description}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span className="badge">{s.category}</span>
                                        <button className="btn btn-primary" style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }}>book</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ border: '1px dashed var(--border)', borderRadius: 'var(--radius)', padding: '3rem', textAlign: 'center', color: 'var(--text-4)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                            no services listed yet
                        </div>
                    )}
                </div>

                {/* Custom bounty CTA */}
                <div style={{ background: 'rgba(249,115,22,0.07)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 'var(--radius)', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <div>
                        <h3 className="mono" style={{ fontWeight: 600, color: 'var(--orange)', marginBottom: '0.375rem' }}>have a custom task?</h3>
                        <p style={{ color: 'var(--text-3)', fontSize: '0.875rem' }}>send a direct message with your task requirements and bounty offer.</p>
                    </div>
                    <button className="btn btn-primary" style={{ flexShrink: 0, padding: '0.75rem 1.5rem' }}>request bounty</button>
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                    <Link href="/browse" className="mono" style={{ color: 'var(--text-3)', fontSize: '0.875rem', transition: 'color 0.15s' }}
                        onMouseOver={(e) => (e.currentTarget.style.color = 'var(--text)')}
                        onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-3)')}>
                        ← back to browse
                    </Link>
                </div>
            </div>
        </div>
    );
}
