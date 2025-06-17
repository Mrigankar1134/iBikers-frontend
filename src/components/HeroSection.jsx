import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import '../styles/HeroSection.scss';
// Import from assets
import heroVid from '../../public/hero-vid.mp4';

const HeroSection = () => {
  const headingRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Initial animations
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(headingRef.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1 }
    )
    .fromTo(subtextRef.current, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8 }, 
      "-=0.6"
    )
    .fromTo(ctaRef.current, 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, 
        onComplete: () => {
          // Add bounce animation
          gsap.to(ctaRef.current, {
            y: -10,
            repeat: 1,
            yoyo: true,
            duration: 0.4,
            delay: 0.2
          });
        }
      }, 
      "-=0.4"
    );
  }, []);

  const scrollToSelection = () => {
    const element = document.getElementById('popular-bikes');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hero-section">
      <div className="video-background">
        <video autoPlay muted loop playsInline>
          <source src={heroVid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay"></div>
      </div>
      
      <div className="hero-content">
        <h1 ref={headingRef}>Your Ride. Your Rules.</h1>
        <p ref={subtextRef}>Rent bikes on hourly, half-day, or full-day basis</p>
        <button 
          ref={ctaRef} 
          className="cta-button"
          onClick={scrollToSelection}
        >
          Book a Bike
        </button>
      </div>
    </div>
  );
};

export default HeroSection;