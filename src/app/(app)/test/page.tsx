"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { questions, answerOptions, Question } from "./questions";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import {
  getCareerSuggestions,
  CareerSuggestion,
} from "@/services/career-predictions";
import type { FC } from "react";

// Dynamically create the Zod schema based on questions
const generateSchema = () => {
  const schemaFields: Record<string, z.ZodString> = {};
  questions.forEach((q) => {
    schemaFields[`q${q.id}`] = z.string({
      required_error: "Please select an option.",
    });
  });
  return z.object(schemaFields);
};

const testSchema = generateSchema();
type TestFormValues = z.infer<typeof testSchema>;

interface QuestionCardProps {
  question: Question;
  control: any; // react-hook-form control
  currentQuestionIndex: number;
  totalQuestions: number;
}

const QuestionCard: FC<QuestionCardProps> = ({
  question,
  control,
  currentQuestionIndex,
  totalQuestions,
}) => {
  return (
    <Card className="w-full max-w-lg shadow-lg transition-all duration-300 ease-in-out">
      <CardHeader>
        <Progress
          value={((currentQuestionIndex + 1) / totalQuestions) * 100}
          className="w-full mb-4 h-2"
        />
        <CardTitle className="text-lg font-semibold">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </CardTitle>
        <CardDescription className="pt-2 text-base">
          {question.text}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={control}
          name={`q${question.id}`}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  {answerOptions.map((option) => (
                    <FormItem
                      key={option.value}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem
                          value={option.value}
                          id={`q${question.id}-${option.value}`}
                        />
                      </FormControl>
                      <Label
                        htmlFor={`q${question.id}-${option.value}`}
                        className="font-normal cursor-pointer"
                      >
                        {option.label}
                      </Label>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default function TestPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TestFormValues>({
    resolver: zodResolver(testSchema),
    mode: "onChange", // Validate on change to enable/disable next button smartly
  });

  // Check if the current question has been answered
  const isCurrentQuestionAnswered = !!form.watch(
    `q${questions[currentQuestionIndex].id}`
  );

  const calculateScores = (answers: TestFormValues) => {
    const scores = { O: 0, C: 0, E: 0, A: 0, N: 0 };
    let counts = { O: 0, C: 0, E: 0, A: 0, N: 0 };

    questions.forEach((q) => {
      const answerValue = parseInt(answers[`q${q.id}`] || "3"); // Default to neutral if missing
      let score = q.reverseScore ? 6 - answerValue : answerValue;
      scores[q.category] += score;
      counts[q.category]++;
    });

    // Normalize or scale scores if needed, e.g., average score per category
    const normalizedScores = {
      Openness: scores.O / counts.O,
      Conscientiousness: scores.C / counts.C,
      Extraversion: scores.E / counts.E,
      Agreeableness: scores.A / counts.A,
      Neuroticism: scores.N / counts.N,
    };
    // Round to reasonable precision if needed
    Object.keys(normalizedScores).forEach((key) => {
      normalizedScores[key as keyof typeof normalizedScores] = parseFloat(
        normalizedScores[key as keyof typeof normalizedScores].toFixed(2)
      );
    });

    console.log("Calculated OCEAN Scores:", normalizedScores);
    return normalizedScores;
  };

  const handleNext = async () => {
    // Trigger validation for the current question field
    const isValid = await form.trigger(
      `q${questions[currentQuestionIndex].id}`
    );

    if (isValid) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    } else {
      toast({
        title: "Incomplete",
        description: "Please select an answer before proceeding.",
        variant: "destructive",
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const onSubmit = async (values: TestFormValues) => {
    console.log("Test submitted:", values);
    setIsLoading(true);
    try {
      const scores = calculateScores(values);
      // TODO: Send 'scores' to your backend API '/predict-career'
      // const suggestions = await getCareerSuggestions(scores); // Uncomment when API is ready

      // --- Mocking API response ---
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const mockSuggestions: CareerSuggestion[] = [
        {
          career: "Software Engineer",
          description: "Designs, develops, and maintains software systems.",
        },
        {
          career: "UX Designer",
          description: "Focuses on user experience and interaction design.",
        },
        {
          career: "Data Analyst",
          description: "Interprets data to provide actionable insights.",
        },
      ];
      const suggestions = mockSuggestions;
      // --- End Mocking ---

      console.log("Career Suggestions:", suggestions);
      // Store suggestions and navigate to results or relevant page (e.g., roadmap or guidance)
      // For now, store in local storage and redirect to guidance page
      localStorage.setItem("careerSuggestions", JSON.stringify(suggestions));
      localStorage.setItem("selectedCareer", suggestions[0]?.career || ""); // Select the first suggestion by default

      toast({
        title: "Test Complete!",
        description: "Calculating your results...",
      });
      router.push("/guidance"); // Redirect to guidance to show Coursera links for the top career
    } catch (error) {
      console.error("Error submitting test:", error);
      toast({
        title: "Submission Error",
        description: "Could not submit test results. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-lg"
        >
          <QuestionCard
            question={questions[currentQuestionIndex]}
            control={form.control}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
          />

          <CardFooter className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0 || isLoading}
            >
              Previous
            </Button>
            {currentQuestionIndex < questions.length - 1 ? (
              <Button
                type="button"
                onClick={handleNext}
                disabled={!isCurrentQuestionAnswered || isLoading}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={
                  !isCurrentQuestionAnswered ||
                  isLoading ||
                  !form.formState.isValid
                } // Ensure last question is answered & form valid
              >
                {isLoading ? "Submitting..." : "Finish Test"}
              </Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </div>
  );
}
