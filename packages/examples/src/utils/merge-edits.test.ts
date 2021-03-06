import {
  diff3MergeStringRanges,
  diff3MergeStrings,
  sliceRanges,
} from './merge-edits';

describe('diff3MergeStrings', () => {
  it('works with one-sided change', () => {
    expect(diff3MergeStrings('', 'hello', '')).toEqual('hello');
  });
  it('merges non-conflicting adds', () => {
    expect(diff3MergeStrings('word.', 'hello. word.', 'word. bye.')).toEqual(
      'hello. word. bye.',
    );
  });
  it('merges conflicting adds', () => {
    expect(diff3MergeStrings('', 'hello', 'world')).toEqual('helloworld');
  });
  it('merges non-conflicting deletes', () => {
    expect(diff3MergeStrings('one two three', 'one two', 'two three')).toEqual(
      'two',
    );
  });
  it('merges conflicting deletes 1', () => {
    expect(
      diff3MergeStrings('one two three', 'one three', 'two three'),
    ).toEqual('three');
  });
  it('merges conflicting deletes 2', () => {
    expect(diff3MergeStrings('one two three', 'one two', 'two three')).toEqual(
      'two',
    );
  });
  it('merges conflicting edits 1', () => {
    expect(diff3MergeStrings('two', 'one', 'two three')).toEqual('one three');
  });
  it('merges semi non-conflicting adds', () => {
    // This might seem counter-intuitive, but it works
    expect(diff3MergeStrings('', 'subtitle1111', 'subtitle2222')).toEqual(
      'subtitle1111subtitle2222',
    );
  });
});

describe('sliceRanges', () => {
  it('slices from 0', () => {
    expect(
      sliceRanges<string>([{ start: 2, end: 4, value: 'value' }], 0, 5),
    ).toEqual([{ start: 2, end: 4, value: 'value' }]);
  });
  it('slices from 2', () => {
    expect(
      sliceRanges<string>([{ start: 2, end: 4, value: 'value' }], 2, 5),
    ).toEqual([{ start: 0, end: 2, value: 'value' }]);
  });
  it('slices from 3', () => {
    expect(
      sliceRanges<string>([{ start: 2, end: 4, value: 'value' }], 3, 5),
    ).toEqual([{ start: 0, end: 1, value: 'value' }]);
  });
  it('slices multiples', () => {
    expect(
      sliceRanges<string>(
        [
          { start: 2, end: 4, value: 'value' },
          { start: 4, end: 10, value: 'value2' },
          { start: 10, end: 15, value: 'value3' },
        ],
        3,
        6,
      ),
    ).toEqual([
      { end: 1, start: 0, value: 'value' },
      { end: 3, start: 1, value: 'value2' },
    ]);
  });
});
describe('diff3MergeStrings', () => {
  it('works with one-sided change', () => {
    expect(
      diff3MergeStringRanges(
        '',
        'hello',
        '',
        [],
        [{ start: 5, end: 5, value: 'cursorA' }],
        [{ start: 0, end: 0, value: 'cursorB' }],
      ),
    ).toEqual({
      text: 'hello',
      ranges: [{ end: 5, start: 5, value: 'cursorA' }],
    });
  });
  it('merges non-conflicting adds', () => {
    expect(
      diff3MergeStringRanges(
        'word.',
        'hello. word.',
        'word. bye.',
        [{ start: 0, end: 4, value: 'BOLD' }],
        [{ start: 6, end: 6, value: 'cursorA' }],
        [{ start: 10, end: 10, value: 'cursorB' }],
      ),
    ).toEqual({
      text: 'hello. word. bye.',
      ranges: [
        { end: 6, start: 6, value: 'cursorA' },
        { end: 11, start: 7, value: 'BOLD' },
        { end: 17, start: 17, value: 'cursorB' },
      ],
    });
  });
});
