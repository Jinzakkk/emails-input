import { create } from '../utils';
import { INPUT_CLASS } from '../constants';
import { UserOptions } from '../types';

/**
 * Create a new Input component.
 * @param inputKeyup Callback on keyup event.
 * @param inputBlur Callback on blur event.
 * @param inputPaste Callback on paste event.
 * @param options User options.
 */
export default function createInput(
  inputKeyup: (e: KeyboardEvent) => void,
  inputBlur: (e: FocusEvent) => void,
  inputPaste: (e: ClipboardEvent) => void,
  options?: UserOptions
) {
  const placeholder = (options && options.inputPlaceholder) || 'add more people...';
  const input = create('input', { class: INPUT_CLASS, type: 'text', placeholder });
  input.addEventListener('keyup', inputKeyup);
  input.addEventListener('blur', inputBlur);
  input.addEventListener('paste', inputPaste);
  return input;
}
