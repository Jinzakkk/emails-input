import EmailsInput from './../emails-input';
import { EMAILS_INPUT_CLASS, DELETE_BUTTON_CLASS } from '../constants';

describe('EmailsInput component', () => {
  let emailsInputComponent: EmailsInput;

  beforeEach(() => {
    const wrapper = document.createElement('div');
    document.body.appendChild(wrapper);
    emailsInputComponent = new EmailsInput(wrapper);
  });

  afterEach(() => {
    emailsInputComponent.emailsInput.remove();
    emailsInputComponent = null;
  });

  const dispatchClickOnDeleteButton = (key: string) => {
    (document.querySelector(`[data-key="${key}"] .${DELETE_BUTTON_CLASS}`) as HTMLSpanElement).click();
  };

  test('it should render EmailsInput component', () => {
    expect(emailsInputComponent.emailsInput.classList.contains(EMAILS_INPUT_CLASS)).toBeTruthy();
  });

  test('it should return added valid email', () => {
    const email = 'bla@bla.com';

    emailsInputComponent.addEmail(email);
    const result = emailsInputComponent.getAllEmails()[0];

    expect(result.value).toEqual(email);
    expect(result.isValid).toBeTruthy();
  });

  test('it should return added invalid email', () => {
    const email = 'blabla';

    emailsInputComponent.addEmail(email);
    const result = emailsInputComponent.getAllEmails()[0];

    expect(result.value).toEqual(email);
    expect(result.isValid).toBeFalsy();
  });

  test('it should return replaced emails', () => {
    const email = 'blabla';
    const replacedEmails = ['bla@bla.com', 'baz@baz.com'];

    emailsInputComponent.addEmail(email);
    emailsInputComponent.replaceEmails(replacedEmails);
    const result = emailsInputComponent.getAllEmails();

    expect(result.length).toEqual(replacedEmails.length);
    replacedEmails.forEach((email, i) => expect(result[i].value).toEqual(email));
  });

  test('it should fire added observer', () => {
    const email = 'blabla';
    const callback = jest.fn();

    emailsInputComponent.addObserver(callback);
    emailsInputComponent.addEmail(email);
    emailsInputComponent.addEmail(email);

    expect(callback).toBeCalledTimes(2);
  });

  test('it should not fire added observer', () => {
    const email = 'blabla';
    const callback = jest.fn();

    emailsInputComponent.addObserver(callback);
    emailsInputComponent.addEmail(email);
    emailsInputComponent.removeObserver(callback);
    emailsInputComponent.addEmail(email);

    expect(callback).toBeCalledTimes(1);
  });

  test('is should delete one of the equals added emails', () => {
    const emails = ['bla@bla.com', 'bla@bla.com'];

    emailsInputComponent.replaceEmails(emails);
    const removingEmail = emailsInputComponent.getAllEmails()[1];
    dispatchClickOnDeleteButton(removingEmail.key);
    const result = emailsInputComponent.getAllEmails();

    expect(result.length).toEqual(1);
    expect(result[0].value).toEqual(emails[0]);
  });
});
