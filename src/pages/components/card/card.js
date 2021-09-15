import React from 'react';
import './card.css';


class Card extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){

        return(
            <div class="lista-noticias">
                { this.props.itens.map( (value, key) => 
                    this.renderListArticles(value, key)
                )}
            </div>
        );
    }

    renderListArticles(item, i){
        return (
            <div className="li" onClick={()=>{window.location = "/noticia/"+item._id;}}>
                <img loading="lazy" src={`${window._env_.storage}/news/`+item.path+ "/" +item.file} alt="" />
                <h2>{item.name}</h2>
                <p className={i%2 == 0 ? "descricao2" : "descricao2"} dangerouslySetInnerHTML={{ __html: item.description }}/>
                {/* <hr/> */}
                {/* <a href="">ler mais</a> */}

            </div>
        );
    }
}

export default Card;