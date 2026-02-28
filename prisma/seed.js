const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database with crawled real humans...')

    // Clean existing users to avoid unique constraint errors if we run multiple times
    await prisma.service.deleteMany()
    await prisma.bounty.deleteMany()
    await prisma.user.deleteMany()


    await prisma.user.create({
        data: {
            name: 'Liza Sheehy',
            email: 'human0@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'Barcelona, ES',
            hourlyRate: 25,
            verified: false,
            services: {
                create: [
                    {
                        title: 'Executive Support',
                        description: 'Professional Executive Support',
                        category: 'Other',
                        price: 25
                    },
                    {
                        title: 'Business Operations',
                        description: 'Professional Business Operations',
                        category: 'Other',
                        price: 25
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: 'Naseem Ibrahim',
            email: 'human1@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'Abu gosh, IL',
            hourlyRate: 50,
            verified: false,
            services: {
                create: [
                    {
                        title: 'Data Verification',
                        description: 'Professional Data Verification',
                        category: 'Other',
                        price: 50
                    },
                    {
                        title: 'AI Validation',
                        description: 'Professional AI Validation',
                        category: 'Other',
                        price: 50
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: 'Linda',
            email: 'human2@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'Wixom, US',
            hourlyRate: 75,
            verified: true,
            services: {
                create: [
                    {
                        title: 'Controller',
                        description: 'Professional Controller',
                        category: 'Other',
                        price: 75
                    },
                    {
                        title: 'Gamer',
                        description: 'Professional Gamer',
                        category: 'Other',
                        price: 75
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: 'maicol perez',
            email: 'human3@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'Lima, Peru',
            hourlyRate: 50,
            verified: false,
            services: {
                create: [
                    {
                        title: 'Publicar videos',
                        description: 'Professional Publicar videos',
                        category: 'Other',
                        price: 50
                    },
                    {
                        title: 'Ver anime',
                        description: 'Professional Ver anime',
                        category: 'Other',
                        price: 50
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: 'Ms Deena',
            email: 'human4@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'Gig Harbor, US',
            hourlyRate: 35,
            verified: true,
            services: {
                create: [
                    {
                        title: 'Running errands and completing deliveries',
                        description: 'Professional Running errands and completing deliveries',
                        category: 'Other',
                        price: 35
                    },
                    {
                        title: 'Picking up and dropping off items',
                        description: 'Professional Picking up and dropping off items',
                        category: 'Other',
                        price: 35
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: 'Bala Vikram Tadikonda',
            email: 'human5@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'Chicago, US',
            hourlyRate: 80,
            verified: false,
            services: {
                create: [
                    {
                        title: 'Critical thinking',
                        description: 'Professional Critical thinking',
                        category: 'Other',
                        price: 80
                    },
                    {
                        title: 'AI Output Evaluation Business',
                        description: 'Professional AI Output Evaluation Business',
                        category: 'Other',
                        price: 80
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: 'Ana M',
            email: 'human6@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'Salvatierra',
            hourlyRate: 50,
            verified: true,
            services: {
                create: [
                    {
                        title: 'Office, impresora, computadora y celular',
                        description: 'Professional Office, impresora, computadora y celular',
                        category: 'Other',
                        price: 50
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: 'Rafael S',
            email: 'human7@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'Bogotá, CO',
            hourlyRate: 60,
            verified: true,
            services: {
                create: [
                    {
                        title: 'Análisis financiero',
                        description: 'Professional Análisis financiero',
                        category: 'Other',
                        price: 60
                    },
                    {
                        title: 'Economía aplicada',
                        description: 'Professional Economía aplicada',
                        category: 'Other',
                        price: 60
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: 'Alcatraz',
            email: 'human8@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'San Francisco del Rincón, MX',
            hourlyRate: 50,
            verified: false,
            services: {
                create: [
                    {
                        title: 'Tengo buena salud',
                        description: 'Professional Tengo buena salud',
                        category: 'Other',
                        price: 50
                    },
                    {
                        title: 'Tengo buena actitud',
                        description: 'Professional Tengo buena actitud',
                        category: 'Other',
                        price: 50
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: 'Güipe',
            email: 'human9@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'El Tigre, VE',
            hourlyRate: 30,
            verified: true,
            services: {
                create: [
                    {
                        title: 'Technical Logic & Backend Code Review',
                        description: 'Professional Technical Logic & Backend Code Review',
                        category: 'Other',
                        price: 30
                    },
                    {
                        title: 'Secure Encrypted Context & Data Custody',
                        description: 'Professional Secure Encrypted Context & Data Custody',
                        category: 'Other',
                        price: 30
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: '11 6',
            email: 'human10@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'Yokohama, JP',
            hourlyRate: 50,
            verified: false,
            services: {
                create: [
                    {
                        title: '服装设计',
                        description: 'Professional 服装设计',
                        category: 'Other',
                        price: 50
                    },
                    {
                        title: '剪辑',
                        description: 'Professional 剪辑',
                        category: 'Other',
                        price: 50
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: 'Sanaseeri',
            email: 'human11@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'Sobah al-ahmad',
            hourlyRate: 50,
            verified: true,
            services: {
                create: [
                    {
                        title: 'I can drive for long time',
                        description: 'Professional I can drive for long time',
                        category: 'Other',
                        price: 50
                    },
                    {
                        title: 'I can fight',
                        description: 'Professional I can fight',
                        category: 'Other',
                        price: 50
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: 'Cookies Near Me',
            email: 'human12@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'New York',
            hourlyRate: 30,
            verified: false,
            services: {
                create: [
                    {
                        title: 'Gift-giving',
                        description: 'Professional Gift-giving',
                        category: 'Other',
                        price: 30
                    },
                    {
                        title: 'Local delivery',
                        description: 'Professional Local delivery',
                        category: 'Other',
                        price: 30
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: 'Andrey',
            email: 'human13@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'Bangkok, TH',
            hourlyRate: 49,
            verified: true,
            services: {
                create: [
                    {
                        title: 'Research & fact checking',
                        description: 'Professional Research & fact checking',
                        category: 'Other',
                        price: 49
                    },
                    {
                        title: 'Technical setup & configuration',
                        description: 'Professional Technical setup & configuration',
                        category: 'Other',
                        price: 49
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: 'Blue rose',
            email: 'human14@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'Higashi Murayama, JP',
            hourlyRate: 30,
            verified: false,
            services: {
                create: [
                    {
                        title: 'MS word',
                        description: 'Professional MS word',
                        category: 'Other',
                        price: 30
                    },
                    {
                        title: 'MS excel',
                        description: 'Professional MS excel',
                        category: 'Other',
                        price: 30
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: 'Geoffrey Tatankien',
            email: 'human15@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'Dallas, US',
            hourlyRate: 60,
            verified: false,
            services: {
                create: [
                    {
                        title: 'Creativity',
                        description: 'Professional Creativity',
                        category: 'Other',
                        price: 60
                    },
                    {
                        title: 'Adaptable',
                        description: 'Professional Adaptable',
                        category: 'Other',
                        price: 60
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: 'ouico',
            email: 'human16@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'San Francisco',
            hourlyRate: 50,
            verified: true,
            services: {
                create: [
                    {
                        title: 'Human Presence',
                        description: 'Professional Human Presence',
                        category: 'Other',
                        price: 50
                    },
                    {
                        title: 'Temporal Compliance',
                        description: 'Professional Temporal Compliance',
                        category: 'Other',
                        price: 50
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: 'VOID',
            email: 'human17@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'quebec',
            hourlyRate: 50,
            verified: true,
            services: {
                create: [
                    {
                        title: 'AI output evaluation',
                        description: 'Professional AI output evaluation',
                        category: 'Other',
                        price: 50
                    },
                    {
                        title: 'Hallucination detection',
                        description: 'Professional Hallucination detection',
                        category: 'Other',
                        price: 50
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: 'Amanda Lynnae',
            email: 'human18@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'Blaine, United States',
            hourlyRate: 50,
            verified: true,
            services: {
                create: [
                    {
                        title: 'Ambiguity resolution',
                        description: 'Professional Ambiguity resolution',
                        category: 'Other',
                        price: 50
                    },
                    {
                        title: 'Fraud & inconsistency detection',
                        description: 'Professional Fraud & inconsistency detection',
                        category: 'Other',
                        price: 50
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: 'Davide Cavallini',
            email: 'human19@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'Noale, Italy',
            hourlyRate: 100,
            verified: false,
            services: {
                create: [
                    {
                        title: 'Human-in-the-loop systems',
                        description: 'Professional Human-in-the-loop systems',
                        category: 'Other',
                        price: 100
                    },
                    {
                        title: 'AI workflow architecture',
                        description: 'Professional AI workflow architecture',
                        category: 'Other',
                        price: 100
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: 'Petra Ahlert',
            email: 'human20@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'Zug and Zurich, CH',
            hourlyRate: 460,
            verified: false,
            services: {
                create: [
                    {
                        title: 'Executive Leadership',
                        description: 'Professional Executive Leadership',
                        category: 'Other',
                        price: 460
                    },
                    {
                        title: 'Growth Strategies',
                        description: 'Professional Growth Strategies',
                        category: 'Other',
                        price: 460
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: 'Furkan Saglam',
            email: 'human21@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'Munich',
            hourlyRate: 29,
            verified: false,
            services: {
                create: [
                    {
                        title: 'Gaming',
                        description: 'Professional Gaming',
                        category: 'Other',
                        price: 29
                    },
                    {
                        title: 'Boxing',
                        description: 'Professional Boxing',
                        category: 'Other',
                        price: 29
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: 'dank m0m',
            email: 'human22@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'New Orleans',
            hourlyRate: 38,
            verified: false,
            services: {
                create: [
                    {
                        title: 'data entry',
                        description: 'Professional data entry',
                        category: 'Other',
                        price: 38
                    },
                    {
                        title: 'office administrator',
                        description: 'Professional office administrator',
                        category: 'Other',
                        price: 38
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: 'adem',
            email: 'human23@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'ARIANA, TR',
            hourlyRate: 500,
            verified: true,
            services: {
                create: [
                    {
                        title: 'everything',
                        description: 'Professional everything',
                        category: 'Other',
                        price: 500
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: 'Alicia Ismach',
            email: 'human24@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'Moncton, CA',
            hourlyRate: 50,
            verified: true,
            services: {
                create: [
                    {
                        title: 'Fundraising',
                        description: 'Professional Fundraising',
                        category: 'Other',
                        price: 50
                    },
                    {
                        title: 'Board Membership',
                        description: 'Professional Board Membership',
                        category: 'Other',
                        price: 50
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: 'Felipe Rodrigues',
            email: 'human25@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'Rishikesh, India',
            hourlyRate: 98,
            verified: true,
            services: {
                create: [
                    {
                        title: 'Design',
                        description: 'Professional Design',
                        category: 'Other',
                        price: 98
                    },
                    {
                        title: 'Writing',
                        description: 'Professional Writing',
                        category: 'Other',
                        price: 98
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: 'Kate Minium',
            email: 'human26@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'Chicago, US',
            hourlyRate: 50,
            verified: true,
            services: {
                create: [
                    {
                        title: 'Legal support',
                        description: 'Professional Legal support',
                        category: 'Other',
                        price: 50
                    },
                    {
                        title: 'Administrative support',
                        description: 'Professional Administrative support',
                        category: 'Other',
                        price: 50
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: 'Dillon',
            email: 'human27@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'Gotebo, USA',
            hourlyRate: 60,
            verified: false,
            services: {
                create: [
                    {
                        title: 'Sales',
                        description: 'Professional Sales',
                        category: 'Other',
                        price: 60
                    },
                    {
                        title: 'Account Management',
                        description: 'Professional Account Management',
                        category: 'Other',
                        price: 60
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: 'Dimple',
            email: 'human28@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'Shah Alam, Malaysia',
            hourlyRate: 50,
            verified: false,
            services: {
                create: [
                    {
                        title: 'Verification & confirmation',
                        description: 'Professional Verification & confirmation',
                        category: 'Other',
                        price: 50
                    },
                    {
                        title: 'Research & synthesis',
                        description: 'Professional Research & synthesis',
                        category: 'Other',
                        price: 50
                    }
                ]
            }
        }
    })

    await prisma.user.create({
        data: {
            name: 'Musa Raja',
            email: 'human29@rentahuman.local',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: 'Sihanouville, KH',
            hourlyRate: 50,
            verified: false,
            services: {
                create: [
                    {
                        title: 'Computer master trader',
                        description: 'Professional Computer master trader',
                        category: 'Other',
                        price: 50
                    }
                ]
            }
        }
    })

    console.log('Seeding complete. Added 30 humans.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
