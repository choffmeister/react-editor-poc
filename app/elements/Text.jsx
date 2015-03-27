var React = require('react');

var Text = React.createClass({
  render: function () {
    switch (this.props.mode) {
      case 'edit':
        return <div>EDIT {this.props.data.content}</div>;
      default:
        return <div>{this.props.data.content}</div>;
    }
  }
});

module.exports = Text;
