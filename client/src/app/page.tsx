import Footer from "@/components/_components/Footer";
import Hero2 from "@/components/_components/Hero2";
import Hero_ from "@/components/_components/Hero_";
import { Navbar } from "@/components/_components/Navbar";
import FeaturesSectionDemo from "@/components/features-section-demo-2";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero_ />
      <Hero2 />
      <FeaturesSectionDemo />
      <Footer />
    </>
  );
}
