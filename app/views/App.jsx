var React = require('react'),
    ReactRouter = require('react-router'),
    Navigation = require('../components/Navigation.jsx'),
    RestClient = require('../services/RestClient');

var App = React.createClass({
  statics: {
    fetchData: function (params) {
      return {
        pages: RestClient.get('/shops/' + params.shopId + '/pages')
      };
    }
  },

  render: function () {
    return (
      <div>
        <Navigation brand={this.props.params.shopId} shopId={this.props.params.shopId} pages={this.props.data['app'].pages}/>
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
