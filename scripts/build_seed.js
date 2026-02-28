const fs = require('fs');

const humans = JSON.parse(fs.readFileSync('crawled_humans.json', 'utf8'));

let seedCode = `const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database with crawled real humans...')

    // Clean existing users to avoid unique constraint errors if we run multiple times
    await prisma.service.deleteMany()
    await prisma.bounty.deleteMany()
    await prisma.user.deleteMany()

`;

humans.forEach((h, i) => {
    const safeName = h.name.replace(/'/g, "\\'");
    const safeLoc = h.location.replace(/'/g, "\\'");
    const safeEmail = `human${i}@rentahuman.local`;

    // We will assign a random 'verified' status to emulate the site
    const isVerified = Math.random() > 0.5;

    let servicesCode = ``;
    if (h.skills && h.skills.length > 0) {
        servicesCode = `
            services: {
                create: [
${h.skills.map(s => `                    {
                        title: '${s.replace(/'/g, "\\'")}',
                        description: 'Professional ${s.replace(/'/g, "\\'")}',
                        category: 'Other',
                        price: ${h.rate}
                    }`).join(',\n')}
                ]
            }`;
    }

    seedCode += `
    await prisma.user.create({
        data: {
            name: '${safeName}',
            email: '${safeEmail}',
            role: 'HUMAN',
            bio: 'Crawled human from rentahuman.ai',
            location: '${safeLoc}',
            hourlyRate: ${h.rate},
            verified: ${isVerified}${servicesCode ? ',' + servicesCode : ''}
        }
    })
`;
});

seedCode += `
    console.log('Seeding complete. Added ${humans.length} humans.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
`;

fs.writeFileSync('prisma/seed.js', seedCode);
console.log("Generated prisma/seed.js with crawled data.");
