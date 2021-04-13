import { React, lazy, Suspense } from 'react';
import ReactDOM , { render } from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import './index.css';

import Home from './pages//home/home';
import Gallery from './pages/gallery/gallery';
import Diretoria from './pages/diretoria/diretoria';
import Servicos from './pages/servicos/servicos';
import Contato from './pages/contato/contato';

import Regime from './pages/regime/regime';

import Auth from './pages/login/login';

import FormGallery from './pages/gallery/formGallery';

// import News from './pages/news/news';

import { isAuthenticated } from "./pages/login/auth";

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
const FormNews = lazy(() => import('./pages/news/newsForm'));

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={Home} />

      <Route path="/diretoria" exact={true} component={Diretoria} />
      <Route path="/regime/:tipo" exact={true} component={Regime} />

      <Route path="/servicos" exact={true} component={Servicos} />
      <Route path="/contato" exact={true} component={Contato}/>

      <Route path="/gallery" exact={true} component={Gallery} />
      <PrivateRoute path="/gallery/create" component={FormGallery} />

      <Suspense fallback={<div>Loading...</div>}>
        <Route path="/auth" exact={true} component={Auth} />
        <PrivateRoute path="/news" exact={true} component={News} />
        <PrivateRoute path="/news/create" exact={true} component={FormNews} />
        <PrivateRoute path="/news/edit/:id" exact={true} component={FormNews} />
      </Suspense>

    </Switch>
  </BrowserRouter>
  ,document.getElementById('root')
);

