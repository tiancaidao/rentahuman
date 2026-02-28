'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '@/app/contexts/AuthContext';

interface LoginModalProps {
    onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
    const { signInWithGoogle, signInWithEmail } = useAuth();
    const [mode, setMode] = useState<'choose' | 'email'>('choose');
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleGoogle() {
        setError('');
        setLoading(true);
        try {
            await signInWithGoogle();
            onClose();
        } catch (e: any) {
            setError(e.message || 'Google sign-in failed');
        } finally {
            setLoading(false);
        }
    }

    async function handleEmail(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signInWithEmail(email, password, isSignUp);
            onClose();
        } catch (e: any) {
            setError(e.message?.replace('Firebase: ', '').replace(/ \(auth\/.*\)\.?/, '') || 'Sign-in failed');
        } finally {
            setLoading(false);
        }
    }

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return createPortal(
        /* Backdrop */
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0, zIndex: 500,
                background: 'rgba(0,0,0,0.85)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '1rem',
                backdropFilter: 'blur(2px)',
            }}
        >
            {/* Modal panel — stop propagation so clicking inside doesn't close */}
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    width: '100%', maxWidth: '22rem',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-md)',
                    borderRadius: 'var(--radius)',
                    overflow: 'hidden',
                    boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
                    animation: 'fadeIn 0.15s ease-out',
                }}
            >
                {/* Heading */}
                <div style={{ textAlign: 'center', padding: '2rem 1.5rem 1.25rem' }}>
                    <h2 className="mono" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.375rem' }}>
                        {isSignUp ? 'create account' : 'welcome back'}
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-4)', fontFamily: 'var(--font-mono)' }}>
                        {isSignUp ? 'sign up for an account' : 'sign in to your account'}
                    </p>
                </div>

                {/* Buttons */}
                <div style={{ padding: '0 1.5rem 1.5rem' }}>

                    {mode === 'choose' && (
                        <>
                            {/* Continue with Google */}
                            <button
                                onClick={handleGoogle}
                                disabled={loading}
                                style={{
                                    width: '100%', padding: '0.75rem 1rem',
                                    background: '#fff', color: '#111',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: 'var(--radius-sm)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                                    fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 600,
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    opacity: loading ? 0.6 : 1,
                                    transition: 'opacity 0.15s',
                                    marginBottom: '0.875rem',
                                }}
                            >
                                {/* Google G logo SVG */}
                                <svg width="18" height="18" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                continue with google
                            </button>

                            {/* Divider */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
                                <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-4)' }}>or</span>
                                <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                            </div>

                            {/* Continue with email */}
                            <button
                                onClick={() => setMode('email')}
                                style={{
                                    width: '100%', padding: '0.75rem 1rem',
                                    background: 'var(--bg)', color: 'var(--text-2)',
                                    border: '1px solid var(--border-md)',
                                    borderRadius: 'var(--radius-sm)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                                    fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 500,
                                    cursor: 'pointer',
                                    transition: 'border-color 0.15s',
                                    marginBottom: '1rem',
                                }}
                            >
                                {/* Envelope icon */}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                                continue with email
                            </button>
                        </>
                    )}

                    {mode === 'email' && (
                        <form onSubmit={handleEmail} style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                            <input
                                type="email" required autoFocus
                                placeholder="email"
                                value={email} onChange={e => setEmail(e.target.value)}
                                className="inp"
                                style={{ width: '100%', fontSize: '0.875rem' }}
                            />
                            <input
                                type="password" required
                                placeholder="password"
                                value={password} onChange={e => setPassword(e.target.value)}
                                className="inp"
                                style={{ width: '100%', fontSize: '0.875rem', marginBottom: '0.375rem' }}
                            />
                            {error && (
                                <p style={{ fontSize: '0.75rem', color: '#f87171', fontFamily: 'var(--font-mono)', marginBottom: '0.25rem' }}>
                                    {error}
                                </p>
                            )}
                            <button
                                type="submit" disabled={loading}
                                className="btn btn-primary"
                                style={{ width: '100%', padding: '0.75rem', fontSize: '0.875rem', opacity: loading ? 0.6 : 1 }}
                            >
                                {loading ? 'signing in…' : isSignUp ? 'create account' : 'sign in'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setMode('choose')}
                                style={{ background: 'none', border: 'none', color: 'var(--text-4)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', cursor: 'pointer', textAlign: 'center', marginTop: '0.25rem' }}
                            >
                                ← back
                            </button>
                        </form>
                    )}

                    {/* Footer */}
                    {mode === 'choose' && (
                        <div style={{ display: 'flex', justifyContent: 'center', borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '0' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-4)', fontFamily: 'var(--font-mono)' }}>
                                {isSignUp ? 'have an account? ' : 'no account? '}
                                <button
                                    onClick={() => setIsSignUp(v => !v)}
                                    style={{ background: 'none', border: 'none', color: 'var(--orange)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                                >
                                    {isSignUp ? 'sign in' : 'join'}
                                </button>
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}
