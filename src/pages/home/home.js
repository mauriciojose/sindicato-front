import React from 'react';
import './home.css';

import Menu from '../components/menu/menu';
import Slide from '../components/slide/slide';
import Footer from '../components/footer/footer';
import Articles from '../components/articles/articles';

class Home extends React.Component{
    render(){
        let numbers = [1,2,3];
        let ulNotices = (<ul class="lista-noticias">
        { numbers.map( (value, key) => 
            (key%2 ==0) ? this.renderListArticles() : this.renderListArticles2() 
        )}
        </ul>);

        return(
            <div>
                <Menu/>
                <Slide/>
                <Articles titulo={"Ultimas Notícias"} component={ulNotices} />
                <Articles titulo={"Nossa Localização"} component={this.getComponentLocalizacao()} />
                <Footer/>
            </div>
        );
    }

    getComponentLocalizacao(){
        return(
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.0939472287455!2d-38.796724885632834!3d-11.031577926847643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x712250f49c33bf3%3A0xf6195d057993d8d!2sR.%20Domingos%20Carlos%20dos%20R%C3%A9is%2C%20255-71%2C%20Tucano%20-%20BA%2C%2048790-000!5e0!3m2!1spt-BR!2sbr!4v1614972225405!5m2!1spt-BR!2sbr"
            allowfullscreen="" loading="lazy"></iframe>
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

export default Home;