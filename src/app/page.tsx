import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeTicker from "@/components/MarqueeTicker";
import Stats from "@/components/Stats";
import WhyChooseUs from "@/components/WhyChooseUs";
import Coaches from "@/components/Coaches";
import Transformation from "@/components/Transformation";
import Trainers from "@/components/Trainers";
import BMICalculator from "@/components/BMICalculator";
import Pricing from "@/components/Pricing";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <Hero />
      <MarqueeTicker />
      <Stats />
      <WhyChooseUs />
      <Coaches />
      <Transformation />
      <Trainers />
      <BMICalculator />
      <Pricing />
      <Reviews />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
