var React = require('react');
    ReactRouter = require('react-router'),
    RouteHandler = ReactRouter.RouteHandler,
    ReactBootstrap = require('react-bootstrap'),
    Navbar = ReactBootstrap.Navbar,
    Nav = ReactBootstrap.Nav,
    NavItem = ReactBootstrap.NavItem,
    ReactRouterBootstrap = require('react-router-bootstrap'),
    NavItemLink = ReactRouterBootstrap.NavItemLink;

var GlobalState = require('../services/GlobalState');

var mode = 'view';

var Navigation = React.createClass({
  toggleEditor: function (event) {
    GlobalState.toggleMode();
    event.preventDefault();
  },

  render: function () {
    var pages = this.props.pages.map((page) =>
      <NavItemLink key={this.props.shopId + '/' + page.id} to="page" params={{ shopId: this.props.shopId, pageId: page.id }}>
        {page.displayName}
      </NavItemLink>
    );

    return (
      <Navbar brand={this.props.brand}>
        <Nav>
          {pages}
        </Nav>
        <Nav right>
          <NavItem onClick={this.toggleEditor}>
            View/Edit
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
});

module.exports = Navigation;
