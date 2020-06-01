import { create } from '../utils';
import { DELETE_BUTTON_CLASS, BLOCK_CLASS, BLOCK_IS_VALID_CLASS, BLOCK_ISNOT_VALID_CLASS } from '../constants';

/**
 * Create a new Block component.
 * @param email Email.
 * @param key Email key.
 * @param isValid Flag, true is a valid email.
 */
export default function createBlock(email: string, key: string, isValid: boolean) {
  const deleteButton = create('span', { class: DELETE_BUTTON_CLASS });
  const block = create('span', {
    class: `${BLOCK_CLASS} ${isValid ? BLOCK_IS_VALID_CLASS : BLOCK_ISNOT_VALID_CLASS}`,
    'data-key': key,
  });
  block.textContent = email;
  block.appendChild(deleteButton);
  return block;
}
