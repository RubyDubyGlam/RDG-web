'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _SegmentedControl = require('./SegmentedControl');

var _SegmentedControl2 = _interopRequireDefault(_SegmentedControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormsySegmentedControl = _react2.default.createClass({
  displayName: 'FormsySegmentedControl',

  mixins: [_formsyReact2.default.Mixin],

  render: function render() {
    var _this = this;

    return _react2.default.createElement(_SegmentedControl2.default, (0, _extends3.default)({}, this.props, {
      setValue: function setValue(val) {
        _this.props.setValue && _this.props.setValue(val);
        return _this.setValue(val); // Formsy's setValue
      }
    }));
  }
});

exports.default = FormsySegmentedControl;