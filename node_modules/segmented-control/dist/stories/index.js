'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _storybook = require('@kadira/storybook');

var _reactStorybookDecoratorCentered = require('@kadira/react-storybook-decorator-centered');

var _reactStorybookDecoratorCentered2 = _interopRequireDefault(_reactStorybookDecoratorCentered);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _SegmentedControl = require('../SegmentedControl');

var _SegmentedControl2 = _interopRequireDefault(_SegmentedControl);

var _FormsySegmentedControl = require('../FormsySegmentedControl');

var _FormsySegmentedControl2 = _interopRequireDefault(_FormsySegmentedControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _storybook.storiesOf)('SegmentedControl', module).addDecorator(_reactStorybookDecoratorCentered2.default).addWithInfo('Two options', function () {
  return _react2.default.createElement(_SegmentedControl2.default, {
    name: 'twoOptions',
    options: [{ label: "One", value: "one", default: true }, { label: "Two", value: "two" }],
    style: { width: 300, color: '#42a5f5' } // blue400
    , setValue: (0, _storybook.action)('setValue')
  });
}).addWithInfo('Three options', function () {
  return _react2.default.createElement(_SegmentedControl2.default, {
    name: 'threeOptions',
    options: [{ label: "One", value: "one" }, { label: "Two", value: "two", default: true }, { label: "Three", value: "three" }],
    style: { width: 303, color: '#ef5350' } // red400
    , setValue: (0, _storybook.action)('setValue')
  });
}).addWithInfo('One disabled', function () {
  return _react2.default.createElement(_SegmentedControl2.default, {
    name: 'oneDisabled',
    options: [{ label: "One", value: "one", disabled: true }, { label: "Two", value: "two" }, { label: "Three", value: "three", default: true }, { label: "Four", value: "four" }],
    style: { width: 400, color: '#ab47bc' } // purple400
    , setValue: (0, _storybook.action)('setValue')
  });
});

(0, _storybook.storiesOf)('FormsySegmentedControl', module).addDecorator(_reactStorybookDecoratorCentered2.default).addWithInfo('Three options', function () {
  return _react2.default.createElement(
    _MuiThemeProvider2.default,
    null,
    _react2.default.createElement(
      _formsyReact2.default.Form,
      {
        onValidSubmit: (0, _storybook.action)('onFormsySubmit')
      },
      _react2.default.createElement(_FormsySegmentedControl2.default, {
        name: 'threeOptions',
        options: [{ label: "One", value: "one" }, { label: "Two", value: "two", default: true }, { label: "Three", value: "three" }],
        style: { width: 300, color: 'rgb(0, 188, 212)' } // match default material-ui primary teal
        , setValue: (0, _storybook.action)('setValue')
      }),
      _react2.default.createElement(_RaisedButton2.default, {
        type: 'submit',
        label: 'submit formsy form',
        style: {
          display: 'block',
          width: 200,
          margin: "20px auto"
        },
        primary: true
      })
    )
  );
});