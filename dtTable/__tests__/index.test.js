import sum from '../src';

test('sum', () => {
  expect(sum(2, 3)).toEqual('5');
  expect(sum(-2, 2)).toEqual(0);
});
