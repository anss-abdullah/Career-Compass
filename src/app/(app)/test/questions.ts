// Example OCEAN questions (replace with the full 50 questions)
// Categories: O=Openness, C=Conscientiousness, E=Extraversion, A=Agreeableness, N=Neuroticism
// Scoring: Strongly Disagree (1), Disagree (2), Neutral (3), Agree (4), Strongly Agree (5)
// Some questions might need reverse scoring (marked with R).

export interface Question {
  id: number;
  text: string;
  category: "O" | "C" | "E" | "A" | "N";
  reverseScore?: boolean;
}

export const questions: Question[] = [
  // Openness
  { id: 1, text: "I have a rich vocabulary.", category: "O" },
  {
    id: 2,
    text: "I have difficulty understanding abstract ideas.",
    category: "O",
    reverseScore: true,
  },
  { id: 3, text: "I have a vivid imagination.", category: "O" },
  {
    id: 4,
    text: "I am not interested in abstract ideas.",
    category: "O",
    reverseScore: true,
  },
  { id: 5, text: "I have excellent ideas.", category: "O" },
  {
    id: 6,
    text: "I do not have a good imagination.",
    category: "O",
    reverseScore: true,
  },
  { id: 7, text: "I am quick to understand things.", category: "O" },
  { id: 8, text: "I use difficult words.", category: "O" },
  { id: 9, text: "I spend time reflecting on things.", category: "O" },
  { id: 10, text: "I am full of ideas.", category: "O" },

  // Conscientiousness
  { id: 11, text: "I am always prepared.", category: "C" },
  {
    id: 12,
    text: "I leave my belongings around.",
    category: "C",
    reverseScore: true,
  },
  { id: 13, text: "I pay attention to details.", category: "C" },
  {
    id: 14,
    text: "I make a mess of things.",
    category: "C",
    reverseScore: true,
  },
  { id: 15, text: "I get chores done right away.", category: "C" },
  {
    id: 16,
    text: "I often forget to put things back in their proper place.",
    category: "C",
    reverseScore: true,
  },
  { id: 17, text: "I like order.", category: "C" },
  { id: 18, text: "I shirk my duties.", category: "C", reverseScore: true },
  { id: 19, text: "I follow a schedule.", category: "C" },
  { id: 20, text: "I am exacting in my work.", category: "C" },

  // Extraversion
  { id: 21, text: "I am the life of the party.", category: "E" },
  { id: 22, text: "I don't talk a lot.", category: "E", reverseScore: true },
  { id: 23, text: "I feel comfortable around people.", category: "E" },
  {
    id: 24,
    text: "I keep in the background.",
    category: "E",
    reverseScore: true,
  },
  { id: 25, text: "I start conversations.", category: "E" },
  { id: 26, text: "I have little to say.", category: "E", reverseScore: true },
  {
    id: 27,
    text: "I talk to a lot of different people at parties.",
    category: "E",
  },
  {
    id: 28,
    text: "I don't like to draw attention to myself.",
    category: "E",
    reverseScore: true,
  },
  {
    id: 29,
    text: "I don't mind being the center of attention.",
    category: "E",
  },
  {
    id: 30,
    text: "I am quiet around strangers.",
    category: "E",
    reverseScore: true,
  },

  // Agreeableness
  { id: 31, text: "I am interested in people.", category: "A" },
  { id: 32, text: "I insult people.", category: "A", reverseScore: true },
  { id: 33, text: "I sympathize with others' feelings.", category: "A" },
  {
    id: 34,
    text: "I am not interested in other people's problems.",
    category: "A",
    reverseScore: true,
  },
  { id: 35, text: "I have a soft heart.", category: "A" },
  {
    id: 36,
    text: "I am not really interested in others.",
    category: "A",
    reverseScore: true,
  },
  { id: 37, text: "I take time out for others.", category: "A" },
  { id: 38, text: "I feel others' emotions.", category: "A" },
  { id: 39, text: "I make people feel at ease.", category: "A" },
  {
    id: 40,
    text: "I am not interested in abstract ideas.",
    category: "A",
    reverseScore: true,
  }, // Note: Q40 appears twice in standard lists, adjust if needed. Reused Q4 here.

  // Neuroticism
  { id: 41, text: "I get stressed out easily.", category: "N" },
  {
    id: 42,
    text: "I am relaxed most of the time.",
    category: "N",
    reverseScore: true,
  },
  { id: 43, text: "I worry about things.", category: "N" },
  { id: 44, text: "I seldom feel blue.", category: "N", reverseScore: true },
  { id: 45, text: "I am easily disturbed.", category: "N" },
  { id: 46, text: "I get upset easily.", category: "N" },
  { id: 47, text: "I change my mood a lot.", category: "N" },
  { id: 48, text: "I have frequent mood swings.", category: "N" },
  { id: 49, text: "I get irritated easily.", category: "N" },
  { id: 50, text: "I often feel blue.", category: "N" },
];

export const answerOptions = [
  { value: "1", label: "Strongly Disagree" },
  { value: "2", label: "Disagree" },
  { value: "3", label: "Neutral" },
  { value: "4", label: "Agree" },
  { value: "5", label: "Strongly Agree" },
];
