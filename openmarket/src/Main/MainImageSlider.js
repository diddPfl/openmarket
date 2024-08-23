import React, { useState, useEffect, useCallback } from 'react';
import './MainImageSlider.css';

const mainImages = [
  '/image/main1.jpg',
  '/image/main2.jpg',
  '/image/main3.jpg',
  '/image/main4.jpg',
];

const MainImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const cloneImages = [...mainImages.slice(-2), ...mainImages, ...mainImages.slice(0, 2)];

  const handleSlideChange = useCallback((direction) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prevIndex => prevIndex + direction);
  }, [isTransitioning]);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex <= -2) {
      setCurrentIndex(mainImages.length - 2);
    } else if (currentIndex >= mainImages.length) {
      setCurrentIndex(0);
    }
  };

  const handleNext = () => handleSlideChange(2);
  const handlePrev = () => handleSlideChange(-2);

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <div className="main-image-slider-container">
      <div className="main-page-image-container">
        <button className="image-nav-button prev" onClick={handlePrev}>&lt;</button>
        <div
          className="image-slider"
          style={{
            transform: `translateX(calc(-${(currentIndex + 2) * 45}% + 5%))`,
            transition: isTransitioning ? 'transform 0.5s ease' : 'none'
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {cloneImages.map((image, index) => (
            <div key={index} className="image-wrapper">
              <img src={image} alt={`슬라이드 ${index}`} className="slider-image" />
            </div>
          ))}
        </div>
        <button className="image-nav-button next" onClick={handleNext}>&gt;</button>
      </div>
    </div>
  );
};

export default MainImageSlider;