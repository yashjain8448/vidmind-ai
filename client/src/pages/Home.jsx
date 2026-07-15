import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#features") {
      document.getElementById("features")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [location.hash]);

  return (
    <>
      <Hero />
      <Features />
      <Footer />
    </>
  );
}

export default Home;
