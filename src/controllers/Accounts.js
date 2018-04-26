import { Accounts } from '../models';
import * as Controller from './Controller';
import { accountForm } from '../definitions';

export const list = (req, res) => Controller.list(req, res, Accounts);

export const create = (req, res) => Controller.create(req, res, Accounts, accountForm);

export const get = async (req, res) => Controller.get(req, res, Accounts);

export const update = (req, res) => Controller.update(req, res, Accounts, accountForm);

export const destroy = (req, res) => Controller.destroy(req, res, Accounts);
