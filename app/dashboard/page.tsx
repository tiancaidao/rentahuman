'use client';
import { useState } from 'react';
import Link from 'next/link';

const TABS = ['profile', 'photos', 'services', 'payments', 'escrow', 'api keys', 'messages'];
const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const HOURS = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);
const COUNTRIES = ['Select country', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'Singapore', 'Other'];

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [available, setAvailable] = useState(true);
    const [showEmail, setShowEmail] = useState(false);
    const [schedule, setSchedule] = useState(
        DAYS.reduce((acc, d) => ({ ...acc, [d]: { enabled: true, start: '09:00', end: '17:00' } }), {} as Record<string, { enabled: boolean; start: string; end: string }>)
    );
    const [skills, setSkills] = useState<string[]>([]);
    const [skillInput, setSkillInput] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [headline, setHeadline] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [hourlyRate, setHourlyRate] = useState('50');

    const views = 20;

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '3.5rem' }}>
            <div className="wrap" style={{ paddingTop: '1.5rem', paddingBottom: '4rem' }}>

                {/* Profile completion banner */}
                <div style={{ background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 'var(--radius)', padding: '1rem 1.25rem', marginBottom: '1rem' }}>
                    <p className="mono" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--orange)', marginBottom: '0.5rem' }}>complete your profile</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginBottom: '0.625rem' }}>finish these steps to start receiving bookings:</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8rem' }}>
                            <span style={{ color: 'var(--green)' }}>✓</span>
                            <span style={{ color: 'var(--text-3)', textDecoration: 'line-through' }}>Add your name</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text)' }}>
                            <span style={{ color: 'var(--text-4)' }}>○</span>
                            Add at least one skill
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text)' }}>
                            <span style={{ color: 'var(--text-4)' }}>○</span>
                            Add your city (e.g. San Francisco)
                        </div>
                    </div>
                </div>

                {/* Verification banner */}
                <div style={{ background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.2)', borderRadius: 'var(--radius)', padding: '1rem 1.25rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                            <span style={{ color: 'var(--blue)' }}>●</span>
                            <span className="mono" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--blue)' }}>get verified</span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>blue checkmark + priority listing for $9.99/month</p>
                    </div>
                    <Link href="/verify" className="btn" style={{ background: 'var(--blue)', color: '#000', fontSize: '0.8rem', padding: '0.5rem 1rem', flexShrink: 0 }}>
                        get verified →
                    </Link>
                </div>

                {/* Stats row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                    {[
                        { label: 'profile views', value: views },
                        { label: 'messages', value: '💬', icon: true },
                        { label: 'rating', value: '—' },
                    ].map(stat => (
                        <div key={stat.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1rem', textAlign: 'center' }}>
                            <div className="mono" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.25rem' }}>{stat.value}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-4)', fontFamily: 'var(--font-mono)' }}>{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Title */}
                <h1 className="mono" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>dashboard</h1>

                {/* Tabs */}
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '0.375rem', display: 'flex', gap: '0.25rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    {TABS.map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)}
                            style={{
                                padding: '0.5rem 0.875rem', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
                                background: activeTab === tab ? 'var(--orange)' : 'transparent', color: activeTab === tab ? '#000' : 'var(--text-3)',
                                border: 'none', cursor: 'pointer', fontWeight: activeTab === tab ? 700 : 400, transition: 'all 0.15s', position: 'relative',
                            }}>
                            {tab}
                            {tab === 'services' && <span style={{ position: 'absolute', top: '2px', right: '2px', background: 'var(--green)', borderRadius: '9999px', width: '6px', height: '6px' }} />}
                        </button>
                    ))}
                </div>

                {/* Profile tab content */}
                {activeTab === 'profile' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                        {/* Identity */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                                <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: 'var(--bg-hover)', border: '1px solid var(--border-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-3)', cursor: 'pointer', flexShrink: 0 }}>
                                    +
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p className="mono" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)' }}>Wu Xiao Dao</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-4)', fontFamily: 'var(--font-mono)' }}>tiancaidao@gmail.com</p>
                                    <span className="badge badge-green" style={{ marginTop: '0.375rem', fontSize: '0.6rem' }}>available</span>
                                </div>
                            </div>

                            {/* Gender hint */}
                            <div style={{ background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.15)', borderRadius: 'var(--radius-sm)', padding: '0.625rem 0.875rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>add your gender to help renters find you</p>
                                <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--orange)', cursor: 'pointer' }}>set now ↓</span>
                            </div>

                            {/* Fields */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.875rem', marginBottom: '0.875rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-4)', fontFamily: 'var(--font-mono)', marginBottom: '0.375rem' }}>name</label>
                                    <input className="inp" value={name} onChange={e => setName(e.target.value)} placeholder="Wu Xiao Dao" style={{ width: '100%' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-4)', fontFamily: 'var(--font-mono)', marginBottom: '0.375rem' }}>headline</label>
                                    <input className="inp" value={headline} onChange={e => setHeadline(e.target.value)} placeholder="what you do" style={{ width: '100%' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-4)', fontFamily: 'var(--font-mono)', marginBottom: '0.375rem' }}>gender</label>
                                    <select className="inp" style={{ width: '100%' }}>
                                        <option>select...</option>
                                        <option>male</option>
                                        <option>female</option>
                                        <option>non-binary</option>
                                        <option>prefer not to say</option>
                                    </select>
                                </div>
                            </div>

                            {/* Bio */}
                            <div style={{ marginBottom: '0.875rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-4)', fontFamily: 'var(--font-mono)', marginBottom: '0.375rem' }}>bio</label>
                                    <span style={{ fontSize: '0.65rem', color: 'var(--text-4)', fontFamily: 'var(--font-mono)' }}>{bio.length}/2000</span>
                                </div>
                                <textarea className="inp" value={bio} onChange={e => setBio(e.target.value)} rows={4} style={{ width: '100%', resize: 'vertical' }} />
                                <p style={{ fontSize: '0.7rem', color: 'var(--blue)', fontFamily: 'var(--font-mono)', marginTop: '0.375rem', cursor: 'pointer' }}>
                                    verify to increase bio limit to 4,000 characters
                                </p>
                            </div>
                        </div>

                        {/* Location */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
                                <span>📍</span>
                                <span className="mono" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>location</span>
                                <span className="badge badge-orange" style={{ fontSize: '0.6rem' }}>important — helps agents find you</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.875rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-4)', fontFamily: 'var(--font-mono)', marginBottom: '0.375rem' }}>city</label>
                                    <input className="inp" value={city} onChange={e => setCity(e.target.value)} placeholder="San Francisco" style={{ width: '100%' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-4)', fontFamily: 'var(--font-mono)', marginBottom: '0.375rem' }}>state/region</label>
                                    <input className="inp" value={state} onChange={e => setState(e.target.value)} placeholder="California" style={{ width: '100%' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-4)', fontFamily: 'var(--font-mono)', marginBottom: '0.375rem' }}>country</label>
                                    <select className="inp" style={{ width: '100%' }}>
                                        {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Availability */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <div>
                                    <p className="mono" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>available</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-4)' }}>accepting bookings?</p>
                                </div>
                                <button onClick={() => setAvailable(!available)}
                                    style={{ width: '3rem', height: '1.6rem', borderRadius: '9999px', background: available ? 'var(--green)' : 'var(--bg-hover)', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
                                    <div style={{ position: 'absolute', top: '3px', left: available ? 'calc(100% - 22px)' : '3px', width: '1.1rem', height: '1.1rem', borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                                </button>
                            </div>

                            <p className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>weekly schedule</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {DAYS.map(day => (
                                    <div key={day} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <button onClick={() => setSchedule(s => ({ ...s, [day]: { ...s[day], enabled: !s[day].enabled } }))}
                                            style={{ width: '2.5rem', height: '1.4rem', borderRadius: '9999px', background: schedule[day].enabled ? 'var(--green)' : 'var(--bg-hover)', border: 'none', cursor: 'pointer', position: 'relative', flexShrink: 0, transition: 'background 0.2s' }}>
                                            <div style={{ position: 'absolute', top: '2px', left: schedule[day].enabled ? 'calc(100% - 18px)' : '2px', width: '1rem', height: '1rem', borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                                        </button>
                                        <span className="mono" style={{ width: '2.5rem', fontSize: '0.78rem', color: schedule[day].enabled ? 'var(--text)' : 'var(--text-4)' }}>{day}</span>
                                        <select className="inp" disabled={!schedule[day].enabled} value={schedule[day].start} onChange={e => setSchedule(s => ({ ...s, [day]: { ...s[day], start: e.target.value } }))}
                                            style={{ width: '5.5rem', fontSize: '0.78rem', padding: '0.3rem 0.5rem', opacity: schedule[day].enabled ? 1 : 0.4 }}>
                                            {HOURS.map(h => <option key={h}>{h}</option>)}
                                        </select>
                                        <select className="inp" disabled={!schedule[day].enabled} value={schedule[day].end} onChange={e => setSchedule(s => ({ ...s, [day]: { ...s[day], end: e.target.value } }))}
                                            style={{ width: '5.5rem', fontSize: '0.78rem', padding: '0.3rem 0.5rem', opacity: schedule[day].enabled ? 1 : 0.4 }}>
                                            {HOURS.map(h => <option key={h}>{h}</option>)}
                                        </select>
                                        <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'var(--text-4)', fontFamily: 'var(--font-mono)', cursor: 'pointer' }}>+ slot</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
                                <div>
                                    <p className="mono" style={{ fontSize: '0.875rem', color: 'var(--text)' }}>show email</p>
                                    <p style={{ fontSize: '0.72rem', color: 'var(--text-4)' }}>display email on profile?</p>
                                </div>
                                <button onClick={() => setShowEmail(!showEmail)}
                                    style={{ width: '3rem', height: '1.6rem', borderRadius: '9999px', background: showEmail ? 'var(--green)' : 'var(--bg-hover)', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
                                    <div style={{ position: 'absolute', top: '3px', left: showEmail ? 'calc(100% - 22px)' : '3px', width: '1.1rem', height: '1.1rem', borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                                </button>
                            </div>
                        </div>

                        {/* Skills */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                <label className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>skills</label>
                                <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-4)' }}>{skills.length}/5 skills</span>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <input className="inp" value={skillInput} onChange={e => setSkillInput(e.target.value)}
                                    onKeyDown={e => { if (e.key === 'Enter' && skillInput.trim() && skills.length < 5) { setSkills(s => [...s, skillInput.trim()]); setSkillInput(''); } }}
                                    placeholder="type a skill and press enter" style={{ flex: 1 }} />
                                <button className="btn btn-outline" onClick={() => { if (skillInput.trim() && skills.length < 5) { setSkills(s => [...s, skillInput.trim()]); setSkillInput(''); } }}
                                    style={{ padding: '0.5rem 0.875rem', fontSize: '0.75rem' }}>add</button>
                            </div>
                            {skills.length === 0 && <p style={{ fontSize: '0.75rem', color: 'var(--text-4)', fontFamily: 'var(--font-mono)' }}>no skills added yet</p>}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: '0.5rem' }}>
                                {skills.map((skill, i) => (
                                    <span key={i} className="badge" style={{ cursor: 'pointer' }} onClick={() => setSkills(s => s.filter((_, j) => j !== i))}>
                                        {skill} ×
                                    </span>
                                ))}
                            </div>
                            <Link href="/verify" style={{ fontSize: '0.7rem', color: 'var(--blue)', fontFamily: 'var(--font-mono)', display: 'block', marginTop: '0.5rem' }}>
                                verify to increase skills limit to 50
                            </Link>
                        </div>

                        {/* Languages */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span>🌐</span>
                                    <label className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>languages</label>
                                </div>
                                <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-4)' }}>1/00</span>
                            </div>
                            <input className="inp" placeholder="search & add a language ..." style={{ width: '100%', marginBottom: '0.5rem' }} />
                            <div style={{ display: 'flex', gap: '0.375rem' }}>
                                <span className="badge">English ×</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
                            <label className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.875rem' }}>social links</label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
                                {[
                                    { icon: '𝕏', placeholder: 'twitter.com/username' },
                                    { icon: 'in', placeholder: 'linkedin.com/in/username' },
                                    { icon: '⌥', placeholder: 'github.com/username' },
                                    { icon: '●', placeholder: 'yoursite.com' },
                                    { icon: '📷', placeholder: 'instagram.com/username' },
                                    { icon: '▶', placeholder: 'youtube.com/@channel' },
                                ].map(({ icon, placeholder }) => (
                                    <div key={placeholder} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                        <span style={{ width: '1.5rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-4)', flexShrink: 0 }}>{icon}</span>
                                        <input className="inp" placeholder={placeholder} style={{ flex: 1, fontSize: '0.78rem' }} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hourly rate + timezone */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-4)', fontFamily: 'var(--font-mono)', marginBottom: '0.375rem' }}>hourly rate ($)</label>
                                    <input className="inp" type="number" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} style={{ width: '100%' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-4)', fontFamily: 'var(--font-mono)', marginBottom: '0.375rem' }}>timezone</label>
                                    <input className="inp" placeholder="UTC" style={{ width: '100%' }} />
                                </div>
                            </div>
                        </div>

                        {/* Save button */}
                        <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}>
                            save
                        </button>

                        {/* Account settings accordion */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '0.875rem 1.25rem' }}>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                ▶ account settings
                            </button>
                        </div>
                    </div>
                )}

                {/* Placeholder tabs */}
                {activeTab !== 'profile' && (
                    <div style={{ border: '1px dashed var(--border)', borderRadius: 'var(--radius)', padding: '5rem', textAlign: 'center', color: 'var(--text-4)', fontFamily: 'var(--font-mono)' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🚧</div>
                        {activeTab} — coming soon
                    </div>
                )}
            </div>
        </div>
    );
}
