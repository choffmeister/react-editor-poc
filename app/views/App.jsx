var React = require('react'),
    ReactRouter = require('react-router'),
    Navigation = require('../components/Navigation.jsx'),
    RestClient = require('../services/RestClient'),
    RegisterEventMixin = require('../mixins/RegisterEventMixin');

var App = React.createClass({
  mixins: [RegisterEventMixin],

  statics: {
    fetchData: function (params) {
      return {
        pages: RestClient.get('/shops/' + params.shopId + '/pages')
      };
    }
  },

  getInitialState: function () {
    return {
      mode: GlobalState.getMode()
    };
  },

  componentDidMount: function () {
    this.onEvent('mode', function (mode) {
      this.setState({ mode: mode });
    }.bind(this));
  },

  render: function () {
    return (
      <div>
        <Navigation brand={this.props.params.shopId} shopId={this.props.params.shopId} pages={this.props.data['app'].pages}/>
        <div className="container">
          <ReactRouter.RouteHandler mode={this.state.mode} data={this.props.data}/>
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
