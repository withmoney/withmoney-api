const express = {};

export const mock = {
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
  put: jest.fn(),
};

export const Router = jest.fn(() => mock);

export default express;
