import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import './slide.css';


const slideImages = [
  'https://rotadeferias.com.br/wp-content/uploads/2019/03/34-9-750x499.jpg',
  'https://static9.depositphotos.com/1307373/1164/i/450/depositphotos_11640206-stock-photo-field-way.jpg',
  'https://thumbs.dreamstime.com/z/nuvens-bonitas-20112248.jpg'
];

const Slideshow = () => {
    return (
      <div>
        <Slide duration="6000" easing="ease">
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
              <span>Covid-19 Com muito alarde, o Grupo Unigel anunciou a reabertura das fábricas de fertilizantes da Bahia e Sergipe, a partir de 1º de janeiro de 2021, após a operação de arrendamento ter sido aprovada pelo Cade (Conselho Administrativo de Defesa Econômica).</span>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
              <span>Slide 2</span>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
              <span>Slide 3</span>
            </div>
          </div>
        </Slide>
      </div>
    )
};

export default Slideshow;