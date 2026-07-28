import {
  Categories,
  FeaturedPlaces,
  Hero,
  UpcomingEvents,
} from "../components/home";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedPlaces />
      <UpcomingEvents />
    </>
  );
}