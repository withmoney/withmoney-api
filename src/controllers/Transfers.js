import { Transfers } from '../models';
import * as Controller from './Controller';

export const list = (req, res) => Controller.list(req, res, Transfers);

export const a = true;
