import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { profile, goals, equipment } = await request.json();

        // Update user profile completion status
        await prisma.user.update({
          where: { id: session.user.id },
          data: {
            profileCompleted: true,
            name: profile.name,
            birthDate: profile.birthDate,
            heightCm: profile.height ? parseInt(profile.height) : null,
            weightKg: profile.weight ? parseFloat(profile.weight) : null,
            fitnessLevel: profile.fitnessLevel,
            primaryGoal: goals.primaryGoal,
            secondaryGoals: JSON.stringify(goals.secondaryGoals),
            equipment: JSON.stringify(equipment.equipment),
          },
        });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error completing onboarding:", error);
    return NextResponse.json(
      { error: "Failed to complete onboarding" },
      { status: 500 }
    );
  }
}
