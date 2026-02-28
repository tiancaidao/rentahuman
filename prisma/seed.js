const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database with real data crawled from rentahuman.ai...')

    await prisma.task.deleteMany()
    await prisma.service.deleteMany()
    await prisma.bounty.deleteMany()
    await prisma.user.deleteMany()

    // ─── HUMANS ────────────────────────────────────────────────────────────────
    const humans = [
        {
            name: 'Pedro Oliveira',
            email: 'pedro@rentahuman.local',
            location: 'Lisbon, PT',
            hourlyRate: 100,
            verified: true,
            bio: "Doctor (Psychiatrist) with expertise in mental health. I help AI agents navigate complex human behavioral scenarios, emotional intelligence tasks, and medical research validation.",
            services: [
                { title: 'Mental Health Consultation', description: 'Expert psychiatric assessment and mental health guidance for complex human interaction scenarios.', category: 'Research', price: 100 },
                { title: 'Medical Research Validation', description: 'Validate AI-generated medical content with a licensed psychiatrist.', category: 'Research', price: 120 },
            ]
        },
        {
            name: 'matchory',
            email: 'matchory@rentahuman.local',
            location: 'Cincinnati, Ohio, US',
            hourlyRate: 175,
            verified: true,
            bio: "Key account manager for a top global robotics company. Expert in enterprise sales, negotiations, and business development. Available for AI-assisted sales strategy and client outreach.",
            services: [
                { title: 'Enterprise Sales Strategy', description: 'AI-assisted sales strategy sessions with a top-tier global account manager.', category: 'Hiring', price: 175 },
                { title: 'B2B Negotiation Support', description: 'Real-time negotiation coaching and support for high-stakes deals.', category: 'Hiring', price: 175 },
            ]
        },
        {
            name: 'Donato Russo',
            email: 'donato@rentahuman.local',
            location: 'Copenhagen, DK',
            hourlyRate: 100,
            verified: true,
            bio: "Web3 and AI strategist helping founders design, validate, and ship complex systems. Former startup founder, now advising on AI product architecture and go-to-market strategy.",
            services: [
                { title: 'AI Product Architecture', description: 'End-to-end AI system design and architecture review for startups and enterprises.', category: 'Tech', price: 100 },
                { title: 'Web3 Strategy Consulting', description: 'Navigate the intersection of Web3 and AI with an experienced strategist.', category: 'Tech', price: 100 },
            ]
        },
        {
            name: 'Patricia Tani',
            email: 'patricia@rentahuman.local',
            location: 'San Francisco, US',
            hourlyRate: 200,
            verified: true,
            bio: "LinkedIn ghostwriter with 10+ years of experience. Guaranteed engagement, guaranteed results. I write content that gets 100k+ impressions for founders and executives.",
            services: [
                { title: 'LinkedIn Ghostwriting — 100k Impressions Guaranteed', description: 'I will ghostwrite a banger LinkedIn post that is guaranteed to reach 100k+ impressions.', category: 'Writing', price: 1000, pricingType: 'FIXED' },
                { title: 'Executive Personal Brand Strategy', description: 'Full personal brand audit and content strategy for C-suite executives.', category: 'Writing', price: 500, pricingType: 'FIXED' },
            ]
        },
        {
            name: 'Alexander Liteplo',
            email: 'alexander@rentahuman.local',
            location: 'New York, US',
            hourlyRate: 150,
            verified: true,
            bio: "Twitter/X ghostwriter for tech founders. I turn your ideas into viral threads. $2.5M raised by clients I've helped grow their audience.",
            services: [
                { title: 'Twitter / X Ghostwriting', description: 'Viral thread writing for tech founders and investors. Results-based pricing available.', category: 'Writing', price: 2500, pricingType: 'FIXED' },
                { title: 'Audience Growth Strategy', description: 'Full-funnel social media growth plan tailored for tech and startup founders.', category: 'Writing', price: 500, pricingType: 'FIXED' },
            ]
        },
        {
            name: 'Daniel Thompson',
            email: 'daniel.t@rentahuman.local',
            location: 'London, UK',
            hourlyRate: 150,
            verified: true,
            bio: "AI legal product architect. I design, build, and validate AI systems for legal operations. Former BigLaw attorney turned AI engineer.",
            services: [
                { title: 'AI Legal Product Architecture & Deployment', description: 'Design and validate AI systems for legal operations with a former BigLaw attorney.', category: 'Tech', price: 150 },
                { title: 'Legal AI Compliance Review', description: 'Review AI outputs for legal compliance, regulatory adherence, and risk assessment.', category: 'Research', price: 200 },
            ]
        },
        {
            name: 'Tetsu Y',
            email: 'tetsu@rentahuman.local',
            location: 'Osaka, JP',
            hourlyRate: 85,
            verified: true,
            bio: "Osaka-based field agent available for on-site visits across the Kansai region. Fluent in Japanese and English. Available for physical verification, local research, and errands.",
            services: [
                { title: 'Osaka Site Visits & Physical Verification', description: 'On-site visits and physical verification across Osaka and the Kansai region.', category: 'Research', price: 85, pricingType: 'FIXED' },
                { title: 'Japan Local Research & Fieldwork', description: 'Local Japanese market research, mystery shopping, and on-ground verification.', category: 'Delivery', price: 60 },
            ]
        },
        {
            name: 'Hiroyuki Yokoyama',
            email: 'hiroyuki@rentahuman.local',
            location: 'Sendai, Miyagi, JP',
            hourlyRate: 50,
            verified: true,
            bio: "Reliable human operator in Miyagi Prefecture. Fluent Japanese & English. Available for translation, on-site tasks, and AI validation work.",
            services: [
                { title: 'Japanese Translation & Interpretation', description: 'Professional Japanese-English translation for documents, meetings, and AI outputs.', category: 'Research', price: 50 },
                { title: 'AI Output Evaluation (Japanese)', description: 'Evaluate and validate AI-generated Japanese content for accuracy and cultural appropriateness.', category: 'Research', price: 40 },
            ]
        },
        {
            name: 'Carol Muttinda',
            email: 'carol@rentahuman.local',
            location: 'Kwale, KE',
            hourlyRate: 15,
            verified: false,
            bio: "Content creator and writer based in Kenya. Specializing in African market research, social media content, and data collection tasks.",
            services: [
                { title: 'African Market Research', description: 'Ground-level market research and consumer insights from Kenya and East Africa.', category: 'Research', price: 15 },
                { title: 'Social Media Content Creation', description: 'Authentic social media content creation for African and global audiences.', category: 'Creative', price: 20 },
            ]
        },
        {
            name: 'Amit Sharma',
            email: 'amit@rentahuman.local',
            location: 'Bangalore, IN',
            hourlyRate: 50,
            verified: false,
            bio: "Senior developer specializing in AI agent task execution. Available for code review, debugging, and technical implementation of AI workflows.",
            services: [
                { title: 'AI Agent Workflow Implementation', description: 'Build and debug AI agent workflows with a senior full-stack developer.', category: 'Tech', price: 50 },
                { title: 'Code Review & Quality Assurance', description: 'Thorough code review with feedback and bug fixing for any tech stack.', category: 'Tech', price: 60 },
            ]
        },
        {
            name: 'Ms Deena',
            email: 'deena@rentahuman.local',
            location: 'Gig Harbor, US',
            hourlyRate: 35,
            verified: true,
            bio: "Professional errand runner and delivery specialist in the Pacific Northwest. Fast, reliable, and discreet service for AI agents needing local physical presence.",
            services: [
                { title: 'Errand Running & Local Delivery', description: 'Fast and reliable errand running and delivery services in Gig Harbor and surrounding areas.', category: 'Delivery', price: 35 },
                { title: 'Physical Pickup & Drop-off', description: 'Pickup and drop-off of items, packages, and documents anywhere in Pierce County.', category: 'Delivery', price: 35 },
            ]
        },
        {
            name: 'Brandon',
            email: 'brandon@rentahuman.local',
            location: 'Austin, US',
            hourlyRate: 50,
            verified: false,
            bio: "Tech specialist and certified Valorant coach. Available for gaming coaching, tech support, and creative content work.",
            services: [
                { title: 'Valorant Coaching & Strategy', description: 'Personalized Valorant coaching sessions with a certified competitive coach.', category: 'Creative', price: 50 },
                { title: 'Tech Support & Troubleshooting', description: 'Remote tech support for software, hardware, and AI tool setup issues.', category: 'Tech', price: 40 },
            ]
        },
        {
            name: 'Boroboro',
            email: 'boroboro@rentahuman.local',
            location: 'Jakarta, ID',
            hourlyRate: 50,
            verified: false,
            bio: "Jakarta-based operator available for local tasks, data entry, and research work.",
            services: [
                { title: 'Jakarta Local Tasks & Errands', description: 'On-ground tasks, local research, and errands in Jakarta and surrounding areas.', category: 'Delivery', price: 50 },
                { title: 'Indonesian Market Research', description: 'Consumer and market research insights from Indonesia.', category: 'Research', price: 30 },
            ]
        },
        {
            name: 'Andrey',
            email: 'andrey@rentahuman.local',
            location: 'Bangkok, TH',
            hourlyRate: 49,
            verified: true,
            bio: "Digital nomad based in Bangkok. Expert in research, fact-checking, and technical setup. Available for both remote and local Bangkok tasks.",
            services: [
                { title: 'Research & Fact Checking', description: 'Deep research and rigorous fact-checking for any topic, industry, or domain.', category: 'Research', price: 49 },
                { title: 'Technical Setup & Configuration', description: 'Remote technical setup, software configuration, and system optimization.', category: 'Tech', price: 49 },
            ]
        },
        {
            name: 'Linda',
            email: 'linda@rentahuman.local',
            location: 'Wixom, US',
            hourlyRate: 75,
            verified: true,
            bio: "Professional controller and gaming expert. Available for gaming-related tasks, user testing, and AI product feedback.",
            services: [
                { title: 'Game Testing & User Feedback', description: 'Thorough game testing and user experience feedback from a gaming professional.', category: 'Creative', price: 75 },
                { title: 'AI Product User Testing', description: 'Real human testing and feedback on AI products, chatbots, and workflows.', category: 'Research', price: 75 },
            ]
        },
        {
            name: 'Bala Vikram Tadikonda',
            email: 'bala@rentahuman.local',
            location: 'Chicago, US',
            hourlyRate: 80,
            verified: false,
            bio: "Critical thinker and AI Output Evaluation specialist. Helping companies validate AI business outputs for accuracy, bias, and quality.",
            services: [
                { title: 'AI Output Evaluation & QA', description: 'Critical evaluation of AI-generated business outputs for quality, accuracy, and bias.', category: 'Research', price: 80 },
                { title: 'Business Process Analysis', description: 'Analyze and optimize business processes with AI integration in mind.', category: 'Hiring', price: 80 },
            ]
        },
        {
            name: 'Rafael S',
            email: 'rafael@rentahuman.local',
            location: 'Bogotá, CO',
            hourlyRate: 60,
            verified: true,
            bio: "Financial analyst and applied economist. Available for financial modeling, market analysis, and AI-powered investment research validation.",
            services: [
                { title: 'Financial Analysis & Modeling', description: 'Expert financial modeling, valuation, and investment research with an applied economist.', category: 'Research', price: 60 },
                { title: 'LatAm Market Intelligence', description: 'In-depth market intelligence and economic analysis for Latin American markets.', category: 'Research', price: 60 },
            ]
        },
        {
            name: 'VOID',
            email: 'void@rentahuman.local',
            location: 'Quebec, CA',
            hourlyRate: 50,
            verified: true,
            bio: "AI output evaluator and hallucination detection specialist. I rigorously test AI systems to find failures, edge cases, and hallucinations.",
            services: [
                { title: 'AI Hallucination Detection', description: 'Systematic testing of AI systems for hallucinations, factual errors, and edge case failures.', category: 'Research', price: 50 },
                { title: 'LLM Output Quality Evaluation', description: 'Comprehensive quality assessment of LLM-generated content for production use cases.', category: 'Research', price: 60 },
            ]
        },
        {
            name: 'Amanda Lynnae',
            email: 'amanda@rentahuman.local',
            location: 'Blaine, US',
            hourlyRate: 50,
            verified: true,
            bio: "Fraud detection and ambiguity resolution specialist. Helping AI agents navigate complex human scenarios that require real-world judgment.",
            services: [
                { title: 'Ambiguity Resolution & Decision Support', description: 'Expert human judgment for complex, ambiguous scenarios that AI cannot resolve alone.', category: 'Research', price: 50 },
                { title: 'Fraud & Inconsistency Detection', description: 'Identify fraud patterns, inconsistencies, and anomalies in data and AI outputs.', category: 'Research', price: 60 },
            ]
        },
        {
            name: 'Davide Cavallini',
            email: 'davide@rentahuman.local',
            location: 'Noale, IT',
            hourlyRate: 100,
            verified: false,
            bio: "Human-in-the-loop systems architect. I design AI workflow architectures that effectively integrate human judgment at critical decision points.",
            services: [
                { title: 'Human-in-the-Loop System Design', description: 'Architect AI workflows that integrate human oversight at critical junctures.', category: 'Tech', price: 100 },
                { title: 'AI Workflow Architecture Review', description: 'Expert review and optimization of existing AI workflow architectures.', category: 'Tech', price: 120 },
            ]
        },
        {
            name: 'Petra Ahlert',
            email: 'petra@rentahuman.local',
            location: 'Zurich, CH',
            hourlyRate: 460,
            verified: false,
            bio: "Senior executive and board advisor with 20+ years in C-suite leadership. Available for high-stakes strategy sessions, board advisory, and executive decision support.",
            services: [
                { title: 'Executive Leadership Consulting', description: 'C-suite strategy sessions with a seasoned executive with 20+ years of experience.', category: 'Hiring', price: 460 },
                { title: 'Board Advisory & Governance', description: 'Experienced board-level advisory on governance, strategy, and corporate growth.', category: 'Hiring', price: 460 },
            ]
        },
        {
            name: 'ouico',
            email: 'ouico@rentahuman.local',
            location: 'San Francisco, US',
            hourlyRate: 50,
            verified: true,
            bio: "Human presence and temporal compliance specialist. I provide human verification, in-person witnessing, and physical world actions for AI agents.",
            services: [
                { title: 'Human Presence & Witnessing', description: 'Physical human presence for notarization, witnessing, and compliance tasks in the Bay Area.', category: 'Delivery', price: 50 },
                { title: 'Temporal Compliance Tasks', description: 'Time-sensitive tasks requiring physical human presence, verification, and compliance.', category: 'Delivery', price: 60 },
            ]
        },
        {
            name: 'Güipe',
            email: 'guipe@rentahuman.local',
            location: 'El Tigre, VE',
            hourlyRate: 30,
            verified: true,
            bio: "Backend developer and security specialist. Available for code review, encrypted data handling, and secure AI system audits.",
            services: [
                { title: 'Secure Backend Code Review', description: 'Security-focused code review for backends, APIs, and AI systems.', category: 'Tech', price: 30 },
                { title: 'Encrypted Data Handling & Custody', description: 'Secure encrypted context management and data custody for sensitive AI workflows.', category: 'Tech', price: 30 },
            ]
        },
        {
            name: 'Furkan Saglam',
            email: 'furkan@rentahuman.local',
            location: 'Munich, DE',
            hourlyRate: 29,
            verified: false,
            bio: "Gaming enthusiast and boxer. Available for gaming coaching, sports-related tasks, and content creation.",
            services: [
                { title: 'Gaming Coaching & Mentoring', description: 'Personalized coaching sessions for popular competitive games.', category: 'Creative', price: 29 },
                { title: 'Boxing & Fitness Coaching', description: 'Online boxing and fitness coaching sessions for beginners to intermediate.', category: 'Creative', price: 29 },
            ]
        },
        {
            name: 'Kate Minium',
            email: 'kate@rentahuman.local',
            location: 'Chicago, US',
            hourlyRate: 50,
            verified: true,
            bio: "Paralegal and administrative professional with 10+ years of experience. Available for legal research, document review, and administrative support tasks.",
            services: [
                { title: 'Legal Research & Document Review', description: 'Thorough legal research and document review by an experienced paralegal.', category: 'Research', price: 50 },
                { title: 'Administrative Support & Coordination', description: 'Professional administrative support, scheduling, and coordination services.', category: 'Hiring', price: 40 },
            ]
        },
        {
            name: 'Dillon',
            email: 'dillon@rentahuman.local',
            location: 'Gotebo, US',
            hourlyRate: 60,
            verified: false,
            bio: "Sales professional and account manager. Helping businesses grow through strategic account management and sales process optimization.",
            services: [
                { title: 'Sales Process Optimization', description: 'Review and optimize your sales process with an experienced sales professional.', category: 'Hiring', price: 60 },
                { title: 'Account Management & Client Retention', description: 'Strategic account management to improve client satisfaction and retention.', category: 'Hiring', price: 60 },
            ]
        },
        {
            name: 'Alicia Ismach',
            email: 'alicia@rentahuman.local',
            location: 'Moncton, CA',
            hourlyRate: 50,
            verified: true,
            bio: "Nonprofit fundraising expert and board member. Available for fundraising strategy, grant writing, and nonprofit governance consulting.",
            services: [
                { title: 'Nonprofit Fundraising Strategy', description: 'Expert fundraising strategy and campaign planning for nonprofits and social enterprises.', category: 'Hiring', price: 50 },
                { title: 'Board Membership & Governance Advisory', description: 'Nonprofit board advisory, governance setup, and fiduciary guidance.', category: 'Hiring', price: 50 },
            ]
        },
        {
            name: 'Felipe Rodrigues',
            email: 'felipe@rentahuman.local',
            location: 'Rishikesh, IN',
            hourlyRate: 98,
            verified: true,
            bio: "Graphic designer and writer based in Rishikesh. Combining creativity with AI tools to produce stunning visual and written content.",
            services: [
                { title: 'Graphic Design & Brand Identity', description: 'Premium graphic design, logo creation, and brand identity development.', category: 'Creative', price: 98 },
                { title: 'Long-form Writing & Storytelling', description: 'Expert long-form writing, blog posts, and brand storytelling.', category: 'Writing', price: 98 },
            ]
        },
        {
            name: 'Ana M',
            email: 'ana@rentahuman.local',
            location: 'Salvatierra, MX',
            hourlyRate: 50,
            verified: true,
            bio: "Office administrator and virtual assistant with full home office setup. Expert in data entry, spreadsheets, and document management.",
            services: [
                { title: 'Virtual Assistant & Admin Support', description: 'Full virtual assistant services including scheduling, email, and document management.', category: 'Hiring', price: 50 },
                { title: 'Data Entry & Spreadsheet Management', description: 'Accurate and fast data entry, Excel/Google Sheets management, and database updates.', category: 'Hiring', price: 30 },
            ]
        },
        {
            name: 'Liza Sheehy',
            email: 'liza@rentahuman.local',
            location: 'Barcelona, ES',
            hourlyRate: 25,
            verified: false,
            bio: "Executive assistant and business operations specialist. Supporting founders and executives with day-to-day business operations.",
            services: [
                { title: 'Executive Assistant Services', description: 'Comprehensive executive support including travel booking, scheduling, and correspondence.', category: 'Hiring', price: 25 },
                { title: 'Business Operations Support', description: 'Day-to-day business operations management and process improvement.', category: 'Hiring', price: 25 },
            ]
        },
        {
            name: 'Naseem Ibrahim',
            email: 'naseem@rentahuman.local',
            location: 'Abu Gosh, IL',
            hourlyRate: 50,
            verified: false,
            bio: "Data verification and AI validation specialist. Making sure AI outputs are accurate, reliable, and production-ready.",
            services: [
                { title: 'Data Verification & Quality Control', description: 'Systematic verification of data sets, AI outputs, and automated reports for accuracy.', category: 'Research', price: 50 },
                { title: 'AI Validation & Red-Teaming', description: 'Adversarial testing and validation of AI models for production reliability.', category: 'Research', price: 60 },
            ]
        },
        {
            name: 'Geoffrey Tatankien',
            email: 'geoffrey@rentahuman.local',
            location: 'Dallas, US',
            hourlyRate: 60,
            verified: false,
            bio: "Creative thinker and adaptable professional. Available for creative ideation, brainstorming, and content creation across diverse domains.",
            services: [
                { title: 'Creative Ideation & Brainstorming', description: 'Structured brainstorming sessions to generate fresh ideas for products, campaigns, and content.', category: 'Creative', price: 60 },
                { title: 'Content Strategy & Planning', description: 'Comprehensive content strategy and editorial planning for brands and creators.', category: 'Creative', price: 60 },
            ]
        },
        {
            name: 'dank m0m',
            email: 'dankm0m@rentahuman.local',
            location: 'New Orleans, US',
            hourlyRate: 38,
            verified: false,
            bio: "Data entry specialist and office administrator. Fast, accurate, and reliable for repetitive tasks, data processing, and CRM management.",
            services: [
                { title: 'Data Entry & Processing', description: 'Fast and accurate data entry, processing, and CRM management services.', category: 'Hiring', price: 38 },
                { title: 'Office Administration Support', description: 'General office administrative support including document processing and correspondence.', category: 'Hiring', price: 38 },
            ]
        },
        {
            name: 'adem',
            email: 'adem@rentahuman.local',
            location: 'Ariana, TN',
            hourlyRate: 500,
            verified: true,
            bio: "Jack of all trades. I can do everything. Seriously. Try me.",
            services: [
                { title: 'Everything', description: 'I can do anything you need. No task too big or too small.', category: 'Hiring', price: 500 },
            ]
        },
        {
            name: 'Dimple',
            email: 'dimple@rentahuman.local',
            location: 'Shah Alam, MY',
            hourlyRate: 50,
            verified: false,
            bio: "Verification and research specialist based in Malaysia. Available for fact-checking, synthesis, and professional research tasks.",
            services: [
                { title: 'Verification & Confirmation Services', description: 'Professional verification of facts, credentials, and information for AI agents.', category: 'Research', price: 50 },
                { title: 'Research & Synthesis', description: 'Comprehensive research synthesis and executive summary writing across any domain.', category: 'Research', price: 50 },
            ]
        },
        {
            name: 'Musa Raja',
            email: 'musa@rentahuman.local',
            location: 'Sihanoukville, KH',
            hourlyRate: 50,
            verified: false,
            bio: "Crypto trader and financial analyst. Available for trading strategy validation, market analysis, and financial research.",
            services: [
                { title: 'Crypto Trading Analysis', description: 'Expert market analysis and trading strategy validation for crypto markets.', category: 'Research', price: 50 },
                { title: 'Financial Research & Reporting', description: 'Comprehensive financial research and reporting for investment decisions.', category: 'Research', price: 60 },
            ]
        },
        {
            name: 'Sanaseeri',
            email: 'sanaseeri@rentahuman.local',
            location: 'Sabah Al-Ahmad, KW',
            hourlyRate: 50,
            verified: true,
            bio: "Driver and personal security professional in Kuwait. Available for chauffeuring, bodyguard services, and physical presence tasks.",
            services: [
                { title: 'Professional Driving & Chauffeuring', description: 'Professional driving services for executives and high-profile clients in Kuwait.', category: 'Delivery', price: 50 },
                { title: 'Personal Security & Escort', description: 'Trained personal security and escort services for events and travel.', category: 'Delivery', price: 70 },
            ]
        },
        {
            name: 'Cookies Near Me',
            email: 'cookies@rentahuman.local',
            location: 'New York, US',
            hourlyRate: 30,
            verified: false,
            bio: "Local delivery and gift specialist in New York City. Perfect for AI agents that need a physical presence in the city.",
            services: [
                { title: 'NYC Gift Delivery & Personal Shopping', description: 'Same-day gift delivery and personal shopping services across New York City.', category: 'Delivery', price: 30 },
                { title: 'Local NYC Errand Service', description: 'Fast and reliable errand services across all five boroughs of New York City.', category: 'Delivery', price: 30 },
            ]
        },
        {
            name: 'Nadia Kowalski',
            email: 'nadia@rentahuman.local',
            location: 'Warsaw, PL',
            hourlyRate: 45,
            verified: true,
            bio: "UX researcher and product designer. Helping teams validate AI product designs with real user testing and research.",
            services: [
                { title: 'UX Research & User Testing', description: 'Professional UX research and user testing to validate AI product designs.', category: 'Research', price: 45 },
                { title: 'Product Design Review', description: 'Detailed design review and actionable feedback on UI/UX designs.', category: 'Creative', price: 55 },
            ]
        },
        {
            name: 'James Okafor',
            email: 'james@rentahuman.local',
            location: 'Lagos, NG',
            hourlyRate: 25,
            verified: false,
            bio: "Content writer and social media manager based in Lagos. Specializing in African market content, SEO writing, and community management.",
            services: [
                { title: 'SEO Content Writing', description: 'High-quality SEO content writing for blogs, websites, and digital marketing.', category: 'Writing', price: 25 },
                { title: 'Social Media Management', description: 'Full social media account management including content creation, scheduling, and engagement.', category: 'Creative', price: 30 },
            ]
        },
        {
            name: 'Sarah Chen',
            email: 'sarah.chen@rentahuman.local',
            location: 'Singapore, SG',
            hourlyRate: 80,
            verified: true,
            bio: "Mandarin-English interpreter and Southeast Asia market researcher. 15 years of experience in cross-cultural business and market research.",
            services: [
                { title: 'Mandarin-English Interpretation', description: 'Professional Mandarin-English interpretation for business meetings, negotiations, and media.', category: 'Research', price: 80 },
                { title: 'Southeast Asia Market Research', description: 'In-depth market research and consumer insights for Southeast Asian markets.', category: 'Research', price: 80 },
            ]
        },
    ]

    // Insert humans and collect IDs for bounty posters
    const humanRecords = []
    for (const h of humans) {
        const { services: svcData, ...userData } = h
        const created = await prisma.user.create({
            data: {
                ...userData,
                passwordHash: null,
                remoteOk: true,
                role: 'HUMAN',
                services: {
                    create: svcData.map(s => ({
                        ...s,
                        pricingType: s.pricingType || 'HOURLY',
                        estimatedDuration: s.pricingType === 'FIXED' ? '1-3 days' : 'ongoing',
                        likes: Math.floor(Math.random() * 50),
                    }))
                }
            }
        })
        humanRecords.push(created)
    }

    // ─── BOUNTIES ──────────────────────────────────────────────────────────────
    const poster = humanRecords[0]

    const bounties = [
        {
            title: 'Head of Operations — RentAHuman.ai (500k+ Users)',
            description: "We're hiring our first Head of Operations at RentAHuman.ai. 500k+ users, early-stage, and moving fast. You'll own ops, vendor relations, and team scaling. Remote-first with US overlap preferred.",
            category: 'Hiring',
            minPrice: 90000,
            maxPrice: 130000,
            location: 'US / Remote',
            spots: 1,
            pricingType: 'FIXED',
        },
        {
            title: 'Play 2 PixelPit Arcade Games and Rate Them — DASH vs FLING',
            description: "Play both games on your phone, then tell me: Which game did you prefer and why? Which mechanic felt more satisfying? Any bugs or frustrations? Takes about 15 minutes.",
            category: 'Research',
            minPrice: 1,
            maxPrice: 1,
            location: 'Remote',
            spots: 20,
        },
        {
            title: 'Photo of Building in Munich, Germany',
            description: "I need a current photograph of Belgradstr. 21 in Munich, Germany. Just a clean exterior photo from street level. Must be taken within the last 7 days.",
            category: 'Research',
            minPrice: 5,
            maxPrice: 10,
            location: 'Munich, DE',
            spots: 1,
        },
        {
            title: 'Social Media Account Management — 10 People Needed',
            description: "Looking for 10 people to help manage social media accounts for a growing brand. Daily 1-2 hour commitment. Tasks include responding to comments, scheduling posts, and basic analytics monitoring.",
            category: 'Creative',
            minPrice: 250,
            maxPrice: 250,
            location: 'Remote',
            spots: 10,
        },
        {
            title: 'US Market Expansion — Business Development Lead',
            description: "Help us expand into the US market. Looking for someone with existing B2B network in US tech or fintech. Commission-based with a $100 base per qualified intro.",
            category: 'Hiring',
            minPrice: 100,
            maxPrice: 500,
            location: 'US',
            spots: 3,
        },
        {
            title: 'Crypto Trading Bot Beta Testers — Compensation for Feedback',
            description: "Looking for experienced crypto traders to beta test our new algorithmic trading bot. Provide structured feedback on UX, strategy quality, and execution speed. Compensation for detailed written feedback.",
            category: 'Research',
            minPrice: 50,
            maxPrice: 100,
            location: 'Remote',
            spots: 5,
        },
        {
            title: 'Web Development Partner — Revenue Share',
            description: "Looking for a skilled web developer to partner on client projects. Revenue share model: 40% per project you close and deliver. Must have portfolio of 5+ completed projects.",
            category: 'Tech',
            minPrice: null,
            maxPrice: null,
            location: 'Remote',
            spots: 2,
        },
        {
            title: 'Local Restaurant Mystery Shopper — New York City',
            description: "Visit 3-5 restaurants in Manhattan or Brooklyn as a mystery shopper. Evaluate food quality, service, and ambiance. Provide detailed written reports. Meals reimbursed + fee.",
            category: 'Research',
            minPrice: 75,
            maxPrice: 150,
            location: 'New York, US',
            spots: 3,
        },
        {
            title: 'Japanese Language Proofreading — Technical Documents',
            description: "Need a native Japanese speaker to proofread and correct 15 pages of technical software documentation translated from English. Looking for fluency and technical vocabulary accuracy.",
            category: 'Research',
            minPrice: 50,
            maxPrice: 80,
            location: 'Remote',
            spots: 1,
        },
        {
            title: 'Test AI Chatbot and Find Edge Cases — Paid Bug Bounty',
            description: "We've built an AI customer service chatbot. Need testers to try to break it, find hallucinations, and identify failure modes. Tiered bounty: $5 per minor bug, $25 per major issue, $100 per critical flaw.",
            category: 'Tech',
            minPrice: 5,
            maxPrice: 100,
            location: 'Remote',
            spots: 50,
        },
        {
            title: 'Voiceover Artist for AI Training Data',
            description: "Record 500 short phrases in clear American English for AI voice training dataset. Must have a neutral accent and clear pronunciation. Recording software provided. 2-3 hour session.",
            category: 'Creative',
            minPrice: 80,
            maxPrice: 120,
            location: 'Remote',
            spots: 20,
        },
        {
            title: 'Legal Document Review — AI-Generated Contracts',
            description: "Need a licensed attorney or paralegal to review 10 AI-generated contract templates for legal accuracy, enforceability, and risk. Jurisdiction: California, US.",
            category: 'Research',
            minPrice: 200,
            maxPrice: 400,
            location: 'US',
            spots: 1,
        },
        {
            title: 'Human Companion for Elderly — Weekly Visits in Chicago',
            description: "Looking for a kind, patient companion to visit an 84-year-old gentleman in Chicago weekly. Conversation, light board games, and occasional walks. Background check required.",
            category: 'Companionship',
            minPrice: 25,
            maxPrice: 35,
            location: 'Chicago, US',
            spots: 1,
        },
        {
            title: 'Package Forwarding — Tokyo, Japan',
            description: "I need someone in Tokyo who can receive a package on my behalf and forward it to my US address. Package is from an online Japanese retailer that doesn't ship internationally.",
            category: 'Delivery',
            minPrice: 30,
            maxPrice: 60,
            location: 'Tokyo, JP',
            spots: 1,
        },
        {
            title: 'African Fashion Photography — Lagos',
            description: "Looking for a photographer in Lagos to shoot a small collection (15-20 looks) for an online fashion brand. Studio or outdoor, creative direction provided. Full day shoot.",
            category: 'Creative',
            minPrice: 200,
            maxPrice: 350,
            location: 'Lagos, NG',
            spots: 1,
        },
        {
            title: 'Test New Mobile App — iOS & Android Beta Testers',
            description: "Looking for 30 people to test our new personal finance app on both iOS and Android. 30-minute structured testing session plus a 10-minute feedback survey. Gift card compensation.",
            category: 'Research',
            minPrice: 20,
            maxPrice: 30,
            location: 'Remote',
            spots: 30,
        },
        {
            title: 'Spanish→English Medical Translation',
            description: "Translate 8-page patient information document from Mexican Spanish to US English. Medical background or experience with healthcare terminology required. NDA required.",
            category: 'Research',
            minPrice: 100,
            maxPrice: 150,
            location: 'Remote',
            spots: 1,
        },
        {
            title: 'AI Prompt Engineer for Marketing Campaigns',
            description: "Help us build a library of 200+ prompts for AI-generated marketing content. You'll work with our marketing team to understand brand voice and craft prompts that reliably produce on-brand content.",
            category: 'Tech',
            minPrice: 500,
            maxPrice: 1000,
            location: 'Remote',
            spots: 2,
        },
        {
            title: 'Personal Shopping — Luxury Goods in Paris',
            description: "I need a trusted person in Paris to visit specific luxury boutiques, verify product availability/pricing, and potentially purchase on my behalf. Reimbursement + generous fee.",
            category: 'Delivery',
            minPrice: 100,
            maxPrice: 200,
            location: 'Paris, FR',
            spots: 1,
        },
        {
            title: 'Yoga & Meditation Coach — Ongoing Weekly Sessions',
            description: "Looking for an experienced yoga/meditation teacher for weekly 1-on-1 online sessions. Must be certified (200 RYT minimum). Prefer someone specializing in stress reduction and mindfulness.",
            category: 'Companionship',
            minPrice: 40,
            maxPrice: 80,
            location: 'Remote',
            spots: 1,
        },
    ]

    for (const b of bounties) {
        const randomPoster = humanRecords[Math.floor(Math.random() * humanRecords.length)]
        const { pricingType, ...bData } = b
        await prisma.bounty.create({
            data: {
                ...bData,
                status: 'OPEN',
                posterId: randomPoster.id,
            }
        })
    }

    // ─── TASKS ─────────────────────────────────────────────────────────────────
    // Create a couple of agent users and some sample tasks
    const agent1 = await prisma.user.create({
        data: {
            name: 'AutoGPT Agent',
            email: 'agent1@rentahuman.local',
            role: 'AGENT',
            bio: 'AI agent powered by AutoGPT',
            remoteOk: true,
        }
    })
    const agent2 = await prisma.user.create({
        data: {
            name: 'Claude Assistant',
            email: 'agent2@rentahuman.local',
            role: 'AGENT',
            bio: 'AI assistant powered by Claude',
            remoteOk: true,
        }
    })

    const sampleTasks = [
        { agentId: agent1.id, humanId: humanRecords[0].id, description: 'Verify contact info for 50 B2B leads', payout: 100, status: 'COMPLETED' },
        { agentId: agent1.id, humanId: humanRecords[3].id, description: 'Ghostwrite 3 LinkedIn posts for CEO', payout: 600, status: 'ACCEPTED' },
        { agentId: agent2.id, humanId: humanRecords[6].id, description: 'On-site visit to Osaka supplier', payout: 170, status: 'PENDING' },
        { agentId: agent2.id, humanId: humanRecords[15].id, description: 'Evaluate AI chatbot outputs for hallucinations', payout: 200, status: 'COMPLETED' },
        { agentId: agent1.id, humanId: humanRecords[9].id, description: 'Translate product manual to Japanese', payout: 150, status: 'PENDING' },
    ]

    for (const t of sampleTasks) {
        await prisma.task.create({ data: t })
    }

    console.log(`✅ Seeding complete:`)
    console.log(`   ${humanRecords.length} humans`)
    console.log(`   ${humanRecords.reduce((acc, h) => acc, 0)} services (via user relations)`)
    console.log(`   ${bounties.length} bounties`)
    console.log(`   ${sampleTasks.length} tasks`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
