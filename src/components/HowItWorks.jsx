import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/HowItWorks.scss';

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);
  
  // Clear and set refs array
  stepsRef.current = [];
  const addToRefs = (el) => {
    if (el && !stepsRef.current.includes(el)) {
      stepsRef.current.push(el);
    }
  };

  useEffect(() => {
    const steps = stepsRef.current;
    
    steps.forEach((step, index) => {
      gsap.fromTo(step,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          },
          delay: index * 0.2
        }
      );
    });
  }, []);

  const steps = [
    {
      icon: '🔍',
      title: 'Choose',
      description: 'Select from our premium collection of bikes'
    },
    {
      icon: '📅',
      title: 'Book',
      description: 'Pick your duration and schedule your ride'
    },
    {
      icon: '🚴',
      title: 'Ride',
      description: 'Enjoy the freedom of the open road'
    }
  ];

  return (
    <div className="how-it-works" ref={sectionRef}>
      <div className="container">
        <h2>How It Works</h2>
        <div className="steps">
          {steps.map((step, index) => (
            <div className="step" key={index} ref={addToRefs}>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;