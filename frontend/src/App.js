/* eslint-disable jsx-a11y/anchor-is-valid */
import './App.css';
import './home.css';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import MenuLeft from './routers/router';
import HomePage from './pages/homePage/HomePage';
import PageCategories from './pages/Category/List/index';
import PageProductsItem from './pages/Product/productList/index';
import ProductDetail from './pages/Product/productDetail/index';
import ProductUpdate from './pages/Product/productUpdate/index';
import PageType from './pages/TypeProduct/List/index';
import OverLayProvider from './components/OverLay/provider';
// import NavTop from './pages/navtop';

function App() {
  return (
    <div className="container-fluid">
      <div id="colorlib-page">
        <OverLayProvider>
          <Router>
            <MenuLeft />
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/products" component={PageProductsItem} />
              <Route path="/categories" component={PageCategories} />
              <Route path="/typeProduct" component={PageType} />
              <Route path="/detail/:id" component={ProductDetail} />
              <Route path="/update/:id" component={ProductUpdate} />
            </Switch>
          </Router>
        </OverLayProvider>
      </div>
    </div>
  );
}

export default App;
