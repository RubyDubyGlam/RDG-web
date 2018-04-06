'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storybook = require('@kadira/storybook');

var _StoryWrapper = require('./StoryWrapper');

var _StoryWrapper2 = _interopRequireDefault(_StoryWrapper);

var _CardForm = require('../CardForm');

var _CardForm2 = _interopRequireDefault(_CardForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _storybook.storiesOf)('CardForm', module).addWithInfo('full', function () {
  return _react2.default.createElement(
    _StoryWrapper2.default,
    null,
    _react2.default.createElement(_CardForm2.default, {
      onSubmit: (0, _storybook.action)('onSubmit'),
      getName: true,
      getZip: true
    })
  );
}).addWithInfo('basic', function () {
  return _react2.default.createElement(
    _StoryWrapper2.default,
    null,
    _react2.default.createElement(_CardForm2.default, {
      onSubmit: (0, _storybook.action)('onSubmit')
    })
  );
}).addWithInfo('valid', function () {
  var STRIPE_TEST_CARD = '4242424242424242';
  return _react2.default.createElement(
    _StoryWrapper2.default,
    null,
    _react2.default.createElement(_CardForm2.default, {
      onSubmit: (0, _storybook.action)('onSubmit'),
      getName: true,
      getZip: true,
      defaultValues: {
        name: 'Loren',
        number: STRIPE_TEST_CARD,
        expiration: '01/40',
        cvc: '123',
        zip: '94117'
      }
    })
  );
}).addWithInfo('invalid', function () {
  return _react2.default.createElement(
    _StoryWrapper2.default,
    null,
    _react2.default.createElement(_CardForm2.default, {
      onSubmit: (0, _storybook.action)('onSubmit'),
      getName: true,
      getZip: true,
      defaultValues: {
        name: 'Loren',
        number: '456345',
        expiration: '01/01',
        cvc: '12',
        zip: '94117'
      }
    })
  );
}).addWithInfo('custom label', function () {
  return _react2.default.createElement(
    _StoryWrapper2.default,
    null,
    _react2.default.createElement(_CardForm2.default, {
      label: 'submit',
      onSubmit: (0, _storybook.action)('onSubmit'),
      getName: true,
      getZip: true
    })
  );
});