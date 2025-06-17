import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/FAQ.scss';

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqItemsRef = useRef([]);
  
  // Clear and set refs array
  faqItemsRef.current = [];
  const addToRefs = (el) => {
    if (el && !faqItemsRef.current.includes(el)) {
      faqItemsRef.current.push(el);
    }
  };

  useEffect(() => {
    const items = faqItemsRef.current;
    
    items.forEach((item, index) => {
      const icon = item.querySelector('.faq-icon');
      
      gsap.fromTo(icon,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          delay: index * 0.1
        }
      );
    });
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: 'Do I need a license to rent a bike?',
      answer: 'Yes, a valid motorcycle driving license is required to rent any bike. You will need to upload a copy of your license during the booking process.'
    },
    {
      question: 'What if I return the bike late?',
      answer: 'Late returns are charged at 1.5x the hourly rate for each additional hour. We recommend extending your booking in advance if you need more time.'
    },
    {
      question: 'Is fuel included in the rental price?',
      answer: 'Bikes are provided with a full tank, and you are expected to return them with a full tank. Alternatively, we can refill for you at market price plus a service fee.'
    },
    {
      question: 'What happens if the bike breaks down?',
      answer: 'In case of a breakdown, contact our 24/7 support line. We provide roadside assistance and replacement bikes depending on your location.'
    },
    {
      question: 'Can I cancel my booking?',
      answer: 'Cancellations made 24 hours before the scheduled pickup time receive a full refund. Later cancellations are subject to a 50% fee.'
    }
  ];

  return (
    <div className="faq-section">
      <div className="container">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          {faqItems.map((item, index) => (
            <div 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`} 
              key={index}
              ref={addToRefs}
              onClick={() => toggleAccordion(index)}
            >
              <div className="faq-question">
                <h3>{item.question}</h3>
                <div className="faq-icon">+</div>
              </div>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;