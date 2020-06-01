import createInput from '../input';
import { INPUT_CLASS } from '../../constants';
import { UserOptions } from '../../types';

describe('Input component', () => {
  const callback = () => {};

  test('it should create Input component', () => {
    expect(createInput(callback, callback, callback).classList.contains(INPUT_CLASS)).toBeTruthy();
  });

  test('it should create Input component with options', () => {
    const options: UserOptions = { inputPlaceholder: 'blabla' };
    expect(createInput(callback, callback, callback, options).placeholder).toEqual(options.inputPlaceholder);
  });
});
