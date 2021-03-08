import React from 'react';
import './home.css';

import Menu from '../components/menu/menu';
import Slide from '../components/slide/slide';
import Footer from '../components/footer/footer';
import Articles from '../components/articles/articles';

class Home extends React.Component{
    render(){
        return(
            <div>
                <Menu/>
                <Slide/>
                <Articles/>
                <Footer/>
            </div>
        );
    }
}

export default Home;