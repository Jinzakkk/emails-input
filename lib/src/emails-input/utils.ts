import { Options } from './types';

/**
 * Create a new HTML element.
 * @param tag HTML tag.
 * @param options HTML attributes.
 */
export function create<T extends keyof HTMLElementTagNameMap>(tag: T, options?: Options): HTMLElementTagNameMap[T] {
  const element = document.createElement(tag);
  if (options) for (const attr in options) element.setAttribute(attr, options[attr]);
  return element;
}

/**
 * Transform HTMLCollection to array.
 * @param set HTML collection.
 */
export function toArray<T extends Element>(set: HTMLCollectionOf<T>): T[] {
  const arr = [];
  for (let i = 0; i < set.length; i++) arr.push(set[i]);
  return arr;
}

/**
 * Remove HTML element from DOM.
 * @param node HTML element.
 */
export function removeElementFromDOM(node: Element): void {
  node.parentNode.removeChild(node);
}
