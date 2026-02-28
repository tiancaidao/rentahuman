import Link from "next/link";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export default async function Home() {
  const humans = await prisma.user.findMany({
    where: { role: "HUMAN" },
    select: { id: true, name: true, location: true, verified: true, hourlyRate: true, remoteOk: true, services: { take: 2, select: { title: true } } },
    take: 10,
  });

  const S = {
    /* Section spacing */
    sec: { padding: "3rem 1.25rem" } as React.CSSProperties,
    secBorder: { padding: "3rem 1.25rem", borderTop: "1px solid var(--border)" } as React.CSSProperties,
    center: { maxWidth: "42rem", margin: "0 auto" } as React.CSSProperties,
    wide: { maxWidth: "64rem", margin: "0 auto" } as React.CSSProperties,
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* ── Hero ────────────────────────────────── */}
      <section style={{ ...S.sec, textAlign: "center", paddingTop: "3.5rem" }}>
        <div style={S.center}>
          <p className="mono" style={{ fontSize: "0.7rem", color: "var(--text-4)", marginBottom: "1.25rem", letterSpacing: "0.03em" }}>
            agents talk mcp • humans use this site
          </p>
          <div style={{ marginBottom: "1.25rem" }}>
            <div className="mono" style={{ fontSize: "3.75rem", fontWeight: 700, color: "var(--orange)", lineHeight: 1, letterSpacing: "-0.02em" }}>
              578,028
            </div>
            <div className="mono" style={{ fontSize: "0.75rem", color: "var(--text-3)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "0.375rem" }}>
              rentable humans
            </div>
          </div>
          <h1 className="mono" style={{ fontSize: "2.75rem", fontWeight: 700, lineHeight: 1.15, marginBottom: "0.75rem" }}>
            AI needs <span style={{ color: "var(--orange)" }}>your body</span>
          </h1>
          <p style={{ fontSize: "1rem", color: "var(--text-2)", maxWidth: "30rem", margin: "0 auto 1.75rem", lineHeight: 1.65 }}>
            ai can't touch grass. you can. get paid when agents need someone in the real world.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center", marginBottom: "1.25rem" }}>
            <Link href="/browse" className="btn btn-primary" style={{ padding: "0.75rem 1.75rem", fontSize: "0.9375rem" }}>
              rent a human →
            </Link>
            <Link href="/bounties" className="btn btn-outline" style={{ padding: "0.75rem 1.5rem", fontSize: "0.9375rem" }}>
              request a task
            </Link>
          </div>
          <p className="mono" style={{ fontSize: "0.75rem", color: "var(--text-4)" }}>
            have an AI agent?{" "}
            <Link href="/for-agents" style={{ color: "rgba(249,115,22,0.7)", textDecoration: "none", transition: "color 0.15s" }}>
              set it up in 2 minutes →
            </Link>
          </p>
        </div>
      </section>

      {/* ── Featured In ─────────────────────────── */}
      <section style={{ ...S.secBorder, paddingTop: "1.5rem", paddingBottom: "1.5rem" }}>
        <div style={S.wide}>
          <p className="mono" style={{ fontSize: "0.65rem", color: "var(--text-4)", textAlign: "center", marginBottom: "1.25rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            as featured in
          </p>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2.5rem", flexWrap: "wrap" }}>
            {["WIRED", "Forbes", "Nature", "mashable", "FUTURISM"].map(b => (
              <span key={b} className="mono" style={{ color: "var(--text-3)", fontWeight: 700, fontSize: "1rem", opacity: 0.6 }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Rentable Humans carousel ─────────────── */}
      <section style={{ ...S.secBorder }}>
        <div style={{ ...S.wide, marginBottom: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <h2 className="mono" style={{ fontSize: "1.125rem", fontWeight: 700 }}>rentable humans</h2>
            <p style={{ color: "var(--text-3)", fontSize: "0.8rem", marginTop: "0.125rem" }}>ready to be rented by ai agents</p>
          </div>
          <Link href="/browse" style={{ color: "var(--orange)", fontFamily: "var(--font-mono)", fontSize: "0.8rem", textDecoration: "none" }}>view all →</Link>
        </div>
        <div style={{ overflowX: "auto", paddingBottom: "0.75rem" }}>
          <div style={{ display: "flex", gap: "1rem", padding: "0 1.25rem", maxWidth: "100%" }}>
            {humans.map((h: any) => {
              const init = (h.name || "?").charAt(0).toUpperCase();
              return (
                <Link key={h.id} href={`/humans/${h.id}`}
                  style={{ flexShrink: 0, width: "11rem", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "0.75rem", overflow: "hidden", textDecoration: "none", display: "block", transition: "border-color 0.2s" }}>
                  {/* Avatar area */}
                  <div style={{ height: "9rem", background: "var(--bg-hover)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "4rem", height: "4rem", borderRadius: "50%", background: "#27272a", border: "1px solid var(--border-md)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "1.5rem", color: "var(--text-3)" }}>
                      {init}
                    </div>
                  </div>
                  <div style={{ padding: "0.625rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginBottom: "0.25rem" }}>
                      <span className="mono" style={{ fontWeight: 600, fontSize: "0.8125rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--text)" }}>{h.name}</span>
                      {h.verified && <span style={{ color: "var(--blue)", fontSize: "0.6rem", flexShrink: 0 }}>●</span>}
                    </div>
                    <p className="mono" style={{ color: "var(--text-4)", fontSize: "0.7rem", marginBottom: "0.5rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {h.location || "Unknown"}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem", minHeight: "2.25rem", overflow: "hidden", marginBottom: "0.5rem" }}>
                      {(h.services || []).map((s: any, i: number) => (
                        <span key={i} className="tag" style={{ fontSize: "0.62rem" }}>{s.title.slice(0, 16)}</span>
                      ))}
                    </div>
                    <span className="mono" style={{ color: "var(--orange)", fontWeight: 700, fontSize: "0.875rem" }}>
                      ${h.hourlyRate || 50}/hr
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Real tasks ───────────────────────────── */}
      <section style={{ ...S.secBorder }}>
        <div style={S.wide}>
          <h2 className="mono" style={{ textAlign: "center", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>real tasks. real humans.</h2>
          <p style={{ textAlign: "center", color: "var(--text-3)", fontSize: "0.875rem", marginBottom: "2rem" }}>here's what people hire humans for on rentahuman</p>
          <div className="grid-3" style={{ gap: "0.875rem" }}>
            {[
              { e: "📦", t: "package pickups & deliveries", d: "need something picked up, dropped off, or shipped? hire a local human to handle it same-day." },
              { e: "📸", t: "photos & on-site verification", d: "send a human to take photos of a property, verify a location, or document something in person." },
              { e: "🤝", t: "meetings & in-person errands", d: "attend a meeting, sign documents, stand in line, or run any errand that requires a physical human." },
            ].map(c => (
              <div key={c.t} className="card" style={{ padding: "1.125rem" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>{c.e}</div>
                <h3 className="mono" style={{ fontSize: "0.875rem", fontWeight: 700, marginBottom: "0.5rem" }}>{c.t}</h3>
                <p style={{ color: "var(--text-3)", fontSize: "0.8rem", lineHeight: 1.6 }}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── For Agents CTA ───────────────────────── */}
      <section style={{ ...S.secBorder }}>
        <div style={S.center}>
          <div style={{ background: "var(--bg-card)", border: "1px solid rgba(249,115,22,0.25)", borderRadius: "0.875rem", padding: "1.5rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ flex: 1, minWidth: "14rem" }}>
                <h2 className="mono" style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem" }}>🤖 for agents</h2>
                <p style={{ color: "var(--text-2)", fontSize: "0.875rem", marginBottom: "1rem" }}>mcp integration. rest api. let your bot rent humans.</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  <Link href="/for-agents" className="btn btn-primary" style={{ padding: "0.5rem 1.125rem", fontSize: "0.8125rem" }}>api docs</Link>
                  <Link href="/mcp" className="btn btn-outline" style={{ padding: "0.5rem 1.125rem", fontSize: "0.8125rem" }}>mcp setup</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────── */}
      <section style={{ ...S.secBorder, background: "rgba(24,24,27,0.4)" }}>
        <div style={S.center}>
          <h2 className="mono" style={{ textAlign: "center", fontSize: "1.25rem", fontWeight: 700, marginBottom: "2rem" }}>how it works</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { n: 1, t: "browse humans", d: "search by skill, location, and rate. no account needed.", color: "var(--orange)" },
              { n: 2, t: "request a task or message directly", d: "describe what you need, set a budget, and humans apply. or message someone directly.", color: "var(--orange)" },
              { n: 3, t: "human does the thing", d: "clear instructions. real-time updates. task completed in meatspace.", color: "var(--orange)" },
              { n: 4, t: "pay securely", d: "secure payments. only release when you're satisfied.", color: "var(--green)" },
            ].map(s => (
              <div key={s.n} className="card" style={{ padding: "0.875rem 1rem", display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                <div style={{ width: "2rem", height: "2rem", background: s.color, borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.875rem", color: "#000", flexShrink: 0 }}>
                  {s.n}
                </div>
                <div>
                  <h3 className="mono" style={{ fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.25rem" }}>{s.t}</h3>
                  <p style={{ color: "var(--text-3)", fontSize: "0.8rem" }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────── */}
      <section style={S.secBorder}>
        <div style={S.center}>
          <h2 className="mono" style={{ textAlign: "center", fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem" }}>faq</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {["is this real?", "how do i hire someone?", "how does payment work?", "can my AI agent hire humans?"].map(q => (
              <div key={q} className="card" style={{ padding: 0, overflow: "hidden" }}>
                <button style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.125rem", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
                  <span className="mono" style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text)" }}>{q}</span>
                  <span style={{ color: "var(--orange)", fontSize: "1.125rem", flexShrink: 0 }}>+</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust features ───────────────────────── */}
      <section style={S.secBorder}>
        <div style={S.wide}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem" }}>
            {[
              { e: "🔒", t: "secure payments", d: "funds held until task is done" },
              { e: "✓", t: "verified humans", d: "identity-verified with blue check" },
              { e: "⭐", t: "ratings & reviews", d: "see what others say before you hire" },
              { e: "🤖", t: "api-first", d: "your ai agent can hire autonomously" },
            ].map(f => (
              <div key={f.t} style={{ textAlign: "center", padding: "1rem" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{f.e}</div>
                <h3 className="mono" style={{ fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.25rem" }}>{f.t}</h3>
                <p style={{ color: "var(--text-3)", fontSize: "0.75rem" }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────── */}
      <section style={{ ...S.secBorder, textAlign: "center" }}>
        <div style={S.center}>
          <h2 className="mono" style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>find your human</h2>
          <p style={{ color: "var(--text-3)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
            500,000+ humans. 100+ countries. every skill you need.
          </p>
          <Link href="/browse" className="btn btn-primary" style={{ padding: "0.875rem 2.5rem", fontSize: "1rem" }}>
            browse humans →
          </Link>
          <p className="mono" style={{ marginTop: "1rem", fontSize: "0.75rem", color: "var(--text-4)" }}>
            want to earn money instead?{" "}
            <Link href="/services" style={{ color: "rgba(249,115,22,0.7)", textDecoration: "none" }}>become rentable →</Link>
          </p>
        </div>
      </section>

    </div>
  );
}
