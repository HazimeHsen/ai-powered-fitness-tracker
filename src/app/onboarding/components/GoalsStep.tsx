"use client";

import { Label } from "@/components/ui/label";
import { Dumbbell, Target, Heart, Zap, Shield } from "lucide-react";

interface GoalsData {
  primaryGoal: string;
  secondaryGoals: string[];
}

interface GoalsStepProps {
  goalsData: GoalsData;
  setGoalsData: (data: GoalsData) => void;
}

const primaryGoals = [
  { value: "weight_loss", label: "Weight Loss", icon: Target, color: "bg-red-100 text-red-800" },
  { value: "muscle_gain", label: "Muscle Gain", icon: Dumbbell, color: "bg-blue-100 text-blue-800" },
  { value: "endurance", label: "Endurance", icon: Heart, color: "bg-green-100 text-green-800" },
  { value: "strength", label: "Strength", icon: Zap, color: "bg-yellow-100 text-yellow-800" },
  { value: "general_fitness", label: "General Fitness", icon: Shield, color: "bg-purple-100 text-purple-800" }
];

const secondaryGoals = [
  "Improve flexibility",
  "Build core strength", 
  "Increase energy",
  "Better sleep",
  "Stress relief",
  "Sports performance"
];

export default function GoalsStep({ goalsData, setGoalsData }: GoalsStepProps) {
  const toggleSecondaryGoal = (goal: string) => {
    setGoalsData({
      ...goalsData,
      secondaryGoals: goalsData.secondaryGoals.includes(goal)
        ? goalsData.secondaryGoals.filter(g => g !== goal)
        : [...goalsData.secondaryGoals, goal]
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>Primary Goal</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          {primaryGoals.map((goal) => {
            const Icon = goal.icon;
            return (
              <button
                key={goal.value}
                onClick={() => setGoalsData({ ...goalsData, primaryGoal: goal.value })}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-300 bg-white ${
                  goalsData.primaryGoal === goal.value
                    ? 'border-primary'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${goal.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="font-medium">{goal.label}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <Label>Secondary Goals (Optional)</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {secondaryGoals.map((goal) => (
            <button
              key={goal}
              onClick={() => toggleSecondaryGoal(goal)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                goalsData.secondaryGoals.includes(goal)
                  ? 'bg-primary border border-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-primary/10 border border-gray-200'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
