var React = require('react'),
    DateTime = require('../components/DateTime.jsx'),
    RestClient = require('../services/RestClient');

var Builds = React.createClass({
  statics: {
    fetchData: function (params) {
      return {
        test: RestClient.get('/shops/demoshop/pages/startpage')
      };
    }
  },

  render: function () {
    return (
      <div>
        <pre>{JSON.stringify(this.props.data['home'].test, true, 2)}</pre>
      </div>
    );
  }
});

module.exports = Builds;
