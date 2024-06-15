import React, { useRef, useEffect } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import './Carousel.css'; // Custom styles

const Carousel = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    swiperRef.current = new Swiper('.swiper-container', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    // Cleanup function to destroy swiper instance on component unmount
    return () => {
      if (swiperRef.current) swiperRef.current.destroy();
    };
  }, []);

  return (
    <div className="w-full relative">
      <div className="swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="bg-indigo-50 rounded-2xl w-full h-120 flex justify-center items-stretch">
              <span className="text-3xl font-semibold text-indigo-600"><img
              src="https://picsum.photos/800/400?random=1"
              alt="Slide 1"
              className="w-full h-120 object-cover rounded-2xl"
            /></span>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center">
              <span className="text-3xl font-semibold text-indigo-600"><img
              src="https://picsum.photos/800/400?random=2"
              alt="Slide 2"
              className="w-full h-120 object-cover rounded-2xl"
            /></span>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="bg-indigo-50 rounded-2xl h-120 flex justify-center items-center">
              <span className="text-3xl font-semibold text-indigo-600"><img
              src="https://picsum.photos/800/400?random=3"
              alt="Slide 3"
              className="w-full h-120 object-cover rounded-2xl"
            /></span>
            </div>
          </div>
        </div>
        <div className="swiper-pagination"></div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </div>
    </div>
  );
};

export default Carousel;
