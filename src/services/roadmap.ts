/**
 * Represents a roadmap step with a description and completion status.
 */
export interface RoadmapStep {
  /**
   * The description of the roadmap step.
   */
  description: string;
  /**
   * Whether the roadmap step is completed.
   */
  completed: boolean;
}

/**
 * Asynchronously retrieves a roadmap for a given career.
 *
 * @param career The career for which to retrieve the roadmap.
 * @returns A promise that resolves to an array of RoadmapStep objects.
 */
export async function getRoadmap(career: string): Promise<RoadmapStep[]> {
  // TODO: Implement this by calling an API.
  return [
    {
      description: "Learn the basics of programming.",
      completed: false,
    },
    {
      description: "Build a portfolio project.",
      completed: false,
    },
  ];
}
