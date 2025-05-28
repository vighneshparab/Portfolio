import React from "react";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Project from "../components/Project";
import Skills from "../components/Skills";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import EducationCertifications from "../components/EducationCertifications";

function Index() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <About />
      <Project />
      <Skills />
      <EducationCertifications />
      <ContactSection />
      <Footer />
    </>
  );
}

export default Index;
