"use client";

import Home from "../../components/home/Home";
import Services from "../../components/services/Services";
import About from "../../components/about/about";
import Contact from "../../components/contact/Contact";
import HeavyVehicle from "../../components/heavyVehicle/HeavyVehicle";

export default function page() {
  return (
    <main>
      <div>
        <Home />
        <section id="services">
          <Services />
        </section>

        <HeavyVehicle />

        <About />

        <Contact />
      </div>
    </main>
  );
}
