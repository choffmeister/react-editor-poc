var React = require('react'),
    RestClient = require('../services/RestClient');

var Text = require('../elements/Text.jsx'),
    Image = require('../elements/Image.jsx');

var Page = React.createClass({
  statics: {
    fetchData: function (params) {
      return {
        page: RestClient.get('/shops/' + params.shopId + '/pages/' + params.pageId)
      };
    }
  },

  render: function () {
    var renderElement = function (props, element) {
      var rawElement = function (element) {
        switch (element.type) {
          case 'text':  return <Text data={element.data}/>;
          case 'image': return <Image data={element.data}/>;
          default:      return <div>Unknown Element</div>;
        }
      };

      if (props.mode == 'edit') {
        return (
          <div>
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-default">Edit</button>
              <button type="button" className="btn btn-default">Move</button>
              <button type="button" className="btn btn-default">Delete</button>
            </div>
            {rawElement(element)}
          </div>
        );
      } else {
        return (
          rawElement(element)
        );
      }
    };

    var renderColumn = function (props, row, column) {
      return (
        <div className={'col-md-' + Math.round(12 / row.columns.length)}>
          {column.elements.map((element) => renderElement(props, element))}
        </div>
      );
    };

    var renderRow = function (props, row) {
      return (
        <div className="row">
          {row.columns.map((column) => renderColumn(props, row, column))}
        </div>
      );
    };

    return (
      <div>
        {this.props.data['page'].page.rows.map((row) => renderRow(this.props, row))}
      </div>
    );
  }
});

module.exports = Page;
