import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const location = searchParams.get('location');

    try {
        const humans = await prisma.user.findMany({
            where: {
                role: 'HUMAN',
                ...(q && {
                    OR: [
                        { name: { contains: q } },
                        { bio: { contains: q } }
                    ]
                }),
                ...(location && {
                    location: { contains: location }
                })
            },
            include: {
                services: true
            }
        });

        return NextResponse.json(humans);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
