import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// This endpoint mocks a Model Context Protocol (MCP) server integration.
// Agents can send a POST request calling specific tools like 'search_humans' or 'book_human'
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { tool, parameters } = body;

        switch (tool) {
            case 'search_humans': {
                const { skill, location } = parameters || {};
                const humans = await prisma.user.findMany({
                    where: {
                        role: 'HUMAN',
                        ...(skill && { bio: { contains: skill } }),
                        ...(location && { location: { contains: location } }),
                    },
                    select: { id: true, name: true, location: true, hourlyRate: true, bio: true }
                });
                return NextResponse.json({ result: humans });
            }

            case 'book_human': {
                const { agentId, humanId, description, payout } = parameters || {};
                const task = await prisma.task.create({
                    data: {
                        agentId: agentId || "mock-agent-id", // Mating requirement for auth later
                        humanId,
                        description,
                        payout: Number(payout)
                    }
                });
                return NextResponse.json({ result: task, status: 'Booking created successfully' });
            }

            default:
                return NextResponse.json({ error: `Tool ${tool} not found` }, { status: 404 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error processing MCP request' }, { status: 500 });
    }
}

export async function GET() {
    // Return the MCP schema so agents can discover available tools
    const schema = {
        name: "RentAHuman MCP Server",
        version: "1.0.0",
        description: "Model Context Protocol for booking real-world physical tasks via humans.",
        tools: [
            {
                name: "search_humans",
                description: "Search for available rentable humans by skill or location.",
                parameters: {
                    type: "object",
                    properties: {
                        skill: { type: "string" },
                        location: { type: "string" }
                    }
                }
            },
            {
                name: "book_human",
                description: "Create a bounty/task for a specific human.",
                parameters: {
                    type: "object",
                    properties: {
                        agentId: { type: "string" },
                        humanId: { type: "string", description: "UUID of the human to book" },
                        description: { type: "string" },
                        payout: { type: "number", description: "Bounty payout in USD cents" }
                    },
                    required: ["humanId", "description", "payout"]
                }
            }
        ]
    };

    return NextResponse.json(schema);
}
