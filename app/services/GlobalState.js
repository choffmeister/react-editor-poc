var EventEmitter = require('events').EventEmitter,
    objectAssign = require('object-assign');

var _state = {
  mode: 'view',
}

GlobalState = objectAssign({}, EventEmitter.prototype, {
  getMode: function () {
    return _state.mode;
  },

  toggleMode: function () {
    switch (_state.mode) {
      case 'view':
        _state.mode = 'edit';
        this.emit('mode', _state.mode);
        break;
      case 'edit':
        _state.mode = 'view';
        this.emit('mode', _state.mode);
        break;
    }
  },
});

module.exports = GlobalState;
