import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import About from "./components/About/About";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Services />
        <About />
      </main>
    </>
  );
}

export default App;