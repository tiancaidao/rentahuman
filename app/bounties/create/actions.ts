"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function createBountyAction(formData: FormData) {
    // Basic validation
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const posterId = formData.get('posterId') as string;

    if (!title || !description || !category || !posterId) {
        throw new Error("Missing required fields");
    }

    // Optional strings
    const requirements = formData.get('requirements') as string || null;
    const skillsNeeded = formData.get('skillsNeeded') as string || null;
    const priceType = formData.get('priceType') as string || "FIXED";
    const currency = formData.get('currency') as string || "USD";
    const location = formData.get('location') as string || null;
    const remoteOk = formData.get('remoteOk') === 'on';

    let finalLocation = location;
    if (remoteOk) {
        finalLocation = finalLocation ? `${finalLocation} (Remote Allowed)` : 'Remote';
    }

    // Numbers
    const priceRaw = formData.get('price') as string;
    const price = priceRaw ? parseFloat(priceRaw) : null;

    const estimatedHoursRaw = formData.get('estimatedHours') as string;
    const estimatedHours = estimatedHoursRaw ? parseInt(estimatedHoursRaw, 10) : null;

    const spotsRaw = formData.get('spots') as string;
    const spots = spotsRaw ? parseInt(spotsRaw, 10) : 1;

    // Booleans
    const verifiedOnly = formData.get('verifiedOnly') === 'on';

    // Dates
    const deadlineRaw = formData.get('deadline') as string;
    const dueDate = deadlineRaw ? new Date(deadlineRaw) : null;

    let newBounty;
    try {
        newBounty = await prisma.bounty.create({
            data: {
                title,
                description,
                category,
                posterId,
                requirements,
                skillsNeeded,
                price,
                priceType,
                currency,
                estimatedHours,
                spots,
                dueDate,
                location: finalLocation,
                verifiedOnly,
                status: "OPEN"
            }
        });
    } catch (error) {
        console.error("Failed to create bounty:", error);
        throw new Error("Database insertion failed");
    }

    revalidatePath("/bounties");
    redirect(`/bounties/${newBounty.id}`);
}
