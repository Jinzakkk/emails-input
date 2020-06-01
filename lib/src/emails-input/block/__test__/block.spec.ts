import createBlock from '../block';
import { DELETE_BUTTON_CLASS, BLOCK_IS_VALID_CLASS, BLOCK_ISNOT_VALID_CLASS } from '../../constants';

describe('Block component', () => {
  const email = 'bla@bla.com';

  test('it should create Block component with email', () => {
    expect(createBlock(email, true).textContent).toEqual(email);
  });

  test('it should create valid Block component', () => {
    expect(createBlock(email, true).classList.contains(BLOCK_IS_VALID_CLASS)).toBeTruthy();
  });

  test('it should create invalid Block component', () => {
    expect(createBlock(email, false).classList.contains(BLOCK_ISNOT_VALID_CLASS)).toBeTruthy();
  });

  test('it should create Block component and contains Delete button', () => {
    expect(createBlock(email, true).firstElementChild.classList.contains(DELETE_BUTTON_CLASS)).toBeTruthy();
  });
});
