var React = require('react');

var Text = React.createClass({
  render: function () {
    return <div>{this.props.data.content}</div>;
  }
});

module.exports = Text;
