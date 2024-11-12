import { type FunType } from '../types';

export const isString = (s: unknown): s is string => {
  return typeof s === 'string';
};

export const isFunction = (f: unknown): f is FunType => {
  return typeof f === 'function';
};
