/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// import { Menu } from 'antd';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MenuLeft() {
  // const { SubMenu } = Menu;

  return (
    <>
      <aside id="colorlib-aside" className="border js-fullheight">
        <h1 id="colorlib-logo"><Link to="/">NCC</Link></h1>
        <nav id="colorlib-main-menu" role="navigation">
          <ul>
            <li className="colorlib-active"><Link to="/">Home</Link></li>
            <li><Link to="/products">Product</Link></li>
            <li><Link to="/typeProduct">Type Product</Link></li>
            <li><Link to="/categories">Categories</Link></li>
          </ul>
        </nav>

      </aside>
    </>
  );
}
