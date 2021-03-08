import React from 'react';
import './footer.css';

class Footer extends React.Component{
    render(){
        return(
            <section className="footer">
                <img className="footer-img" src={process.env.PUBLIC_URL + "/footer.png"} alt="" />
                <p>&copy;Copyright Sindismut Tucano, 2021</p>
            </section>
        );
    }
}

export default Footer;