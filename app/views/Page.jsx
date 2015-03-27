var React = require('react'),
    DateTime = require('../components/DateTime.jsx'),
    RestClient = require('../services/RestClient');

var Text = require('../elements/Text.jsx'),
    Image = require('../elements/Image.jsx');

var Page = React.createClass({
  statics: {
    fetchData: function (params) {
      return {
        page: RestClient.get('/shops/demoshop/pages/' + params.pageId)
      };
    }
  },

  render: function () {
    var renderElement = function (element) {
      switch (element.type) {
        case 'text':  return <Text data={element.data}/>;
        case 'image': return <Image data={element.data}/>;
        default:      return <div>Unknown Element</div>;
      }
    };

    var renderColumn = function (row, column) {
      return (
        <div className={'col-md-' + Math.round(12 / row.columns.length)}>
          {column.elements.map((element) => renderElement(element))}
        </div>
      );
    };

    var renderRow = function (row) {
      return (
        <div className="row">
          {row.columns.map((column) => renderColumn(row, column))}
        </div>
      );
    };

    return (
      <div>
        {this.props.data['page'].page.rows.map((row) => renderRow(row))}
      </div>
    );
  }
});

module.exports = Page;
