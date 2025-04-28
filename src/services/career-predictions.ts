/**
 * Represents a career suggestion.
 */
export interface CareerSuggestion {
  /**
   * The name of the suggested career.
   */
  career: string;

  /**
   * A brief description of the career.
   */
  description: string;
}

/**
 * Asynchronously retrieves career suggestions based on OCEAN personality scores.
 *
 * @param scores An object containing the OCEAN personality scores (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism).
 * @returns A promise that resolves to an array of CareerSuggestion objects.
 */
export async function getCareerSuggestions(scores: {
  Openness: number;
  Conscientiousness: number;
  Extraversion: number;
  Agreeableness: number;
  Neuroticism: number;
}): Promise<CareerSuggestion[]> {
  // TODO: Implement this by calling an API.
  return [
    {
      career: "Software Engineer",
      description: "Develops software applications.",
    },
    {
      career: "Data Scientist",
      description: "Analyzes data to extract insights.",
    },
  ];
}
