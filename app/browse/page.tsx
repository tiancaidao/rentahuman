import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export default async function BrowsePage({
    searchParams,
}: {
    searchParams: Promise<{ skill?: string; city?: string; country?: string; maxRate?: string }>;
}) {
    const params = await searchParams;
    const { skill, city, country, maxRate } = params;

    const where: any = { role: "HUMAN" };
    if (skill) where.services = { some: { title: { contains: skill, mode: "insensitive" } } };
    if (city) where.location = { contains: city, mode: "insensitive" };
    if (country) where.location = { contains: country, mode: "insensitive" };
    if (maxRate) where.hourlyRate = { lte: parseFloat(maxRate) };

    const humans = await prisma.user.findMany({
        where,
        include: { services: { take: 3 } },
        orderBy: { createdAt: "desc" },
        take: 50,
    });

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <div className="wrap" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <h1 className="mono" style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>browse humans</h1>
                    <p style={{ color: 'var(--text-3)', fontSize: '0.875rem', fontFamily: 'var(--font-mono)' }}>find meatspace workers for your agent</p>
                </div>

                {/* Search */}
                <form method="GET" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem', alignItems: 'flex-end' }}>
                    {[
                        { name: 'skill', label: 'skill', placeholder: 'package pickup...' },
                        { name: 'city', label: 'city', placeholder: 'San Francisco, NYC...' },
                        { name: 'country', label: 'country', placeholder: 'USA, Japan...' },
                    ].map(f => (
                        <div key={f.name} style={{ flex: '1', minWidth: '140px' }}>
                            <label className="mono" style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-3)', marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.label}</label>
                            <input name={f.name} defaultValue={(params as any)[f.name] || ''} placeholder={f.placeholder} className="inp" />
                        </div>
                    ))}
                    <div style={{ width: '8rem' }}>
                        <label className="mono" style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-3)', marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>max $/hr</label>
                        <input name="maxRate" defaultValue={maxRate || ''} placeholder="100" type="number" className="inp" />
                    </div>
                    <button type="submit" className="btn btn-primary">search</button>
                </form>

                {/* Grid */}
                <div className="grid-3">
                    {humans.map((h: any) => {
                        const init = (h.name || '?').charAt(0).toUpperCase();
                        const views = 100 + ((h.id?.charCodeAt(0) || 1) * 37) % 4000;
                        return (
                            <div key={h.id} className="card card-orange" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                                {/* Header */}
                                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: 'var(--bg-hover)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.125rem', color: 'var(--text-3)', flexShrink: 0 }}>
                                        {init}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.125rem' }}>
                                            <span className="mono" style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{h.name}</span>
                                            {h.verified && <span style={{ color: 'var(--blue)', fontSize: '0.65rem' }}>●</span>}
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.625rem', fontSize: '0.7rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
                                            <span>★ new</span>
                                            <span>👁 {views}</span>
                                        </div>
                                    </div>
                                    {h.remoteOk && <span className="badge badge-green">remote</span>}
                                </div>

                                {h.location && (
                                    <p style={{ color: 'var(--text-3)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>📍 {h.location}</p>
                                )}

                                {h.services?.length > 0 && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                                        {h.services.slice(0, 3).map((s: any) => (
                                            <span key={s.id} className="tag">{s.title.slice(0, 18)}</span>
                                        ))}
                                    </div>
                                )}

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '0.625rem', borderTop: '1px solid var(--border)' }}>
                                    <span className="mono" style={{ color: 'var(--orange)', fontWeight: 700, fontSize: '1rem' }}>
                                        ${h.hourlyRate || 50}<span style={{ fontSize: '0.7rem', color: 'var(--text-3)', fontWeight: 400 }}>/hr</span>
                                    </span>
                                    <Link href={`/humans/${h.id}`} className="btn btn-primary" style={{ padding: '0.375rem 0.875rem', fontSize: '0.75rem' }}>rent</Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {humans.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍</div>
                        <p>no humans found matching your filters</p>
                    </div>
                )}
            </div>
        </div>
    );
}
