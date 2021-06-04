import { asUtcIsoString } from './date';

describe('date helpers', () => {
  test('asUtcIsoString returns empty string for non date arguments', () => {
    expect(asUtcIsoString('05-10-2021')).toBe('');
    expect(asUtcIsoString(NaN)).toBe('');
  });
});
