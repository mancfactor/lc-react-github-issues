import React from 'react';
import Issues from './Issues';
import Details from './Details';
import {
  NavLink,
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

export default function App() {
  const routes = [
    { path: '/', name: 'Home', Component: Issues, exact: true },
    { path: '/issues/:id', name: 'Details', Component: Details, exact: false },
    { path: '*', name: 'No Match', Component: Issues, exact: false },
  ];
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <NavLink to="/" activeClassName="active" exact>
              Home
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="container">
        <Routes>
          {routes.map(({ path, Component, exact }) => (
            <Route
              key={path}
              path={path}
              exact={exact}
              element={<Component />}
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
}
