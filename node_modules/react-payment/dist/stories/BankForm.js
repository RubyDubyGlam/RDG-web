'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storybook = require('@kadira/storybook');

var _StoryWrapper = require('./StoryWrapper');

var _StoryWrapper2 = _interopRequireDefault(_StoryWrapper);

var _BankForm = require('../BankForm');

var _BankForm2 = _interopRequireDefault(_BankForm);

require('../BankForm.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _storybook.storiesOf)('BankForm', module).addWithInfo('blank', function () {
  return _react2.default.createElement(
    _StoryWrapper2.default,
    null,
    _react2.default.createElement(_BankForm2.default, {
      onSubmit: (0, _storybook.action)('onSubmit')
    })
  );
}).addWithInfo('valid', function () {
  var STRIPE_TEST_ACCOUNT = '000123456789';
  var STRIPE_TEST_ROUTING = '110000000';
  return _react2.default.createElement(
    _StoryWrapper2.default,
    null,
    _react2.default.createElement(_BankForm2.default, {
      onSubmit: (0, _storybook.action)('onSubmit'),
      defaultValues: {
        name: 'Loren',
        accountNumber: STRIPE_TEST_ACCOUNT,
        routingNumber: STRIPE_TEST_ROUTING
      }
    })
  );
}).addWithInfo('invalid', function () {
  return _react2.default.createElement(
    _StoryWrapper2.default,
    null,
    _react2.default.createElement(_BankForm2.default, {
      onSubmit: (0, _storybook.action)('onSubmit'),
      defaultValues: {
        name: 'Loren',
        accountNumber: 'invalid',
        routingNumber: '110000003'
      }
    })
  );
});