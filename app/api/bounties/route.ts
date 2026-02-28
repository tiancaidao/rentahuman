import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status') || 'OPEN';
    const posterId = searchParams.get('posterId');

    try {
        const bounties = await prisma.bounty.findMany({
            where: {
                status,
                ...(category && category !== 'All' && { category }),
                ...(posterId && { posterId })
            },
            include: {
                poster: {
                    select: {
                        name: true,
                        verified: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(bounties);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, description, category, requirements, skillsNeeded, price, priceType, currency, estimatedHours, verifiedOnly, dueDate, spots, location, imageUrl, posterId } = body;

        if (!posterId) {
            return NextResponse.json({ error: 'Missing posterId' }, { status: 400 });
        }

        const newBounty = await prisma.bounty.create({
            data: {
                title,
                description,
                category,
                requirements,
                skillsNeeded,
                price: price ? parseFloat(price) : null,
                priceType: priceType || 'FIXED',
                currency: currency || 'USD',
                estimatedHours: estimatedHours ? parseInt(estimatedHours) : null,
                verifiedOnly: verifiedOnly || false,
                dueDate: dueDate ? new Date(dueDate) : null,
                spots: spots ? parseInt(spots) : 1,
                location,
                imageUrl,
                posterId
            }
        });

        return NextResponse.json(newBounty, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
