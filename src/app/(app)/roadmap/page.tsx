"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getRoadmap, RoadmapStep } from "@/services/roadmap";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils"; // Import the cn function

interface RoadmapGroup {
  level: "Beginner" | "Intermediate" | "Advanced";
  steps: RoadmapStep[];
}

// Helper to group steps - adapt this logic based on actual data structure from API
const groupRoadmapSteps = (steps: RoadmapStep[]): RoadmapGroup[] => {
  // Simple grouping logic: first third beginner, next third intermediate, last third advanced
  const totalSteps = steps.length;
  const third = Math.ceil(totalSteps / 3);

  return [
    { level: "Beginner", steps: steps.slice(0, third) },
    { level: "Intermediate", steps: steps.slice(third, 2 * third) },
    { level: "Advanced", steps: steps.slice(2 * third) },
  ].filter((group) => group.steps.length > 0);
};

export default function RoadmapPage() {
  const [roadmapGroups, setRoadmapGroups] = useState<RoadmapGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({}); // Store checked state by description

  useEffect(() => {
    const career = localStorage.getItem("selectedCareer");
    if (!career) {
      setError("Please complete the test or select a career first.");
      setLoading(false);
      return;
    }
    setSelectedCareer(career);

    const fetchRoadmapData = async (careerName: string) => {
      setLoading(true);
      setError(null);
      try {
        // Load checked state from localStorage for this career
        const savedCheckedState = JSON.parse(
          localStorage.getItem(`roadmap_${careerName}_checked`) || "{}"
        );
        setCheckedState(savedCheckedState);

        // TODO: Replace mock with actual API call
        // const steps = await getRoadmap(careerName);
        // --- Mocking API ---
        await new Promise((resolve) => setTimeout(resolve, 1000));
        let mockSteps: RoadmapStep[] = [];
        if (careerName === "Software Engineer") {
          mockSteps = [
            { description: "Learn Git and version control.", completed: false },
            {
              description: "Master HTML, CSS, and JavaScript.",
              completed: false,
            },
            {
              description: "Choose a frontend framework (React, Vue, Angular).",
              completed: false,
            },
            {
              description: "Learn a backend language (Python, Node.js, Java).",
              completed: false,
            },
            {
              description: "Understand databases (SQL, NoSQL).",
              completed: false,
            },
            {
              description: "Build a full-stack portfolio project.",
              completed: false,
            },
            { description: "Learn about APIs and REST.", completed: false },
            {
              description: "Explore cloud platforms (AWS, Azure, GCP).",
              completed: false,
            },
            {
              description: "Contribute to open-source projects.",
              completed: false,
            },
          ];
        } else if (careerName === "UX Designer") {
          mockSteps = [
            {
              description: "Understand UX principles and design thinking.",
              completed: false,
            },
            {
              description:
                "Learn wireframing and prototyping tools (Figma, Sketch).",
              completed: false,
            },
            {
              description: "Study user research methodologies.",
              completed: false,
            },
            {
              description: "Build a portfolio showcasing UX projects.",
              completed: false,
            },
            { description: "Learn about usability testing.", completed: false },
            {
              description: "Master interaction design principles.",
              completed: false,
            },
          ];
        } else {
          mockSteps = [
            {
              description: `Learn foundational skills for ${careerName}.`,
              completed: false,
            },
            {
              description: `Practice intermediate techniques in ${careerName}.`,
              completed: false,
            },
            {
              description: `Develop advanced expertise in ${careerName}.`,
              completed: false,
            },
          ];
        }
        const steps = mockSteps;
        // --- End Mocking ---

        const grouped = groupRoadmapSteps(steps);
        setRoadmapGroups(grouped);
      } catch (err) {
        console.error("Failed to fetch roadmap:", err);
        setError("Could not load the roadmap. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmapData(career);
  }, []); // Re-fetch if selectedCareer changes (though currently only set once)

  const handleCheckboxChange = (
    description: string,
    checked: boolean | "indeterminate"
  ) => {
    if (typeof checked === "boolean" && selectedCareer) {
      const newCheckedState = { ...checkedState, [description]: checked };
      setCheckedState(newCheckedState);
      // Save to localStorage, associated with the current career
      localStorage.setItem(
        `roadmap_${selectedCareer}_checked`,
        JSON.stringify(newCheckedState)
      );
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-1/2 mb-4" />
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-1/4" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((j) => (
                <div key={j} className="flex items-center space-x-3">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!selectedCareer || roadmapGroups.length === 0) {
    return (
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>No Roadmap Available</AlertTitle>
        <AlertDescription>
          {selectedCareer
            ? `No roadmap data found for ${selectedCareer}.`
            : "Please complete the personality test first to see a career roadmap."}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Your Roadmap for {selectedCareer}
      </h1>
      {roadmapGroups.map((group) => (
        <Card key={group.level} className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-primary">
              {group.level} Level
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {group.steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Checkbox
                  id={`step-${group.level}-${index}`}
                  checked={checkedState[step.description] || false}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(step.description, checked)
                  }
                  className="mt-1 border-primary data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500" // Use green for checked state
                />
                <label
                  htmlFor={`step-${group.level}-${index}`}
                  className={cn(
                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                    checkedState[step.description]
                      ? "line-through text-muted-foreground"
                      : ""
                  )}
                >
                  {step.description}
                </label>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
