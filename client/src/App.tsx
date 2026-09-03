import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import About from "./components/About/About";
import WhyChooseUs from "./components/WhyChooseUs/WhyChooseUs";
import Testimonials from "./components/Testimonials/Testimonials";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Services />
        <About />
        <WhyChooseUs />
        <Testimonials />
      </main>
    </>
  );
}

export default App;