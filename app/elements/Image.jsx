var React = require('react');

var Image = React.createClass({
  render: function () {
    switch (this.props.mode) {
      case 'edit':
        return <div>EDIT <img src={this.props.data.src} alt={this.props.data.alt}/></div>;
      default:
        return <img src={this.props.data.src} alt={this.props.data.alt}/>
    }
  }
});

module.exports = Image;
