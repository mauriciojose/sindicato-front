import React, { Fragment } from 'react';
import './containerPages.css';

import Menu from '../menu/menu';
import Footer from '../footer/footer';

import Alert from '../alerts/alert';

class ContainerPages extends React.Component{
    constructor(props) {
        super(props);
        this.alerts = React.createRef();
        this.alertSucces  = this.alertSucces;
        this.alertWarning = this.alertWarning;
        this.alertDanger  = this.alertDanger;
        this.alertInfo    = this.alertInfo;
    }

    render(){
        let subtitle = this.props.subtitle ? <Fragment><br/>{this.props.subtitle}</Fragment> : <Fragment></Fragment>;
        return(
            <div>
                <Alert  ref={this.alerts} />
                <Menu/>
                <div className="containerPages">
                    { !this.props.notBanner ? 
                    <header>
                        <img loading="lazy" src={this.props.img ? process.env.PUBLIC_URL +"/"+ this.props.img : process.env.PUBLIC_URL + "/sp_banner.jpg"} alt=""/>
                        <span>{this.props.titulo}{subtitle}</span>
                    </header>
                    :
                    <Fragment></Fragment>
                    }
                    <main>
                        {this.props.innerMain}
                    </main>
                </div>
                <Footer/>
            </div>
        );
    }

    alertSucces(msg=null){
        this.alerts.current.addAlert('success',msg);
    }
    alertWarning(msg=null){
        this.alerts.current.addAlert('warning',msg);
    }
    alertDanger(msg=null){
        this.alerts.current.addAlert('danger',msg);
    }
    alertInfo(msg=null){
        this.alerts.current.addAlert('info',msg);
    }

}

export default ContainerPages;