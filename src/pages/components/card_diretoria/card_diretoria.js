import React from 'react';
import './card_diretoria.css';


class CardPessoa extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){

        return(
            <div className="slider-container">
                <div className="swiper-container card-slider">
                    <div className="swiper-wrapper">
                        
                        <div className="swiper-slide">
                            <div className="card-people">
                                <img loading="lazy" className="card-image" src={process.env.PUBLIC_URL + "/diretoria/DSC_4788.jpg"} alt="alternative"></img>
                                <div className="card-body">
                                    <p className="testimonial-text">Galtiere Cavalcante da Silva</p>
                                    <p className="testimonial-author">Presidente</p>
                                </div>
                            </div>
                        </div> 
                        

                        <div className="swiper-slide">
                            <div className="card-people">
                                <img loading="lazy" className="card-image" src={process.env.PUBLIC_URL + "/diretoria/DSC_4797.jpg"} alt="alternative"></img>
                                <div className="card-body">
                                    <p className="testimonial-text">Gregório Luis de Jesus</p>
                                    <p className="testimonial-author">Vice-Presidente</p>
                                </div>
                            </div>
                        </div> 
                        

                    </div> 

                    <div className="swiper-wrapper">
                        
                        <div className="swiper-slide">
                            <div className="card-people">
                                <img loading="lazy" className="card-image" src={process.env.PUBLIC_URL + "/diretoria/DSC_4762.jpg"} alt="alternative"></img>
                                <div className="card-body">
                                    <p className="testimonial-text">Adriana Aparecida Lima Silva</p>
                                    <p className="testimonial-author">1ª Diretora de Administração e Planejamento</p>
                                </div>
                            </div>
                        </div> 
                        

                        <div className="swiper-slide">
                            <div className="card-people">
                                <img loading="lazy" className="card-image" src={process.env.PUBLIC_URL + "/diretoria/DSC_4779.jpg"} alt="alternative"></img>
                                <div className="card-body">
                                    <p className="testimonial-text">Carlos Sérgio Meireles da Silva</p>
                                    <p className="testimonial-author">1º Diretor de Finanças e Patrimônio</p>
                                </div>
                            </div>
                        </div> 
                        

                        <div className="swiper-slide">
                            <div className="card-people">
                                <img loading="lazy" className="card-image" src={process.env.PUBLIC_URL + "/diretoria/DSC_4736.jpg"} alt="alternative"></img>
                                <div className="card-body">
                                    <p className="testimonial-text">Adailton Pereira dos Santos</p>
                                    <p className="testimonial-author">2º Diretor de Finanças e Patrimônio</p>
                                </div>
                            </div>
                        </div> 
                        
                        
                    </div> 

                    <div className="swiper-wrapper">
                        
                        <div className="swiper-slide">
                            <div className="card-people">
                                <img loading="lazy" className="card-image" src={process.env.PUBLIC_URL + "/diretoria/DSC_4714.jpg"} alt="alternative"></img>
                                <div className="card-body">
                                    <p className="testimonial-text">Andrea de Jesus Meireles</p>
                                    <p className="testimonial-author">Diretora de Comunicação Social, Desportos, Cultura, Raça e Gênero</p>
                                </div>
                            </div>
                        </div> 
                        

                        <div className="swiper-slide">
                            <div className="card-people">
                                <img loading="lazy" className="card-image" src={process.env.PUBLIC_URL + "/diretoria/DSC_4745.jpg"} alt="alternative"></img>
                                <div className="card-body">
                                    <p className="testimonial-text">Zanoni Lopes do Carmo Carvalho</p>
                                    <p className="testimonial-author">Diretor de assuntos previdenciários jurídicos, formação sindical e relações do trabalho</p>
                                </div>
                            </div>
                        </div> 
                        

                    </div> 

                </div> 
            </div> 
        );
    }
}

export default CardPessoa;