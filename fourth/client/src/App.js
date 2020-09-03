import React, { Fragment, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ProductState from './context/product/ProductState';
import AuthState from './context/auth/authState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AlertState from './context/alert/AlertState';
import Alerts from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import Footer from './components/layout/Footer';
import ProductDetails from './components/pages/ProductDetails';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  });

  return (
    <AuthState>
      <ProductState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <main>
                <div className='container'>
                  <Alerts />
                  <Switch>
                    <PrivateRoute exact path='/' component={Home} />
                    <Route exact path='/product-details/:type' component={ProductDetails} />
                    <Route exact path='/product-details/:type/:category' component={ProductDetails} />
                    <Route exact path='/product-details/:type/:category/:subCategory' component={ProductDetails} />
                    <Route exact path='/product-details/:type/:category/:subCategory/:productId' component={ProductDetails} />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                  </Switch>
                </div>
              </main>
              <Footer />
            </Fragment>
          </Router>
        </AlertState>
      </ProductState>
    </AuthState>
  );
}

export default App;
