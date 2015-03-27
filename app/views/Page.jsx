var React = require('react'),
    RestClient = require('../services/RestClient');

var Text = require('../elements/Text.jsx'),
    Image = require('../elements/Image.jsx');

var Element = React.createClass({
  getInitialState: function () {
    return {
      elementMode: 'view'
    };
  },

  toggleElementMode: function () {
    this.setState({ elementMode: 'edit' });
  },

  render: function () {
    var rawElement = function (element, elementMode) {
      switch (element.type) {
        case 'text':  return <Text mode={elementMode} data={element.data}/>;
        case 'image': return <Image mode={elementMode} data={element.data}/>;
        default:      return <div>Unknown Element</div>;
      }
    };

    if (this.props.mode == 'edit') {
      return (
        <div>
          <div className="btn-group" role="group">
            <button onClick={this.toggleElementMode} type="button" className="btn btn-default">Edit</button>
            <button type="button" className="btn btn-default">Move</button>
            <button type="button" className="btn btn-default">Delete</button>
          </div>
          {rawElement(this.props.element, this.state.elementMode)}
        </div>
      );
    } else {
      return (
        rawElement(this.props.element, 'view')
      );
    }
  }
});

var Page = React.createClass({
  statics: {
    fetchData: function (params) {
      return {
        page: RestClient.get('/shops/' + params.shopId + '/pages/' + params.pageId)
      };
    }
  },

  render: function () {
    var renderColumn = function (props, row, column) {
      return (
        <div className={'col-md-' + Math.round(12 / row.columns.length)}>
          {column.elements.map((element) => <Element element={element} {...props}/>)}
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
