import React, { Fragment } from "react";
import { HashRouter, BrowserRouter, Route, Link } from "react-router-dom";
import asyncload from "utils/asyncload";
import styled from "styled-components";

const Router =
  process.env.NODE_ENV === "development" ? BrowserRouter : HashRouter;

const Header = styled.header.attrs({
  className: "container"
})`
    display: flex;
    align-items: center;
    padding: 20px;
    height: 30px;
    max-width: 1000px;
  }

   li {
    display: inline-block;
    margin-right: 10px;
    color: #999;
  }

   h2 {
    flex: 1;
  }
`;

export default () => (
  <Router>
    <Fragment>
      <Header>
        <h2>React Blog</h2>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Sign in</Link>
            </li>
            <li>
              <Link to="/register">Sign up</Link>
            </li>
          </ul>
        </nav>
      </Header>

      <Route
        path="/"
        exact
        component={asyncload(() => import("containers/Home"))}
      />
      <Route
        path="/login"
        component={asyncload(() => import("containers/SignIn"))}
      />
      <Route
        path="/register"
        component={asyncload(() => import("containers/SignUp"))}
      />
      <Route
        path="/@:username"
        component={asyncload(() => import("containers/Profile"))}
      />
      <Route
        path="/article/:title"
        component={asyncload(() => import("containers/Article"))}
      />
    </Fragment>
  </Router>
);
