import { Transactions } from '../models';
import * as Controller from './Controller';
import { transactionForm } from '../definitions';

export const list = (req, res) => Controller.list(req, res, Transactions);

export const create = (req, res) => Controller.create(req, res, Transactions, transactionForm);

export const get = async (req, res) => Controller.get(req, res, Transactions);

export const update = (req, res) => Controller.update(req, res, Transactions, transactionForm);

export const destroy = (req, res) => Controller.destroy(req, res, Transactions);
