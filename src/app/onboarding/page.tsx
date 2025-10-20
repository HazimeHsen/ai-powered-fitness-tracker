"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check, ChevronLeft } from "lucide-react";
import { PageLoader, Spinner } from "@/components/ui/spinner";
import ProfileStep from "./components/ProfileStep";
import GoalsStep from "./components/GoalsStep";
import EquipmentStep from "./components/EquipmentStep";

export default function OnboardingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    name: session?.user?.name || "",
    birthDate: undefined as Date | undefined,
    weight: "",
    height: "",
    fitnessLevel: ""
  });

  const [profileErrors, setProfileErrors] = useState({
    name: "",
    birthDate: "",
    weight: "",
    height: "",
    fitnessLevel: ""
  });

  const [goalsData, setGoalsData] = useState({
    primaryGoal: "",
    secondaryGoals: [] as string[]
  });

  const [equipmentData, setEquipmentData] = useState({
    homeGym: false,
    gymAccess: false,
    equipment: [] as string[]
  });

  const [equipmentErrors, setEquipmentErrors] = useState({
    workoutLocation: "",
    equipment: ""
  });

  if (status === "loading") {
    return <PageLoader />;
  }

  if (!session) {
    router.push("/signin");
    return null;
  }

  const steps = [
    { number: 1, title: "Profile", description: "Tell us about yourself" },
    { number: 2, title: "Goals", description: "What do you want to achieve?" },
    { number: 3, title: "Equipment", description: "What do you have access to?" }
  ];


  const validateStep = (step: number) => {
    let isValid = true;
    
    if (step === 1) {
      // Validate profile step
      const errors = { name: "", birthDate: "", weight: "", height: "", fitnessLevel: "" };
      
      if (!profileData.name || profileData.name.trim() === "") {
        errors.name = "Name is required";
        isValid = false;
      } else if (profileData.name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters";
        isValid = false;
      }
      
      if (!profileData.birthDate) {
        errors.birthDate = "Birth date is required";
        isValid = false;
      } else {
        const today = new Date();
        const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        if (profileData.birthDate > eighteenYearsAgo) {
          errors.birthDate = "You must be at least 18 years old";
          isValid = false;
        }
      }
      
      if (!profileData.weight) {
        errors.weight = "Weight is required";
        isValid = false;
      } else if (isNaN(Number(profileData.weight)) || Number(profileData.weight) <= 0) {
        errors.weight = "Please enter a valid weight";
        isValid = false;
      } else if (Number(profileData.weight) < 30 || Number(profileData.weight) > 300) {
        errors.weight = "Weight must be between 30 and 300 kg";
        isValid = false;
      }
      
      if (!profileData.height) {
        errors.height = "Height is required";
        isValid = false;
      } else if (isNaN(Number(profileData.height)) || Number(profileData.height) <= 0) {
        errors.height = "Please enter a valid height";
        isValid = false;
      } else if (Number(profileData.height) < 100 || Number(profileData.height) > 250) {
        errors.height = "Height must be between 100 and 250 cm";
        isValid = false;
      }
      
      if (!profileData.fitnessLevel) {
        errors.fitnessLevel = "Fitness level is required";
        isValid = false;
      }
      
      setProfileErrors(errors);
    }
    
    if (step === 3) {
      // Validate equipment step
      const errors = { workoutLocation: "", equipment: "" };
      
      if (!equipmentData.homeGym && !equipmentData.gymAccess) {
        errors.workoutLocation = "Please select where you work out";
        isValid = false;
      }
      
      if (equipmentData.equipment.length === 0) {
        errors.equipment = "Please select at least one piece of equipment";
        isValid = false;
      }
      
      setEquipmentErrors(errors);
    }
    
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        handleComplete();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/onboarding/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profile: profileData,
          goals: goalsData,
          equipment: equipmentData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save onboarding data");
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Error completing onboarding:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden flex items-center justify-center py-8">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
      </div>
      
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
              Welcome to FitAI
            </h1>
            <p className="text-gray-600 mt-2 text-base sm:text-lg">Let&apos;s set up your fitness journey</p>
          </div>

            <div className="flex justify-center mb-8">
              <div className="flex items-center w-full max-w-md">
                {steps.map((step, index) => (
                  <div key={step.number} className={`flex items-center ${steps.length === step.number ? 'flex-1' : 'flex-grow'}`}>
                    <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 transition-all duration-300 ${
                      currentStep >= step.number
                        ? 'bg-primary border-primary text-white shadow-lg'
                        : 'border-gray-300 text-gray-500 bg-white'
                    }`}>
                      {currentStep > step.number ? (
                        <Check className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                      ) : (
                        <span className="text-xs sm:text-sm font-bold">{step.number}</span>
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-1 rounded-full transition-all duration-300 mx-2 sm:mx-4 ${
                        currentStep > step.number ? 'bg-primary' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

        <div className="p-4 sm:p-6 md:p-8">
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-4 mb-2">
              {currentStep > 1 && (
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  className="h-8 w-8 rounded-full sm:h-10 sm:w-10 p-0 hover:bg-gray-100 hover:text-gray-900 flex-shrink-0"
                >
                  <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              )}
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {steps[currentStep - 1].title}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-600">{steps[currentStep - 1].description}</p>
          </div>

          <div className="space-y-4 sm:space-y-6">
          {currentStep === 1 && (
            <ProfileStep 
              profileData={profileData} 
              setProfileData={setProfileData}
              errors={profileErrors}
              setErrors={setProfileErrors}
            />
          )}

            {currentStep === 2 && (
              <GoalsStep 
                goalsData={goalsData} 
                setGoalsData={setGoalsData} 
              />
            )}

            {currentStep === 3 && (
              <EquipmentStep 
                equipmentData={equipmentData} 
                setEquipmentData={setEquipmentData}
                errors={equipmentErrors}
                setErrors={setEquipmentErrors}
              />
            )}
          </div>

          <div className="mt-6 sm:mt-8">
            <Button
              onClick={handleNext}
              disabled={loading}
              className="w-full h-10 sm:h-11 rounded-full"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <Spinner size="sm" color="text-white" />
                  <span className="text-sm sm:text-base">Setting up...</span>
                </div>
              ) : (
                <span className="text-sm sm:text-base">{currentStep === 3 ? 'Complete' : 'Continue'}</span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}