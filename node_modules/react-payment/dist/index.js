'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentMethods = exports.BankForm = exports.CardForm = undefined;

var _CardForm2 = require('./CardForm');

var _CardForm3 = _interopRequireDefault(_CardForm2);

var _BankForm2 = require('./BankForm');

var _BankForm3 = _interopRequireDefault(_BankForm2);

var _PaymentMethods2 = require('./PaymentMethods');

var _PaymentMethods3 = _interopRequireDefault(_PaymentMethods2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.CardForm = _CardForm3.default;
exports.BankForm = _BankForm3.default;
exports.PaymentMethods = _PaymentMethods3.default;