var React = require('react'),
    DateTime = require('../components/DateTime.jsx'),
    RestClient = require('../services/RestClient');

var Builds = React.createClass({
  statics: {
    fetchData: function (params) {
      return {
        test: RestClient.get('/test')
      };
    }
  },

  render: function () {
    return (
      <div>
        <div>Home</div>
        <div><DateTime value={new Date()} kind="relative"/></div>
        <pre>{JSON.stringify(this.props.data['home'].test)}</pre>
      </div>
    );
  }
});

module.exports = Builds;
