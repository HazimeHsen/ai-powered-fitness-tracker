"use client";

import { Label } from "@/components/ui/label";

interface EquipmentData {
  homeGym: boolean;
  gymAccess: boolean;
  equipment: string[];
}

interface EquipmentStepProps {
  equipmentData: EquipmentData;
  setEquipmentData: (data: EquipmentData) => void;
  errors: {
    workoutLocation?: string;
    equipment?: string;
  };
  setErrors: (errors: any) => void;
}

const equipmentOptions = [
  { value: "dumbbells", label: "Dumbbells" },
  { value: "barbell", label: "Barbell" },
  { value: "kettlebell", label: "Kettlebell" },
  { value: "resistance_bands", label: "Resistance Bands" },
  { value: "pull_up_bar", label: "Pull-up Bar" },
  { value: "yoga_mat", label: "Yoga Mat" },
  { value: "cardio_machine", label: "Cardio Machine" },
  { value: "none", label: "No Equipment" }
];

export default function EquipmentStep({ equipmentData, setEquipmentData, errors, setErrors }: EquipmentStepProps) {
  const toggleEquipment = (equipment: string) => {
    setEquipmentData({
      ...equipmentData,
      equipment: equipmentData.equipment.includes(equipment)
        ? equipmentData.equipment.filter(e => e !== equipment)
        : [...equipmentData.equipment, equipment]
    });
    
    // Clear equipment error when user selects something
    if (equipmentData.equipment.length === 0) {
      setErrors({ ...errors, equipment: "" });
    }
  };

  const handleWorkoutLocationChange = (homeGym: boolean, gymAccess: boolean) => {
    setEquipmentData({
      ...equipmentData,
      homeGym,
      gymAccess
    });
    
    // Clear workout location error when user selects something
    setErrors({ ...errors, workoutLocation: "" });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>Where do you work out?</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          <button
            onClick={() => handleWorkoutLocationChange(true, false)}
            className={`p-4 rounded-xl border-2 text-left transition-all duration-300 bg-white ${
              equipmentData.homeGym
                ? 'border-primary'
                : 'border-gray-200 hover:border-primary/50'
            } ${errors.workoutLocation ? 'border-red-500' : ''}`}
          >
            <div className="font-medium">Home Gym</div>
            <div className="text-sm text-gray-600">I have equipment at home</div>
          </button>
          <button
            onClick={() => handleWorkoutLocationChange(false, true)}
            className={`p-4 rounded-xl border-2 text-left transition-all duration-300 bg-white ${
              equipmentData.gymAccess
                ? 'border-primary'
                : 'border-gray-200 hover:border-primary/50'
            } ${errors.workoutLocation ? 'border-red-500' : ''}`}
          >
            <div className="font-medium">Gym Access</div>
            <div className="text-sm text-gray-600">I go to a gym</div>
          </button>
        </div>
        {errors.workoutLocation && (
          <p className="text-red-500 text-sm mt-2">{errors.workoutLocation}</p>
        )}
      </div>

      <div>
        <Label>Available Equipment</Label>
        <div className="flex items-center flex-wrap gap-2 sm:gap-3 mt-2">
          {equipmentOptions.map((equipment) => (
            <button
              key={equipment.value}
              onClick={() => toggleEquipment(equipment.value)}
              className={`py-2 px-3 sm:px-4 rounded-full border-2 text-center transition-all duration-300 bg-white ${
                equipmentData.equipment.includes(equipment.value)
                  ? 'border-primary'
                  : 'border-gray-200 hover:border-primary/50'
              } ${errors.equipment ? 'border-red-500' : ''}`}
            >
              <div className="text-xs sm:text-sm font-semibold">{equipment.label}</div>
            </button>
          ))}
        </div>
        {errors.equipment && (
          <p className="text-red-500 text-sm mt-2">{errors.equipment}</p>
        )}
      </div>
    </div>
  );
}
