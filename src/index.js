import { React, lazy, Suspense } from 'react';
import ReactDOM , { render } from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import './index.css';

import Home from './pages//home/home';
import Gallery from './pages/gallery/gallery';
import Diretoria from './pages/diretoria/diretoria';
import Historia from './pages/historia/historia';
import Servicos from './pages/servicos/servicos';
import Contato from './pages/contato/contato';

import Regime from './pages/regime/regime';

import Auth from './pages/login/login';

import FormGallery from './pages/gallery/formGallery';

// import News from './pages/news/news';

import { isAuthenticated } from "./pages/login/auth";

import FilieSe from './pages/filie_se/fileSe';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);


// import FormNews from './pages/news/newsForm';

const News = lazy(() => import('./pages/news/news'));
const FilieseList = lazy(() => import('./pages/filie_se/filieSeList'));
const FilieseView = lazy(() => import('./pages/filie_se/filieseView'));
const Noticias = lazy(() => import('./pages/noticia/lista-noticias'));
const Noticia = lazy(() => import('./pages/noticia/noticia'));
const FormNews = lazy(() => import('./pages/news/newsForm'));
const ListGaleria = lazy(() => import('./pages/gallery/list-galery'));


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={Home} />

      <Route path="/diretoria" exact={true} component={Diretoria} />
      <Route path="/historia" exact={true} component={Historia} />
      <Route path="/regime/:tipo" exact={true} component={Regime} />

      <Route path="/servicos" exact={true} component={Servicos} />
      <Route path="/contato" exact={true} component={Contato}/>

      <Route path="/gallery" exact={true} component={Gallery} />
      
      <Route path="/filiese" exact={true} component={FilieSe} />

      <PrivateRoute path="/gallery/create" component={FormGallery} />

      <Suspense fallback={<div>Loading...</div>}>
        <Route path="/noticia/:id" exact={true} component={Noticia} />
        <Route path="/auth" exact={true} component={Auth} />
        <Route path="/noticias" exact={true} component={Noticias} />
        <PrivateRoute path="/galeria" exact={true} component={ListGaleria} />
        <PrivateRoute path="/news" exact={true} component={News} />
        <PrivateRoute path="/filiados" exact={true} component={FilieseList} />
        <PrivateRoute path="/filiados/:id" exact={true} component={FilieseView} />
        <PrivateRoute path="/news/create" exact={true} component={FormNews} />
        <PrivateRoute path="/news/edit/:id" exact={true} component={FormNews} />
      </Suspense>

    </Switch>
  </BrowserRouter>
  ,document.getElementById('root')
);

