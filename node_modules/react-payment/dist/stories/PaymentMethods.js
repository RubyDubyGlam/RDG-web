'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storybook = require('@kadira/storybook');

var _PaymentMethods = require('../PaymentMethods');

var _PaymentMethods2 = _interopRequireDefault(_PaymentMethods);

var _StoryWrapper = require('./StoryWrapper');

var _StoryWrapper2 = _interopRequireDefault(_StoryWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var banks = [{
  id: '1',
  last4: '6789'
}, {
  id: '2',
  last4: '1234'
}];

var cards = [{
  id: '3',
  last4: '0987',
  brand: 'Visa'
}, {
  id: '4',
  last4: '1111',
  brand: 'Discover'
}];

(0, _storybook.storiesOf)('PaymentMethods', module).addWithInfo('full', function () {
  return getMethods(banks, cards);
}).addWithInfo('empty', function () {
  return getMethods();
}).addWithInfo('with cards', function () {
  return getMethods(null, cards);
}).addWithInfo('with banks', function () {
  return getMethods(banks);
}).addWithInfo('cards only', function () {
  return _react2.default.createElement(
    _StoryWrapper2.default,
    null,
    _react2.default.createElement(_PaymentMethods2.default, {
      showCards: true,
      showBanks: false,
      cards: cards,
      onAddCard: (0, _storybook.action)('onAddCard'),
      onRemoveCard: (0, _storybook.action)('onRemoveCard')
    })
  );
});

var getMethods = function getMethods(banks, cards) {
  return _react2.default.createElement(
    _StoryWrapper2.default,
    null,
    _react2.default.createElement(_PaymentMethods2.default, {
      showCards: true,
      showBanks: true,
      cards: cards,
      banks: banks,
      onAddCard: (0, _storybook.action)('onAddCard'),
      onAddBank: (0, _storybook.action)('onAddBank'),
      onRemoveCard: (0, _storybook.action)('onRemoveCard'),
      onRemoveBank: (0, _storybook.action)('onRemoveBank')
    })
  );
};