import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import './slide.css';


const slideImages = [
  process.env.PUBLIC_URL + "/outdoor.jpg",
  process.env.PUBLIC_URL + "/outdoor.jpg",
];

const Slideshow = () => {
    return (
      <div>
        <Slide duration="5000" easing="ease">
          <div className="each-slide">
            <img loading="lazy" src={slideImages[0]} alt="" />
          </div>
          <div className="each-slide">
          <img loading="lazy" src={slideImages[1]} alt="" />
          </div>
        </Slide>
      </div>
    )
};

export default Slideshow;