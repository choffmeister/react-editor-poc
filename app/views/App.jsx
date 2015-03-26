var React = require('react'),
    ReactRouter = require('react-router'),
    Navigation = require('../components/Navigation.jsx');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Navigation brand="editor-poc"/>
        <div className="container">
          <ReactRouter.RouteHandler data={this.props.data}/>
        </div>
        <hr/>
        <div className="container">
          &copy; 2015 Christian Hoffmeister
        </div>
      </div>
    );
  }
});

module.exports = App;
