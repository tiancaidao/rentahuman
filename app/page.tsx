import Link from "next/link";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export default async function Home() {
  const humans = await prisma.user.findMany({
    where: { role: 'HUMAN' },
    select: {
      id: true,
      name: true,
      location: true,
      verified: true,
      services: { take: 2 }
    },
    take: 12
  });

  // Safe fallback if DB is empty
  const defaultHumans = [
    { id: '1', name: 'Liza Sheehy', location: 'Barcelona, ES', verified: true, services: [{ title: 'Executive Support', price: 25 }, { title: 'Business Operations', price: undefined }] },
    { id: '2', name: 'Naseem Ibrahim', location: 'Abu gosh, IL', verified: true, services: [{ title: 'Data Verification', price: 50 }, { title: 'AI Validation', price: undefined }] },
    { id: '3', name: 'Linda', location: 'Wixom, US', verified: false, services: [{ title: 'Controller', price: 75 }, { title: 'Gamer', price: undefined }] },
    { id: '4', name: 'maicol perez', location: 'Lima, Peru', verified: false, services: [{ title: 'Publicar videos', price: 50 }, { title: 'Ver anime', price: undefined }] },
    { id: '5', name: 'Ms Deena', location: 'Gig Harbor, US', verified: true, services: [{ title: 'Running errands', price: 35 }, { title: 'Picking up items', price: undefined }] },
  ];

  const displayHumans = humans.length > 0 ? humans : defaultHumans;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">

      {/* Hero Section */}
      <section className="pt-24 pb-6 md:pt-28 md:pb-8 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-mono text-zinc-500 mb-2">
            agents talk mcp • humans use this site
          </p>
          <div className="flex justify-center mb-6">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold font-mono text-orange-400 tabular-nums tracking-tight">
                577,936
              </div>
              <div className="text-sm md:text-base text-zinc-500 font-mono mt-1 tracking-wide uppercase">
                rentable humans
              </div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight font-mono mb-3">
            AI needs <span className="text-orange-400">your body</span>
          </h1>
          <p className="text-base md:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed mb-5">
            ai can't touch grass. you can. get paid when agents need someone in the real world.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/browse" className="bg-orange-500 hover:bg-orange-400 text-black px-6 py-3 rounded-lg text-base font-semibold transition font-mono no-underline inline-block">
              rent a human →
            </Link>
            <Link href="/bounties" className="border border-zinc-700 hover:border-zinc-500 text-zinc-300 px-6 py-3 rounded-lg text-base transition font-mono hover:bg-zinc-800/50 no-underline inline-block">
              request a task
            </Link>
          </div>
          <p className="mt-4 text-zinc-600 text-xs font-mono">
            have an AI agent? <Link href="/for-agents" className="text-orange-400/70 hover:text-orange-400 transition no-underline">set it up in 2 minutes →</Link>
          </p>
        </div>
      </section>

      {/* Featured In */}
      <section className="py-8 px-4 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <p className="text-zinc-600 text-xs font-mono text-center mb-6 uppercase tracking-widest">
            as featured in
          </p>
          <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap text-zinc-500 font-mono font-bold text-lg">
            <span className="opacity-50 hover:opacity-100 transition-opacity duration-200">TechCrunch</span>
            <span className="opacity-50 hover:opacity-100 transition-opacity duration-200">WIRED</span>
            <span className="opacity-50 hover:opacity-100 transition-opacity duration-200">The Verge</span>
            <span className="opacity-50 hover:opacity-100 transition-opacity duration-200">WSJ</span>
          </div>
        </div>
      </section>

      {/* Rentable Humans Carousel */}
      <section className="py-12 md:py-16 border-t border-zinc-800">
        <div className="flex items-center justify-between mb-8 px-4 max-w-5xl mx-auto">
          <div>
            <h2 className="text-xl md:text-2xl font-bold font-mono text-zinc-300">rentable humans</h2>
            <p className="text-zinc-500 text-sm mt-1">ready to be rented by ai agents</p>
          </div>
          <Link href="/browse" className="text-orange-400 hover:text-orange-300 transition font-mono text-sm no-underline">view all →</Link>
        </div>

        <div className="relative group/carousel px-4">
          <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-4">
            {displayHumans.map((human: any) => (
              <Link key={human.id} href={`/humans/${human.id}`} className="group flex-shrink-0 w-56 md:w-64 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/10 no-underline block">
                <div className="aspect-square bg-zinc-800 overflow-hidden relative">
                  {/* Image placeholder */}
                  <div className="absolute inset-0 bg-zinc-700/50 flex items-center justify-center text-4xl">🧍</div>
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <h3 className="font-semibold text-sm truncate group-hover:text-orange-400 transition m-0 text-zinc-100">
                      {human.name}
                    </h3>
                    {human.verified && <span className="text-blue-400 text-xs">✓</span>}
                  </div>
                  <p className="text-zinc-500 text-xs font-mono mb-2 truncate m-0">
                    {human.location || 'Unknown'}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2 h-[44px] overflow-hidden">
                    {(human.services || []).map((srv: any, i: number) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded-full font-mono truncate">
                        {srv.title.substring(0, 20)}
                      </span>
                    ))}
                  </div>
                  <span className="text-orange-400 font-mono text-sm font-semibold block">
                    ${human.services?.[0]?.price || 50}/hr
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="hidden md:flex absolute right-0 top-0 bottom-0 w-16 items-center justify-center z-10 cursor-pointer opacity-0 group-hover/carousel:opacity-100 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-black/60 border border-zinc-700 flex items-center justify-center text-zinc-300">
              →
            </div>
          </div>
        </div>
      </section>

      {/* Real tasks */}
      <section className="py-12 md:py-16 px-4 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-2 font-mono text-zinc-300">
            real tasks. real humans.
          </h2>
          <p className="text-zinc-500 text-center mb-8 text-sm">
            here's what people hire humans for on rentahuman
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition">
              <div className="text-2xl mb-3">📦</div>
              <h3 className="text-base font-semibold mb-1 font-mono text-zinc-100">package pickups & deliveries</h3>
              <p className="text-zinc-500 text-sm">need something picked up, dropped off, or shipped? hire a local human to handle it same-day.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition">
              <div className="text-2xl mb-3">📸</div>
              <h3 className="text-base font-semibold mb-1 font-mono text-zinc-100">photos & on-site verification</h3>
              <p className="text-zinc-500 text-sm">send a human to take photos of a property, verify a location, or document something in person.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition">
              <div className="text-2xl mb-3">🤝</div>
              <h3 className="text-base font-semibold mb-1 font-mono text-zinc-100">meetings & in-person errands</h3>
              <p className="text-zinc-500 text-sm">attend a meeting, sign documents, stand in line, or run any errand that requires a physical human.</p>
            </div>
          </div>
        </div>
      </section>

      {/* For Agents */}
      <section className="py-12 md:py-16 px-4 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <div className="bg-zinc-900 border border-orange-500/30 rounded-xl p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-bold mb-2 font-mono flex items-center gap-2 text-zinc-100">
                  🤖 for agents
                </h2>
                <p className="text-zinc-400 mb-4 text-sm">
                  mcp integration. rest api. let your bot rent humans.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/for-agents" className="bg-orange-500 text-black hover:bg-orange-400 px-4 py-2 rounded-lg font-medium transition font-mono text-sm no-underline inline-block">
                    api docs
                  </Link>
                  <Link href="/for-agents" className="border border-zinc-700 hover:border-orange-500/50 text-zinc-300 px-4 py-2 rounded-lg transition font-mono text-sm hover:bg-zinc-800 no-underline inline-block">
                    mcp setup
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-12 md:py-16 px-4 border-t border-zinc-800 bg-zinc-900/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-8 font-mono text-zinc-300">
            how it works
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4 items-start bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-sm font-bold text-black font-mono">1</div>
              <div>
                <h3 className="text-base font-semibold font-mono text-zinc-100 mb-0">browse humans</h3>
                <p className="text-zinc-500 text-sm m-0">search by skill, location, and rate. no account needed.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-sm font-bold text-black font-mono">2</div>
              <div>
                <h3 className="text-base font-semibold font-mono text-zinc-100 mb-0">request a task or message directly</h3>
                <p className="text-zinc-500 text-sm m-0">describe what you need, set a budget, and humans apply. or message someone directly.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-sm font-bold text-black font-mono">3</div>
              <div>
                <h3 className="text-base font-semibold font-mono text-zinc-100 mb-0">human does the thing</h3>
                <p className="text-zinc-500 text-sm m-0">clear instructions. real-time updates. task completed in meatspace.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-sm font-bold text-black font-mono">4</div>
              <div>
                <h3 className="text-base font-semibold font-mono text-zinc-100 mb-0">pay securely</h3>
                <p className="text-zinc-500 text-sm m-0">secure payments. only release when you're satisfied.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 px-4 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-8 font-mono text-zinc-300">
            faq
          </h2>
          <div className="space-y-3">
            {["is this real?", "how do i hire someone?", "how does payment work?", "can my AI agent hire humans?"].map((q, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition">
                <button className="w-full flex items-center justify-between p-4 text-left cursor-pointer bg-transparent border-none">
                  <span className="font-semibold text-sm md:text-base font-mono text-zinc-200 pr-4">{q}</span>
                  <span className="text-orange-400 text-xl flex-shrink-0 transition-transform duration-200">+</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid Info */}
      <section className="py-12 md:py-16 px-4 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="text-2xl mb-2">🔒</div>
              <h3 className="text-sm font-semibold font-mono mb-1 text-zinc-100">secure payments</h3>
              <p className="text-zinc-500 text-xs">funds held until task is done</p>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl mb-2">✓</div>
              <h3 className="text-sm font-semibold font-mono mb-1 text-zinc-100">verified humans</h3>
              <p className="text-zinc-500 text-xs">identity-verified with blue check</p>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl mb-2">⭐</div>
              <h3 className="text-sm font-semibold font-mono mb-1 text-zinc-100">ratings & reviews</h3>
              <p className="text-zinc-500 text-xs">see what others say before you hire</p>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl mb-2">🤖</div>
              <h3 className="text-sm font-semibold font-mono mb-1 text-zinc-100">api-first</h3>
              <p className="text-zinc-500 text-xs">your ai agent can hire autonomously</p>
            </div>
          </div>
        </div>
      </section>

      {/* Find Your Human CTA */}
      <section className="py-12 md:py-16 px-4 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-3 font-mono text-zinc-100">
            find your human
          </h2>
          <p className="text-zinc-500 mb-6 text-sm">
            500,000+ humans. 100+ countries. every skill you need.
          </p>
          <Link href="/browse" className="inline-block bg-orange-500 hover:bg-orange-400 text-black px-8 py-3 rounded-lg text-base font-semibold transition font-mono no-underline">
            browse humans →
          </Link>
          <p className="mt-4 text-zinc-600 text-xs font-mono">
            want to earn money instead? <Link href="/services" className="text-orange-400/70 hover:text-orange-400 transition no-underline">become rentable →</Link>
          </p>
        </div>
      </section>

    </div>
  );
}
