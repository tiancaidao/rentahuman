import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function ServiceDetailPage({ params }: { params: Promise<{ humanId: string; serviceId: string }> }) {
    const { humanId, serviceId } = await params;

    const service = await prisma.service.findUnique({
        where: { id: serviceId },
        include: { human: { include: { services: { take: 4 } } } },
    });

    if (!service || service.humanId !== humanId) notFound();

    const human = service.human;
    const initials = (human.name || '?').split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
    const otherServices = human.services.filter((s: any) => s.id !== serviceId).slice(0, 3);

    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const today = new Date();
    const calDays = Array.from({ length: 21 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        return { day: days[d.getDay()], date: d.getDate() };
    });

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <div className="wrap" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
                {/* Breadcrumb */}
                <Link href="/services" className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-3)', display: 'inline-flex', alignItems: 'center', gap: '0.375rem', marginBottom: '1.5rem', transition: 'color 0.15s' }}>
                    ← back to services
                </Link>

                {/* Two-col layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 22rem', gap: '2rem', alignItems: 'flex-start' }}>

                    {/* LEFT — Main Content */}
                    <div>
                        {/* Image area */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', marginBottom: '1.5rem', overflow: 'hidden' }}>
                            <div style={{ height: '22rem', background: 'linear-gradient(135deg, var(--bg-hover) 0%, #1a1a1f 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                <div style={{ textAlign: 'center', color: 'var(--text-4)', fontFamily: 'var(--font-mono)' }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🖼️</div>
                                    <div style={{ fontSize: '0.75rem' }}>no photos yet</div>
                                </div>
                                {/* Nav arrows */}
                                <button style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(9,9,11,0.8)', border: '1px solid var(--border)', color: 'var(--text-3)', width: '2.5rem', height: '2.5rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '1rem' }}>‹</button>
                                <button style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(9,9,11,0.8)', border: '1px solid var(--border)', color: 'var(--text-3)', width: '2.5rem', height: '2.5rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '1rem' }}>›</button>
                            </div>
                            {/* Thumbnails */}
                            <div style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem', borderTop: '1px solid var(--border)' }}>
                                {[0, 1, 2, 3].map(i => (
                                    <div key={i} style={{ width: '4rem', height: '3rem', background: i === 0 ? 'var(--bg-hover)' : 'var(--bg)', border: `1px solid ${i === 0 ? 'var(--orange)' : 'var(--border)'}`, borderRadius: 'var(--radius-xs)', cursor: 'pointer' }} />
                                ))}
                            </div>
                        </div>

                        {/* Category + title */}
                        <div style={{ marginBottom: '1.25rem' }}>
                            <span className="badge badge-orange" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>{service.category}</span>
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                                <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.2 }}>{service.title}</h1>
                                <button style={{ background: 'none', border: 'none', color: 'var(--text-3)', cursor: 'pointer', fontSize: '1.25rem', flexShrink: 0, marginTop: '0.25rem' }}>♡</button>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                                <span style={{ color: 'var(--orange)', fontWeight: 700 }}>${service.price}</span>
                                <span style={{ color: 'var(--text-4)' }}>|</span>
                                <span style={{ color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <span>⏱</span> {service.estimatedDuration || '1 hour'}
                                </span>
                                <span style={{ color: 'var(--text-4)' }}>|</span>
                                <span style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', padding: '0.125rem 0.5rem', fontSize: '0.75rem', color: 'var(--text-2)' }}>
                                    {service.pricingType === 'FIXED' ? 'fixed price' : 'hourly rate'}
                                </span>
                            </div>
                        </div>

                        {/* About */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem', marginBottom: '1rem' }}>
                            <p className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>about this service</p>
                            <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: 1.7 }}>{service.description}</p>
                        </div>

                        {/* What's included */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem', marginBottom: '1.5rem' }}>
                            <p className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>what's included</p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
                                <div style={{ padding: '0.875rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
                                    <div style={{ color: 'var(--orange)', marginBottom: '0.25rem' }}>⏱</div>
                                    <div className="mono" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.125rem' }}>{service.estimatedDuration || '1 hour'}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-4)' }}>estimated duration</div>
                                </div>
                                <div style={{ padding: '0.875rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
                                    <div style={{ color: 'var(--green)', marginBottom: '0.25rem' }}>🛡</div>
                                    <div className="mono" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.125rem' }}>secure payment</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-4)' }}>payment protection via Stripe</div>
                                </div>
                                {human.location && (
                                    <div style={{ padding: '0.875rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
                                        <div style={{ marginBottom: '0.25rem' }}>📍</div>
                                        <div className="mono" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.125rem' }}>{human.location}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-4)' }}>provider location</div>
                                    </div>
                                )}
                                <div style={{ padding: '0.875rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
                                    <div style={{ color: 'var(--blue)', marginBottom: '0.25rem' }}>⚡</div>
                                    <div className="mono" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.125rem' }}>48h response</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-4)' }}>guaranteed reply time</div>
                                </div>
                            </div>
                        </div>

                        {/* More services by this human */}
                        {otherServices.length > 0 && (
                            <div>
                                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-3)', marginBottom: '1rem' }}>
                                    more services by {human.name}
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                                    {otherServices.map((s: any) => (
                                        <Link key={s.id} href={`/services/${human.id}/${s.id}`}
                                            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', textDecoration: 'none', display: 'block', transition: 'border-color 0.15s' }}>
                                            <div style={{ height: '6rem', background: 'var(--bg-hover)', position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '0.5rem' }}>
                                                <span style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'var(--orange)', color: '#000', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, padding: '0.125rem 0.4rem', borderRadius: 'var(--radius-xs)' }}>${s.price}</span>
                                            </div>
                                            <div style={{ padding: '0.75rem' }}>
                                                <div className="mono" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.25rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{s.title}</div>
                                                <div style={{ fontSize: '0.65rem', color: 'var(--text-4)' }}>{s.category}</div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem', fontSize: '0.65rem', color: 'var(--text-4)', fontFamily: 'var(--font-mono)' }}>
                                                    <span>⏱</span> {s.estimatedDuration || '1 hour'}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT — Sidebar */}
                    <div style={{ position: 'sticky', top: '4.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                        {/* Booking widget */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--orange)' }}>${service.price}</span>
                                <span style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', padding: '0.25rem 0.625rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-2)' }}>
                                    {service.pricingType === 'FIXED' ? 'fixed price' : `per hour`}
                                </span>
                            </div>

                            {/* Calendar */}
                            <p className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>select date</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.25rem', marginBottom: '1.25rem' }}>
                                {calDays.slice(0, 21).map((d, i) => (
                                    <button key={i} style={{
                                        padding: '0.375rem 0', background: i === 4 ? 'var(--orange)' : 'var(--bg)', border: `1px solid ${i === 4 ? 'var(--orange)' : 'var(--border)'}`,
                                        borderRadius: 'var(--radius-xs)', cursor: 'pointer', textAlign: 'center', fontFamily: 'var(--font-mono)',
                                        color: i === 4 ? '#000' : 'var(--text-3)', fontSize: '0.65rem', fontWeight: i === 4 ? 700 : 400,
                                    }}>
                                        <div style={{ fontSize: '0.55rem', color: i === 4 ? '#000' : 'var(--text-4)' }}>{d.day[0].toUpperCase()}</div>
                                        <div>{d.date}</div>
                                    </button>
                                ))}
                            </div>

                            <button className="btn btn-primary" style={{ width: '100%', padding: '0.875rem', fontSize: '0.875rem' }}>
                                request to book — ${service.price}
                            </button>
                            <p style={{ textAlign: 'center', fontSize: '0.65rem', color: 'var(--text-4)', fontFamily: 'var(--font-mono)', marginTop: '0.625rem' }}>
                                secure checkout powered by Stripe
                            </p>
                            <p style={{ textAlign: 'center', fontSize: '0.65rem', color: 'var(--text-4)', fontFamily: 'var(--font-mono)', marginTop: '0.25rem', lineHeight: 1.5 }}>
                                your payment is protected — refunded if provider declines or doesn't respond
                            </p>
                        </div>

                        {/* Provider card */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem' }}>
                            <p className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.875rem' }}>provided by</p>
                            <Link href={`/humans/${human.id}`} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '0.875rem', textDecoration: 'none' }}>
                                <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: 'var(--bg-hover)', border: '1px solid var(--border-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-3)', flexShrink: 0 }}>
                                    {initials}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                        <span className="mono" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>{human.name}</span>
                                        {human.verified && <span style={{ color: 'var(--blue)', fontSize: '0.7rem' }}>●</span>}
                                    </div>
                                    {human.bio && (
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', marginTop: '0.125rem', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {human.bio}
                                        </p>
                                    )}
                                    {human.location && (
                                        <p style={{ fontSize: '0.7rem', color: 'var(--text-4)', fontFamily: 'var(--font-mono)', marginTop: '0.25rem' }}>📍 {human.location}</p>
                                    )}
                                </div>
                            </Link>
                            {/* Tags derived from service categories */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                                {human.services.slice(0, 4).map((s: any) => (
                                    <span key={s.id} className="badge">{s.category}</span>
                                ))}
                            </div>
                        </div>

                        {/* Trust badges */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
                                <span style={{ color: 'var(--green)' }}>🛡</span> Stripe-secured payments
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
                                <span style={{ color: 'var(--orange)' }}>⚡</span> 48h response from provider
                            </div>
                            {human.verified && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
                                    <span style={{ color: 'var(--blue)' }}>●</span> verified provider
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
