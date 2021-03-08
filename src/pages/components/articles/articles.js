import React from 'react';
import './articles.css';

class Articles extends React.Component{
    render(){
        let numbers = [1,2,3,4,5,6];
        return(
            <section class="noticias">
                <h3 class="titulo-principal">Ultimas Notícias</h3>
                <ul class="lista-noticias">
                { numbers.map( (value, key) => 
                    (key%2 ==0) ? this.renderListArticles() : this.renderListArticles2() 
                )}
                </ul>
            </section>
        );
    }

    renderListArticles(){
        return (
            <li>
                <img src={process.env.PUBLIC_URL + "/slide2.jpg"} alt="" />
                <h2>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</h2>
                <p class="descricao">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin imperdiet, dolor eu bibendum consectetur, dolor enim molestie elit, eget porta ex enim blandit turpis. Fusce laoreet quam sed metus molestie, vitae lacinia erat scelerisque. Fusce malesuada,
                    turpis imperdiet vestibulum sodales, turpis metus faucibus lectus, vel ornare justo enim eu leo. Morbi lacus eros, consequat eu maximus id, scelerisque non mauris. Morbi efficitur congue sodales. Aliquam erat volutpat. Donec nec justo
                    convallis, placerat justo in, dictum augue.
                </p>
                <a href="">ler mais</a>

            </li>
        );
    }
    renderListArticles2(){
        return (
            <li>
                <img src={process.env.PUBLIC_URL + "/slide2.jpg"} alt="" />
                <h2>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet"</h2>
                <p class="descricao">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin imperdiet, dolor eu bibendum consectetur, dolor enim molestie elit, eget porta ex enim blandit turpis. Fusce laoreet quam sed metus molestie, vitae lacinia erat scelerisque. Fusce malesuada,
                    turpis imperdiet vestibulum sodales.
                </p>
                <a href="">ler mais</a>

            </li>
        );
    }
}

export default Articles;