import { React, lazy, Suspense } from 'react';
import ReactDOM , { render } from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import './index.css';

import Home from './pages//home/home';
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
import Filiado from './pages/filiado/fileSe';

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

const FilieseList = lazy(() => import('./pages/filie_se/filieSeList'));
const FilieseView = lazy(() => import('./pages/filie_se/filieseView'));
const FiliadoList = lazy(() => import('./pages/filiado/filieSeList'));
const FiliadoView = lazy(() => import('./pages/filiado/filieseView'));
const Noticias = lazy(() => import('./pages/noticia/lista-noticias'));
const ListGaleria = lazy(() => import('./pages/gallery/list-galery'));

const Gallery = lazy(() => import('./pages/gallery/gallery'));

const AuthFiliado = lazy(() => import('./pages/login_afiliado/login'));

// import Gallery from './pages/gallery/gallery';

const News = lazy(() => import('./pages/news/news'));
const FormNews = lazy(() => import('./pages/news/newsForm'));

//import Noticia from './pages/noticia/noticia';
const Noticia = lazy(() => import('./pages/noticia/noticia'));

const Prestacao = lazy(() => import('./pages/prestacao/prestacao'));
const PrestacaoUser = lazy(() => import('./pages/prestacao/prestacaoUser'));
const PrestacaoNews = lazy(() => import('./pages/prestacao/prestacaoForm'));


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={Home} />

      <Route path="/diretorias" exact={true} component={Diretoria} />
      <Route path="/historias" exact={true} component={Historia} />
      <Route path="/regime/:tipo" exact={true} component={Regime} />

      <Route path="/servicos" exact={true} component={Servicos} />
      <Route path="/contacts" exact={true} component={Contato}/>

      
      <Route path="/filieses" exact={true} component={FilieSe} />
      <Route path="/filiados" exact={true} component={Filiado} />

      <PrivateRoute path="/gallery/create" component={FormGallery} />


      <Suspense fallback={<div>Loading...</div>}>
        <Route path="/login" exact={true} component={AuthFiliado} />
        <Route path="/gallery/list" exact={true} component={Gallery} />
        <Route path="/auth" exact={true} component={Auth} />
        <Route path="/noticias" exact={true} component={Noticias} />
        
        <Route path="/noticia/:id" exact={true} component={Noticia} />

        <PrivateRoute path="/galeria" exact={true} component={ListGaleria} />
        <PrivateRoute path="/cadastros/novos" exact={true} component={FilieseList} />
        <PrivateRoute path="/cadastros/novos/:id" exact={true} component={FilieseView} />
        <PrivateRoute path="/filiados" exact={true} component={FiliadoList} />
        <PrivateRoute path="/filiados/:id" exact={true} component={FiliadoView} />

        <PrivateRoute path="/news/list" exact={true} component={News} />
        <PrivateRoute path="/news/create" exact={true} component={FormNews} />
        <PrivateRoute path="/news/edit/:id" exact={true} component={FormNews} />

        <PrivateRoute path="/prestacao" exact={true} component={Prestacao} />
        <PrivateRoute path="/prestacoes" exact={true} component={PrestacaoUser} />
        <PrivateRoute path="/prestacao/create" exact={true} component={PrestacaoNews} />
        <PrivateRoute path="/prestacao/edit/:id" exact={true} component={PrestacaoNews} />

      </Suspense>

    </Switch>
  </BrowserRouter>
  ,document.getElementById('root')
);

