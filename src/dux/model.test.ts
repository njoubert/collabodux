import { validateAndAddDefaults } from './model';

describe('validateAndAddDefaults', () => {
  it('handles empty object', () => {
    expect(validateAndAddDefaults({})).toEqual([
      { op: 'add', path: ['title'], value: '' },
      { op: 'add', path: ['subtitle'], value: '' },
      { op: 'add', path: ['todos'], value: [] },
      { op: 'add', path: ['users'], value: {} },
    ]);
  });

  it('handles non-empty object', () => {
    expect(
      validateAndAddDefaults({
        title: 'title',
        todos: [
          {
            done: false,
            label: 'hi',
          },
          {},
        ],
      }),
    ).toEqual([
      { op: 'add', path: ['todos', '1', 'done'], value: false },
      { op: 'add', path: ['todos', '1', 'label'], value: '' },
      { op: 'add', path: ['subtitle'], value: '' },
      { op: 'add', path: ['users'], value: {} },
    ]);
  });

  it('fails on type mismatch', () => {
    expect(() =>
      validateAndAddDefaults({
        title: 5,
      }),
    ).toThrow('Invalid value 5 supplied to : ModelState/title: string');
  });
});