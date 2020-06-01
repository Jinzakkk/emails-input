export type Options = { [key: string]: string };

export type StateEmail = {
  value: string;
  isValid: boolean;
  key: string;
};

export type State = {
  emails: StateEmail[];
};

export type EventWithTarget<T extends Event, R = HTMLInputElement> = T & {
  readonly target: R;
};

export type UserOptions = {
  inputPlaceholder: string;
};
