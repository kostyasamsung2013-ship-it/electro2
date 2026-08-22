import Header from "./components/Header";
import Hero, { CitiesMarquee } from "./components/Hero";
import Services from "./components/Services";
import Calculator from "./components/Calculator";
import Journey from "./components/Journey";
import Showcase from "./components/Showcase";
import Trust from "./components/Trust";
import {
  ContactSection,
  FloatingWhatsApp,
  Footer,
} from "./components/Contact";

export default function App() {
  return (
    <div className="noise min-h-screen overflow-x-clip bg-ink font-body text-white antialiased">
      <Header />
      <main>
        <Hero />
        <CitiesMarquee />
        <Services />
        <Calculator />
        <Journey />
        <Showcase />
        <Trust />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
