var React = require('react');

var Image = React.createClass({
  render: function () {
    return (
      <img src={this.props.data.src} alt={this.props.data.alt}/>
    );
  }
});

module.exports = Image;
