import { NavLink } from 'react-router-dom';

const Toolbar = () => {
  return (
    <nav className="navbar bg-light-subtle py-3">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          <h4 className="text-uppercase m-0">Quotes</h4>
        </NavLink>
        <ul className="navbar-nav d-flex flex-row gap-4">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Цитаты
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/add-quote">
              Добавить цитату
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Toolbar;
