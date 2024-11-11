export const isString = (s: unknown): s is string => {
  return typeof s === 'string';
};

export const isFunction = (f: unknown): f is Function => {
  return typeof f === 'function';
};
