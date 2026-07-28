import {
  AndesAssistant,
  Categories,
  FeaturedPlaces,
  Hero,
  RecommendedRoutes,
  UpcomingEvents,
} from "../components/home";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedPlaces />
      <UpcomingEvents />
      <RecommendedRoutes />
      <AndesAssistant />
    </>
  );
}