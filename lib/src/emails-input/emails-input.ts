import { create, toArray, removeElementFromDOM, getRandomKey } from './utils';
import { StateEmail, EventWithTarget, State, UserOptions } from './types';
import createBlock from './block/block';
import createInput from './input/input';
import { EMAIL_MASK, EMAILS_INPUT_CLASS, BLOCK_CLASS, DELETE_BUTTON_CLASS } from './constants';
import './emails-input.styles.less';

export default class EmailsInput {
  /**
   * Component DOM instance.
   */
  readonly emailsInput: HTMLDivElement = create('div', { class: EMAILS_INPUT_CLASS });

  /**
   * Set of user observers.
   */
  private observers: Function[] = [];

  /**
   * State of emails.
   */
  private state: State = { emails: [] };

  constructor(wrapper: HTMLElement, options?: UserOptions) {
    if (!(wrapper instanceof HTMLElement)) throw new Error('First argument must be HTMLElement');
    this.render(wrapper, options);
  }

  /**
   * Add user email.
   * @param email
   */
  addEmail(email: string): void {
    email = email.replace(/\s|,/g, '');

    if (!email) return;

    const isValid = this.checkIsValidEmail(email);
    const key = getRandomKey();
    const block = createBlock(email, key, isValid);
    this.emailsInput.insertBefore(block, this.emailsInput.lastChild);

    this.state.emails.push({ value: email, isValid, key });
    this.fireObservers();
  }

  /**
   * Get all emails from state.
   */
  getAllEmails(): StateEmail[] {
    return [...this.state.emails];
  }

  /**
   * Replace all emails from state with user emails set.
   * @param emails
   */
  replaceEmails(emails: string[]) {
    const blocks = this.emailsInput.getElementsByClassName(BLOCK_CLASS);

    toArray(blocks).forEach(block => removeElementFromDOM(block));
    this.state.emails.length = 0;

    emails.forEach(email => this.addEmail(email));
  }

  /**
   * Add user observer.
   * @param callback
   */
  addObserver(callback: Function) {
    this.observers.push(callback);
  }

  /**
   * Remove user observer.
   * @param callback
   */
  removeObserver(callback: Function) {
    this.observers = this.observers.filter(obs => obs !== callback);
  }

  /**
   * Render emails-input component to user wrapper with user options.
   * @param wrapper
   * @param options
   */
  private render(wrapper: HTMLElement, options?: UserOptions) {
    const input = createInput(this.handleInputKeyup, this.handleInputBlur, this.handleInputPaste, options);
    this.emailsInput.appendChild(input);

    // delegate event of removing block.
    this.emailsInput.addEventListener('click', this.handleBlockDelete);

    wrapper.appendChild(this.emailsInput);
  }

  /**
   * Check is current email valid.
   * @param email
   */
  private checkIsValidEmail(email: string): boolean {
    return EMAIL_MASK.test(email);
  }

  /**
   * Fire user observers.
   */
  private fireObservers() {
    this.observers.forEach(obs => obs.call(null, [...this.state.emails]));
  }

  /**
   * Handle on keyup event.
   * @param e
   */
  private handleInputKeyup = (e: EventWithTarget<KeyboardEvent>) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      this.addEmail(e.target.value);
      e.target.value = '';
    }
  };

  /**
   * Handle on blur event.
   * @param e
   */
  private handleInputBlur = (e: EventWithTarget<FocusEvent>) => {
    this.addEmail(e.target.value);
    e.target.value = '';
  };

  /**
   * Handle on paste event.
   * @param e
   */
  private handleInputPaste = (e: EventWithTarget<ClipboardEvent>) => {
    const value = (e.clipboardData || (window as any).clipboardData).getData('text');
    value.split(',').forEach(value => this.addEmail(value));

    // stop pasting text in the input.
    e.preventDefault();
  };

  /**
   * Handle on delete email-block.
   * @param e
   */
  private handleBlockDelete = (e: EventWithTarget<MouseEvent, HTMLDivElement>) => {
    if (e.target.classList.contains(DELETE_BUTTON_CLASS)) {
      const block: HTMLElement | false = e.target.parentElement.classList.contains(BLOCK_CLASS) && e.target.parentElement;
      if (block) {
        const key: string = block.dataset.key;
        this.state.emails = this.state.emails.filter(email => email.key !== key);
        removeElementFromDOM(block);
        this.fireObservers();
      }
    }
    e.stopPropagation();
  };
}
