import Header from '../components/Header.jsx';
import Hero from '../components/Hero.jsx';
import Metrics from '../components/Metrics.jsx';
import Services from '../components/Services.jsx';
import Process from '../components/Process.jsx';
import CaseStudies from '../components/CaseStudies.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Metrics />
        <Services />
        <Process />
        <CaseStudies />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default Home;
