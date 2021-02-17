import React from 'react';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RepositoryLayout from './layouts/RepositoryLayout';

export default (
  <Router>
    <div id="wrapper" className="toggled">
      <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
          <li className="sidebar-brand">
            <Link to="/">Github Monitor</Link>
          </li>
        </ul>
      </div>

      <div id="page-content-wrapper">
        <div className="container-fluid">
          <Switch>
            <Route path="/" exact component={RepositoryLayout} />
          </Switch>
        </div>
      </div>
    </div>
  </Router>
);
