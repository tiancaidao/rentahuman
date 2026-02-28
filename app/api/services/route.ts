import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const sort = searchParams.get('sort'); // top-rated
    const humanId = searchParams.get('humanId');

    try {
        const services = await prisma.service.findMany({
            where: {
                ...(category && { category }),
                ...(humanId && { humanId })
            },
            include: {
                human: {
                    select: {
                        name: true,
                        verified: true,
                        location: true
                    }
                }
            },
            orderBy: sort === 'top-rated' ? { likes: 'desc' } : { createdAt: 'desc' }
        });

        return NextResponse.json(services);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, description, category, price, pricingType, estimatedDuration, imageUrl, humanId } = body;

        if (!humanId) {
            return NextResponse.json({ error: 'Missing humanId' }, { status: 400 });
        }

        const newService = await prisma.service.create({
            data: {
                title,
                description,
                category,
                price: parseFloat(price),
                pricingType: pricingType || "HOURLY",
                estimatedDuration,
                imageUrl,
                humanId
            }
        });

        return NextResponse.json(newService, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
