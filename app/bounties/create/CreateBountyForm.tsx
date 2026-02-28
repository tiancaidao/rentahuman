"use client";

import { useAuth } from '@/app/contexts/AuthContext';
import { createBountyAction } from './actions';
import { useState } from 'react';

const CATEGORIES = [
    { id: 'Hiring', icon: '🤝', title: 'Hiring', desc: 'Talent search & recruiting' },
    { id: 'Research & Fieldwork', icon: '📍', title: 'Research & Fieldwork', desc: 'Real-world research & verification' },
    { id: 'Companionship', icon: '💜', title: 'Companionship', desc: 'Dates, hangouts & social company' },
    { id: 'Delivery & Errands', icon: '📦', title: 'Delivery & Errands', desc: 'Pickups, drop-offs & deliveries' },
    { id: 'Creative & Media', icon: '🎨', title: 'Creative & Media', desc: 'Video, photo, design & 3D' },
    { id: 'Tech & Dev', icon: '💻', title: 'Tech & Dev', desc: 'Web dev, data & automation' },
    { id: 'Writing & Content', icon: '✍️', title: 'Writing & Content', desc: 'Scripts, articles & copywriting' },
    { id: 'Events & Social', icon: '🎉', title: 'Events & Social', desc: 'Events, meetups & social tasks' },
    { id: 'Marketing Campaigns', icon: '📣', title: 'Marketing Campaigns', desc: 'Campaigns, promos & outreach' },
    { id: 'Home & Personal', icon: '🏠', title: 'Home & Personal', desc: 'Home services, pet care & more' },
    { id: 'Other', icon: '📋', title: 'Other', desc: 'Everything else' }
];

export default function CreateBountyForm() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [titleLen, setTitleLen] = useState(0);
    const [descLen, setDescLen] = useState(0);

    // Selected state for styling manually implemented radio buttons
    const [selCategory, setSelCategory] = useState('Hiring');

    async function handleSubmit(formData: FormData) {
        if (!user) {
            alert('You must be logged in to post a bounty.');
            return;
        }

        setLoading(true);
        formData.append('posterId', user.uid);
        formData.append('category', selCategory);

        try {
            await createBountyAction(formData);
        } catch (error) {
            console.error(error);
            alert('Failed to post bounty. Please try again.');
            setLoading(false);
        }
    }

    const LABEL_S = { display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#fff', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' };
    const ASTERISK = <span style={{ color: 'var(--red)' }}>*</span>;
    const CARD_S = { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '1.5rem', marginBottom: '1.5rem' };
    const INPUT_S = { width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border)', borderRadius: '0.375rem', padding: '0.75rem', color: '#fff', fontSize: '0.875rem' };

    return (
        <form action={handleSubmit}>
            {/* SECTION 1: What do you need done? */}
            <div style={CARD_S}>
                <h2 className="mono" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '1.5rem' }}>What do you need done?</h2>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={LABEL_S}>Title {ASTERISK}</label>
                    <input
                        name="title"
                        required
                        maxLength={200}
                        placeholder="e.g. Need someone to deliver a package across town"
                        onChange={(e) => setTitleLen(e.target.value.length)}
                        style={INPUT_S}
                    />
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-4)', marginTop: '0.375rem', textAlign: 'left' }}>{titleLen}/200 characters</div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={LABEL_S}>Description {ASTERISK}</label>
                    <textarea
                        name="description"
                        required
                        maxLength={5000}
                        rows={6}
                        placeholder="Describe the task you need completed. What should the person do? Where? When? Any special instructions?"
                        onChange={(e) => setDescLen(e.target.value.length)}
                        style={{ ...INPUT_S, resize: 'vertical' }}
                    />
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-4)', marginTop: '0.375rem', textAlign: 'left' }}>{descLen}/5000 characters</div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={LABEL_S}>Requirements <span style={{ color: 'var(--text-4)', fontWeight: 400 }}>(one per line)</span></label>
                    <textarea
                        name="requirements"
                        rows={3}
                        placeholder="Must be available on weekdays&#10;Must have own transportation&#10;Must be punctual"
                        style={{ ...INPUT_S, resize: 'vertical' }}
                    />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={LABEL_S}>Skills Needed <span style={{ color: 'var(--text-4)', fontWeight: 400 }}>(comma-separated)</span></label>
                    <input
                        name="skillsNeeded"
                        placeholder="photography, video editing, social media"
                        style={INPUT_S}
                    />
                </div>

                <div>
                    <label style={LABEL_S}>Category {ASTERISK}</label>
                    <div className="grid-4" style={{ gap: '0.75rem' }}>
                        {CATEGORIES.map(cat => {
                            const isSel = selCategory === cat.title;
                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setSelCategory(cat.title)}
                                    style={{
                                        background: isSel ? 'rgba(249, 115, 22, 0.1)' : 'var(--bg)',
                                        border: isSel ? '1px solid var(--orange)' : '1px solid var(--border)',
                                        borderRadius: 'var(--radius-sm)',
                                        padding: '1rem 0.5rem',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease'
                                    }}
                                >
                                    <div style={{ fontSize: '1.25rem', marginBottom: '0.375rem' }}>{cat.icon}</div>
                                    <div className="mono" style={{ fontSize: '0.75rem', fontWeight: 600, color: isSel ? '#fff' : 'var(--text-2)', marginBottom: '0.25rem' }}>{cat.title}</div>
                                    <div style={{ fontSize: '0.65rem', color: 'var(--text-4)', lineHeight: 1.3 }}>{cat.desc}</div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* SECTION 2: Photos */}
            <div style={CARD_S}>
                <h2 className="mono" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Photos</h2>
                <p style={{ color: 'var(--text-3)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>Add photos to help describe your task (optional, max 5)</p>
                <button type="button" style={{
                    width: '100%',
                    border: '1px dashed var(--border-md)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '2rem',
                    background: 'var(--bg)',
                    color: 'var(--text-3)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.875rem'
                }}>
                    + Add photos
                </button>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-4)', marginTop: '0.5rem' }}>JPG or PNG, max 5MB each</div>
            </div>

            {/* SECTION 3: Location */}
            <div style={CARD_S}>
                <h2 className="mono" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '1.5rem' }}>Location</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={LABEL_S}>City</label>
                        <input name="city" placeholder="New York" style={INPUT_S} />
                    </div>
                    <div>
                        <label style={LABEL_S}>State</label>
                        <input name="state" placeholder="NY" style={INPUT_S} />
                    </div>
                    <div>
                        <label style={LABEL_S}>Country</label>
                        <input name="country" placeholder="USA" style={INPUT_S} />
                    </div>
                </div>
                {/* We'll combine city/state/country into 'location' manually on submit, or just keep a hidden input */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="checkbox" name="remoteOk" id="remoteOk" style={{ width: '1.125rem', height: '1.125rem', cursor: 'pointer', accentColor: 'var(--blue)' }} />
                    <label htmlFor="remoteOk" className="mono" style={{ fontSize: '0.875rem', color: '#fff', cursor: 'pointer' }}>Remote work allowed</label>
                </div>
            </div>

            {/* SECTION 4: How much will you pay? */}
            <div style={CARD_S}>
                <h2 className="mono" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '1.5rem' }}>How much will you pay?</h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={LABEL_S}>Price {ASTERISK}</label>
                        <input type="number" name="price" required placeholder="50" style={INPUT_S} min="1" step="0.01" />
                    </div>
                    <div>
                        <label style={LABEL_S}>Price Type {ASTERISK}</label>
                        <select name="priceType" style={INPUT_S} defaultValue="Fixed Price">
                            <option value="FIXED">Fixed Price</option>
                            <option value="HOURLY">Hourly Rate</option>
                        </select>
                    </div>
                    <div>
                        <label style={LABEL_S}>Currency {ASTERISK}</label>
                        <select name="currency" style={INPUT_S} defaultValue="USD">
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                        </select>
                    </div>
                    <div>
                        <label style={LABEL_S}>Estimated Hours {ASTERISK}</label>
                        <input type="number" name="estimatedHours" placeholder="2" style={INPUT_S} min="1" />
                    </div>
                    <div>
                        <label style={LABEL_S}>Spots Available</label>
                        <input type="number" name="spots" defaultValue="1" style={INPUT_S} min="1" />
                    </div>
                    <div>
                        <label style={LABEL_S}>Deadline (optional)</label>
                        <input type="date" name="deadline" style={INPUT_S} />
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginTop: '1rem' }}>
                    <input type="checkbox" name="verifiedOnly" id="verifiedOnly" style={{ width: '1.125rem', height: '1.125rem', cursor: 'pointer', accentColor: 'var(--blue)', marginTop: '0.125rem' }} />
                    <div>
                        <label htmlFor="verifiedOnly" className="mono" style={{ fontSize: '0.875rem', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            Verified applicants only
                            <span style={{ fontSize: '0.65rem', background: 'rgba(56, 189, 248, 0.15)', color: 'var(--blue)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem', letterSpacing: '0.05em' }}>verified</span>
                        </label>
                        <p style={{ color: 'var(--text-4)', fontSize: '0.75rem', marginTop: '0.25rem' }}>Only users with a verified account can apply to this bounty</p>
                    </div>
                </div>
            </div>

            {/* ACTION BUTTONS */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', alignItems: 'center' }}>
                <a href="/bounties" style={{ color: 'var(--text-3)', fontSize: '0.875rem', textDecoration: 'none', padding: '0.75rem 1rem' }}>Cancel</a>
                <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', minWidth: '10rem', justifyContent: 'center' }}>
                    {loading ? 'Submitting...' : 'Create Bounty'}
                </button>
            </div>
        </form>
    );
}
