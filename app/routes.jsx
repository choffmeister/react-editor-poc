var React = require('react'),
    ReactRouter = require('react-router'),
    Route = ReactRouter.Route,
    Redirect = ReactRouter.Redirect;

var App = require('./views/App.jsx'),
    Page = require('./views/Page.jsx');

module.exports = (
  <Route name="app" handler={App} path="/">
    <Route name="page" handler={Page} path="/page/:pageId"/>
    <Redirect from="" to="page" params={{ pageId: 'homepage' }}/>
  </Route>
);
