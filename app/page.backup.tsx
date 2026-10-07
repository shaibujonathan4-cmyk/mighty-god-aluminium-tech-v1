import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import ServicesSection from "@/components/ServicesSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTASection from "@/components/CTASection";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <TrustStrip />
        <ServicesSection />
        <FeaturedProjects />
        <WhyChooseUs />
        <CTASection />
      </main>

      <Footer />

      <WhatsAppButton />
    </>
  );
}
