"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ProfileData {
  name: string;
  birthDate: Date | undefined;
  weight: string;
  height: string;
  fitnessLevel: string;
}

interface ProfileStepProps {
  profileData: ProfileData;
  setProfileData: (data: ProfileData) => void;
  errors: {
    name: string;
    birthDate: string;
    weight: string;
    height: string;
    fitnessLevel: string;
  };
  setErrors: (errors: { name: string; birthDate: string; weight: string; height: string; fitnessLevel: string; }) => void;
}

const fitnessLevels = [
  { value: "beginner", label: "Beginner", description: "New to fitness" },
  { value: "intermediate", label: "Intermediate", description: "Some experience" },
  { value: "advanced", label: "Advanced", description: "Very experienced" }
];

export default function ProfileStep({ profileData, setProfileData, errors, setErrors }: ProfileStepProps) {
  const validateField = (field: string, value: string | undefined) => {
    let error = "";
    
    switch (field) {
      case "name":
        if (!value || value.trim() === "") {
          error = "Name is required";
        } else if (value.trim().length < 2) {
          error = "Name must be at least 2 characters";
        }
        break;
      case "birthDate":
        if (!value) {
          error = "Birth date is required";
        } else {
          const today = new Date();
          const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
          const birthDate = new Date(value);
          if (birthDate > eighteenYearsAgo) {
            error = "You must be at least 18 years old";
          }
        }
        break;
      case "weight":
        if (!value) {
          error = "Weight is required";
        } else if (isNaN(Number(value)) || Number(value) <= 0) {
          error = "Please enter a valid weight";
        } else if (Number(value) < 30 || Number(value) > 300) {
          error = "Weight must be between 30 and 300 kg";
        }
        break;
      case "height":
        if (!value) {
          error = "Height is required";
        } else if (isNaN(Number(value)) || Number(value) <= 0) {
          error = "Please enter a valid height";
        } else if (Number(value) < 100 || Number(value) > 250) {
          error = "Height must be between 100 and 250 cm";
        }
        break;
      case "fitnessLevel":
        if (!value) {
          error = "Fitness level is required";
        }
        break;
    }
    
    setErrors({ ...errors, [field]: error });
    return error === "";
  };

  const handleBlur = (field: string, value: string | undefined) => {
    validateField(field, value);
  };

  return (
      <div className="space-y-6 w-full">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            onBlur={(e) => handleBlur("name", e.target.value)}
            placeholder="Enter your full name"
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <div>
          <Label htmlFor="birthDate">Birth Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !profileData.birthDate && "text-muted-foreground",
                  errors.birthDate && "border-red-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {profileData.birthDate ? format(profileData.birthDate, "PPP") : "Select your birth date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={profileData.birthDate}
                onSelect={(date) => setProfileData({ ...profileData, birthDate: date })}
                disabled={(date) => {
                  const today = new Date();
                  const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
                  return date > eighteenYearsAgo || date > today;
                }}
                defaultMonth={new Date(new Date().getFullYear() - 18, new Date().getMonth(), 1)}
                captionLayout="dropdown"
                fromYear={1900}
                toYear={new Date().getFullYear() - 18}
                formatters={{
                  formatMonthDropdown: (date) =>
                    date.toLocaleString("default", { month: "long" }),
                  formatYearDropdown: (date) => date.getFullYear().toString(),
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.birthDate && (
            <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>
          )}
        </div>
        <div>
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            value={profileData.weight}
            onChange={(e) => setProfileData({ ...profileData, weight: e.target.value })}
            onBlur={(e) => handleBlur("weight", e.target.value)}
            placeholder="70"
            className={errors.weight ? "border-red-500" : ""}
          />
          {errors.weight && (
            <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
          )}
        </div>
        <div>
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            value={profileData.height}
            onChange={(e) => setProfileData({ ...profileData, height: e.target.value })}
            onBlur={(e) => handleBlur("height", e.target.value)}
            placeholder="175"
            className={errors.height ? "border-red-500" : ""}
          />
          {errors.height && (
            <p className="text-red-500 text-sm mt-1">{errors.height}</p>
          )}
        </div>
      </div>

        <div className="w-full">
          <Label>Fitness Level</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 w-full">
            {fitnessLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => {
                  setProfileData({ ...profileData, fitnessLevel: level.value });
                  handleBlur("fitnessLevel", level.value);
                }}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-300 w-full bg-white ${
                  profileData.fitnessLevel === level.value
                    ? 'border-primary'
                    : 'border-gray-200 hover:border-primary/50'
                } ${errors.fitnessLevel ? 'border-red-500' : ''}`}
              >
                <div className="font-medium">{level.label}</div>
                <div className="text-sm text-gray-600">{level.description}</div>
              </button>
            ))}
          </div>
          {errors.fitnessLevel && (
            <p className="text-red-500 text-sm mt-2">{errors.fitnessLevel}</p>
          )}
        </div>
    </div>
  );
}
