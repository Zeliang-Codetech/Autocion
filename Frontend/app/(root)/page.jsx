"use client";

import Home from "../../components/home/Home";
import Services from "../../components/services/Services";
import About from "../../components/about/about";
import Contact from "../../components/contact/Contact";

export default function page() {
  return (
    <main>
      <div>
        <Home />
        <Services />
        <About />
        <Contact />
      </div>
    </main>
  );
}
