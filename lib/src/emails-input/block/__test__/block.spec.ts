import createBlock from '../block';
import { getRandomKey } from '../../utils';
import { DELETE_BUTTON_CLASS, BLOCK_IS_VALID_CLASS, BLOCK_ISNOT_VALID_CLASS } from '../../constants';

describe('Block component', () => {
  const email = 'bla@bla.com';
  const key = getRandomKey();

  test('it should create Block component with email', () => {
    expect(createBlock(email, key, true).textContent).toEqual(email);
  });

  test('it should create Block component with key', () => {
    expect(createBlock(email, key, true).dataset.key).toEqual(key);
  });

  test('it should create valid Block component', () => {
    expect(createBlock(email, key, true).classList.contains(BLOCK_IS_VALID_CLASS)).toBeTruthy();
  });

  test('it should create invalid Block component', () => {
    expect(createBlock(email, key, false).classList.contains(BLOCK_ISNOT_VALID_CLASS)).toBeTruthy();
  });

  test('it should create Block component and contains Delete button', () => {
    expect(createBlock(email, key, true).firstElementChild.classList.contains(DELETE_BUTTON_CLASS)).toBeTruthy();
  });
});
