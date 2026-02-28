'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginModal from './LoginModal';

export default function NavMenu() {
    const { user, loading, signOut } = useAuth();
    const [open, setOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Derive avatar initials from display name or email
    const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';
    const email = user?.email || '';
    const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

    // Close dropdown on outside click
    useEffect(() => {
        function handler(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        if (open) document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    function handleAvatarClick() {
        if (loading) return;
        if (user) {
            setOpen(o => !o);
        } else {
            setShowLogin(true);
        }
    }

    return (
        <>
            <div ref={ref} style={{ position: 'relative' }}>
                {/* Avatar button */}
                <button
                    onClick={handleAvatarClick}
                    style={{
                        width: '2rem', height: '2rem', borderRadius: '50%',
                        background: open ? 'var(--bg-hover)' : 'var(--bg-card)',
                        border: `1px solid ${open ? 'var(--border-md)' : 'var(--border)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: loading ? 'default' : 'pointer',
                        transition: 'all 0.15s', padding: 0, outline: 'none',
                    }}
                    aria-label={user ? 'Open profile menu' : 'Sign in'}
                >
                    {user ? (
                        /* Show photo or initials when logged in */
                        user.photoURL ? (
                            <img src={user.photoURL} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.625rem', color: 'var(--text-2)' }}>{initials}</span>
                        )
                    ) : (
                        /* Person icon when logged out */
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    )}
                </button>

                {/* Dashboard dropdown — only shown when logged in */}
                {open && user && (
                    <div style={{
                        position: 'absolute', top: 'calc(100% + 0.625rem)', right: 0,
                        width: '14.5rem',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-md)',
                        borderRadius: 'var(--radius)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
                        overflow: 'hidden',
                        zIndex: 200,
                        animation: 'fadeIn 0.12s ease-out',
                    }}>
                        {/* User info row */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', borderBottom: '1px solid var(--border)' }}>
                            <div style={{
                                width: '2.25rem', height: '2.25rem', borderRadius: '50%',
                                background: 'var(--bg-hover)', border: '1px solid var(--border-md)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.7rem',
                                color: 'var(--text-3)', flexShrink: 0, overflow: 'hidden',
                            }}>
                                {user.photoURL
                                    ? <img src={user.photoURL} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    : initials
                                }
                            </div>
                            <div style={{ minWidth: 0 }}>
                                <div className="mono" style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {displayName}
                                </div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-4)', fontFamily: 'var(--font-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {email}
                                </div>
                            </div>
                        </div>

                        {/* Menu items */}
                        <div style={{ padding: '0.625rem' }}>
                            {/* Dashboard */}
                            <Link href="/dashboard" onClick={() => setOpen(false)}
                                style={{
                                    display: 'block', width: '100%', textAlign: 'center',
                                    background: 'var(--orange)', color: '#000',
                                    fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.8rem',
                                    padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)',
                                    textDecoration: 'none', marginBottom: '0.25rem',
                                    transition: 'background 0.15s',
                                }}
                            >
                                dashboard
                            </Link>

                            {/* View profile */}
                            <Link href="/browse" onClick={() => setOpen(false)}
                                style={{
                                    display: 'block', padding: '0.5rem 0.625rem',
                                    fontFamily: 'var(--font-mono)', fontSize: '0.825rem',
                                    color: 'var(--text-2)', textDecoration: 'none',
                                    borderRadius: 'var(--radius-xs)',
                                    transition: 'background 0.12s, color 0.12s',
                                }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-hover)'; (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--text-2)'; }}
                            >
                                view profile
                            </Link>

                            <div style={{ borderTop: '1px solid var(--border)', margin: '0.375rem 0' }} />

                            {/* Sign out */}
                            <button
                                onClick={async () => { setOpen(false); await signOut(); }}
                                style={{
                                    display: 'block', width: '100%', textAlign: 'left',
                                    padding: '0.5rem 0.625rem',
                                    fontFamily: 'var(--font-mono)', fontSize: '0.825rem',
                                    color: 'var(--text-3)', background: 'none', border: 'none', cursor: 'pointer',
                                    borderRadius: 'var(--radius-xs)', transition: 'background 0.12s, color 0.12s',
                                }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-hover)'; (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'; }}
                            >
                                sign out
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Login modal — rendered outside the dropdown div, at root level */}
            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
        </>
    );
}
