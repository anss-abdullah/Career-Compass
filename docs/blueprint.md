# **App Name**: CareerCompass

## Core Features:

- User Authentication Module (Login / Signup): Design a Login/Signup screen with
  input fields for email and password. Authenticate users with API requests to a
  Python backend (Flask or FastAPI). After successful authentication, navigate
  user to the MainPage Activity.
- Home Screen (Main Page with Bottom Navigation): After login, show a MainPage
  Activity with BottomNavigationView. Add three bottom buttons with appropriate
  icons: Career Recommendation (🔍 brain icon), Roadmap (🗺️ path icon), Guidance
  (🎓 mentorship icon). Active button color: Orange. Inactive button color:
  Gray. White background throughout.
- Career Recommendation Module (OCEAN Personality Test): Create a multi-page
  quiz (using `ViewPager2`) that asks 50 OCEAN test questions. After completion,
  calculate scores for: Openness, Conscientiousness, Extraversion,
  Agreeableness, Neuroticism. Send scores to backend (`/predict-career` API) and
  receive career suggestions.
- Guidance Module (Mentorship and Coursera Links): For the selected career,
  fetch Coursera courses using backend (`/coursera-links?career=`). Show a list
  of recommended courses with: Course Title, Link Button (opens Coursera in
  browser). UI should match clean style (white card backgrounds, orange
  highlights).
- Roadmap Module: After user selects a career, show a RoadmapActivity. Display a
  step-by-step list of learning goals: Beginner level, Intermediate level,
  Advanced level. Each step should have a checkbox ✅ to mark it as completed.
  Data for roadmap fetched from backend (`/roadmap?career=`).

## Style Guidelines:

- Neutral background (e.g., light gray or off-white) to reduce distraction
  during the test.
- A calming blue (#3498db) for radio button accents and progress indicators.
- Green (#2ecc71) to highlight selected options and completion states.
- Use a clear and readable font for questions and answer options.
- Clean and spacious layout to avoid overwhelming the user during the test.
- Subtle animations when transitioning between questions.

## Original User Request:

Create a multi-page mobile application in kotlin 1st page. login/signup
authentication 2nd page. user is greeted with a message "build your own future"
in bold and italic font and a button that say " start test" the test comprises
of 50 personality based questions with radio button ranging from strongly
agree-strongly disagree also connect a Database with it that stores the
credentials and answers from user on a specific profile and
