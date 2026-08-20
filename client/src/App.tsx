import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Services />
      </main>
    </>
  );
}

export default App;