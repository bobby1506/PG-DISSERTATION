import React, { useEffect, useRef } from 'react';
import MSUDescription from '../components/LandingPage/MSUdescription/MSUDescription'
import Head from '../components/LandingPage/Head/Head'
import Footer from '../components/Layout/Footer'
import Faqs from '../components/LandingPage/FAQS/Faqs'
import TopResearcher from '../components/LandingPage/TopResearches/TopResearcher'
import StudentCardList from '../components/PastWork/PastWork'
import FaqsMain from '../components/LandingPage/FAQS/FaqsMain'
import GuideCard from '../CommonCard/GuideCard'
import Statistics from '../components/LandingPage/Statistics/Statistics'

const Home = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      if (sectionsRef.current) {
        sectionsRef.current.forEach((section) => {
          if (section) {
            observer.unobserve(section);
          }
        });
      }
    };
  }, []);

  return (
    <div>
      <div ref={(el) => sectionsRef.current[0] = el} className="section">
        <Head />
      </div>
      <div ref={(el) => sectionsRef.current[1] = el} className="section">
        <Statistics />
      </div>
      <div ref={(el) => sectionsRef.current[2] = el} className="section">
        <MSUDescription />
      </div>
      <div ref={(el) => sectionsRef.current[3] = el} className="section">
        <TopResearcher />
      </div>
      <div ref={(el) => sectionsRef.current[4] = el} className="section">
        <StudentCardList />
      </div>
      <div ref={(el) => sectionsRef.current[5] = el} className="section">
        <GuideCard />
      </div>
      <div ref={(el) => sectionsRef.current[6] = el} className="section">
        <FaqsMain />
      </div>
      <div ref={(el) => sectionsRef.current[7] = el} className="section">
        <Footer />
      </div>
    </div>
  );
};

export default Home;