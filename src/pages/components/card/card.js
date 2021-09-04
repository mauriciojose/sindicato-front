import React from 'react';
import './card.css';


class Card extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){

        return(
            <ul class="lista-noticias">
                { this.props.itens.map( (value, key) => 
                    this.renderListArticles(value, key)
                )}
            </ul>
        );
    }

    renderListArticles(item, i){
        return (
            <li onClick={()=>{window.location = "/news/"+item._id;}}>
                <img src={`${window._env_.storage}/news/`+item.path+ "/" +item.file} alt="" />
                <h2>{item.name}</h2>
                <p className={i%2 == 0 ? "descricao" : "descricao2"} dangerouslySetInnerHTML={{ __html: item.description }}/>
                <hr/>
                {/* <a href="">ler mais</a> */}

            </li>
        );
    }
}

export default Card;