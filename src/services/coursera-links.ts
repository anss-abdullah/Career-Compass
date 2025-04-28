/**
 * Represents a Coursera course with a title and link.
 */
export interface CourseraCourse {
  /**
   * The title of the Coursera course.
   */
  title: string;
  /**
   * The URL of the Coursera course.
   */
  link: string;
}

/**
 * Asynchronously retrieves Coursera courses for a given career.
 *
 * @param career The career for which to retrieve Coursera courses.
 * @returns A promise that resolves to an array of CourseraCourse objects.
 */
export async function getCourseraLinks(
  career: string
): Promise<CourseraCourse[]> {
  // TODO: Implement this by calling an API.
  return [
    {
      title: "Introduction to Software Engineering",
      link: "https://www.coursera.org/intro-to-software-engineering",
    },
    {
      title: "Data Science Fundamentals",
      link: "https://www.coursera.org/data-science-fundamentals",
    },
  ];
}
