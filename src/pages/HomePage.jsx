import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import PopularBikes from '../components/PopularBikes';
import UserReviews from '../components/UserReviews';
import FAQ from '../components/FAQ';
import '../styles/HomePage.scss';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const bottomCtaRef = useRef(null);

  useEffect(() => {
    // Bottom CTA zoom effect
    gsap.to(bottomCtaRef.current, {
      backgroundSize: '120%',
      scrollTrigger: {
        trigger: bottomCtaRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }, []);

  return (
    <div className="home-page">
      <HeroSection />
      <HowItWorks />
      <PopularBikes />
      <UserReviews />
      <FAQ />
      
      <div className="bottom-cta" ref={bottomCtaRef}>
        <div className="container">
          <h2>Ready to ride?</h2>
          <Link to="/browse" className="cta-button">Book Now</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;