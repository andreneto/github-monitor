import React from 'react';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RepositoryDetailLayout from './layouts/RepositoryDetailLayout';
import RepositoryListLayout from './layouts/RepositoryListLayout';
import RepositoryStatsLayout from './layouts/RepositoryStatsLayout';

export default (
  <Router>
    <div id="wrapper" className="toggled">
      <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
          <li className="sidebar-brand">
            <Link to="/">Github Monitor</Link>
          </li>
          <li>
            <Link to="/stats">Show stats</Link>
          </li>
        </ul>
      </div>

      <div id="page-content-wrapper">
        <div className="container-fluid">
          <Switch>
            <Route path="/" exact component={RepositoryListLayout} />
            <Route path="/stats" exact component={RepositoryStatsLayout} />
            <Route path="/:id" exact component={RepositoryDetailLayout} />
          </Switch>
        </div>
      </div>
    </div>
  </Router>
);
