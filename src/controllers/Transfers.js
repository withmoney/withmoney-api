import { Transfers } from '../models';
import * as Controller from './Controller';
import { transferForm } from '../definitions';

export const list = (req, res) => Controller.list(req, res, Transfers);

export const create = (req, res) => Controller.create(req, res, Transfers, transferForm);

export const get = async (req, res) => Controller.get(req, res, Transfers);

export const update = (req, res) => Controller.update(req, res, Transfers, transferForm);

export const destroy = (req, res) => Controller.destroy(req, res, Transfers);
