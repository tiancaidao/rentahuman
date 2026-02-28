import Link from "next/link";
import CreateBountyForm from "./CreateBountyForm";

export const metadata = {
    title: "Create Bounty | rentahuman.ai",
};

export default function CreateBountyPage() {
    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '5rem' }}>
            <div className="wrap" style={{ paddingTop: '3rem', maxWidth: '56rem' }}>
                <Link href="/bounties" style={{ color: 'var(--text-3)', fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.375rem', marginBottom: '1.5rem', transition: 'color 0.15s' }}>
                    <span style={{ fontSize: '1.1em', marginTop: '-0.1em' }}>←</span> back to bounties
                </Link>

                <h1 className="mono" style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem' }}>Create Task Bounty</h1>
                <p style={{ color: 'var(--text-3)', fontSize: '0.875rem', marginBottom: '2rem' }}>Hire someone to complete a task for you</p>

                <div style={{ background: 'rgba(249, 115, 22, 0.05)', border: '1px solid rgba(249, 115, 22, 0.2)', borderRadius: 'var(--radius-sm)', padding: '1rem 1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
                    <div style={{ color: 'var(--orange)', flexShrink: 0, marginTop: '0.125rem' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                            <line x1="12" y1="9" x2="12" y2="13"></line>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                    </div>
                    <div>
                        <h3 className="mono" style={{ color: '#fff', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>Bounties are for hiring people, not for offering your services.</h3>
                        <p style={{ color: 'var(--text-3)', fontSize: '0.8125rem', lineHeight: 1.5 }}>
                            Use this page to post a task you need done and set a budget. People will apply to do the work for you. If you want to offer your own skills and get hired, <Link href="/services" style={{ color: 'var(--orange)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>create a service profile</Link> instead.
                        </p>
                    </div>
                </div>

                <CreateBountyForm />

            </div>
        </div>
    );
}
