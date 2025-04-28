"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getCourseraLinks, CourseraCourse } from "@/services/coursera-links";
import { ExternalLink, GraduationCap, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CareerSuggestion } from "@/services/career-predictions"; // Import CareerSuggestion type

export default function GuidancePage() {
  const [courses, setCourses] = useState<CourseraCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [careerSuggestions, setCareerSuggestions] = useState<
    CareerSuggestion[]
  >([]);

  useEffect(() => {
    const suggestionsString = localStorage.getItem("careerSuggestions");
    const initialCareer = localStorage.getItem("selectedCareer");

    if (suggestionsString) {
      try {
        const suggestions = JSON.parse(suggestionsString);
        setCareerSuggestions(suggestions);
        if (!initialCareer && suggestions.length > 0) {
          // If no career selected but suggestions exist, select the first one
          const firstCareer = suggestions[0].career;
          setSelectedCareer(firstCareer);
          localStorage.setItem("selectedCareer", firstCareer); // Save the default selection
        } else {
          setSelectedCareer(initialCareer);
        }
      } catch (e) {
        console.error("Failed to parse career suggestions:", e);
        setError("Could not load career suggestions.");
        setSelectedCareer(initialCareer); // Fallback to potentially existing selection
      }
    } else if (initialCareer) {
      setSelectedCareer(initialCareer); // Use previously selected career if suggestions missing
    } else {
      setError(
        "Please complete the test first to get career suggestions and guidance."
      );
      setLoading(false);
    }
  }, []); // Run only once on mount

  useEffect(() => {
    if (!selectedCareer) return; // Don't fetch if no career is selected

    const fetchCourses = async (careerName: string) => {
      setLoading(true);
      setError(null);
      try {
        // TODO: Replace mock with actual API call
        // const fetchedCourses = await getCourseraLinks(careerName);

        // --- Mocking API ---
        await new Promise((resolve) => setTimeout(resolve, 1000));
        let mockCourses: CourseraCourse[] = [];
        if (careerName === "Software Engineer") {
          mockCourses = [
            {
              title:
                "Google IT Automation with Python Professional Certificate",
              link: "https://www.coursera.org/professional-certificates/google-it-automation",
            },
            {
              title:
                "IBM Full Stack Software Developer Professional Certificate",
              link: "https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer",
            },
            {
              title: "Meta Back-End Developer Professional Certificate",
              link: "https://www.coursera.org/professional-certificates/meta-back-end-developer",
            },
          ];
        } else if (careerName === "UX Designer") {
          mockCourses = [
            {
              title: "Google UX Design Professional Certificate",
              link: "https://www.coursera.org/professional-certificates/google-ux-design",
            },
            {
              title: "CalArts UI/UX Design Specialization",
              link: "https://www.coursera.org/specializations/ui-ux-design",
            },
          ];
        } else {
          mockCourses = [
            { title: `Introduction to ${careerName}`, link: "#" },
            { title: `Advanced ${careerName} Techniques`, link: "#" },
          ];
        }
        const fetchedCourses = mockCourses;
        // --- End Mocking ---

        setCourses(fetchedCourses);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError("Could not load recommended courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses(selectedCareer);
  }, [selectedCareer]); // Re-fetch when selectedCareer changes

  const handleCareerChange = (career: string) => {
    setSelectedCareer(career);
    localStorage.setItem("selectedCareer", career); // Update stored selection
  };

  if (loading && !error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-10 w-1/4" />
        </div>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="shadow-md">
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-24" />
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

  if (!selectedCareer) {
    return (
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>No Career Selected</AlertTitle>
        <AlertDescription>
          Please complete the personality test first to get career guidance.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-center sm:text-left">
          Guidance for {selectedCareer}
        </h1>
        {careerSuggestions.length > 0 && (
          <Select onValueChange={handleCareerChange} value={selectedCareer}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Change Career" />
            </SelectTrigger>
            <SelectContent>
              {careerSuggestions.map((suggestion) => (
                <SelectItem key={suggestion.career} value={suggestion.career}>
                  {suggestion.career}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {courses.length === 0 && !loading && (
        <Alert>
          <GraduationCap className="h-4 w-4" />
          <AlertTitle>No Courses Found</AlertTitle>
          <AlertDescription>
            We couldn&apos;t find specific Coursera recommendations for{" "}
            {selectedCareer} at this time. Check back later!
          </AlertDescription>
        </Alert>
      )}

      {courses.map((course, index) => (
        <Card key={index} className="shadow-md overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg">{course.title}</CardTitle>
            {/* Add description if available from API */}
            {/* <CardDescription>Optional short description here...</CardDescription> */}
          </CardHeader>
          <CardContent>
            <Button
              asChild
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10" // Use primary color for outline button
            >
              <a href={course.link} target="_blank" rel="noopener noreferrer">
                View on Coursera
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
