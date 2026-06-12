// @ts-nocheck
test('check jest globals', () => {
  expect(typeof jest).toBe('object');
  expect(jest).toBeDefined();
});
