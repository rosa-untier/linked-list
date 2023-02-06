/**
 * @module
 * A linked list able to contain arbitrary data.
 * By implementing Symbol.iterator you can iterate through the list with for..of
 *
 * @example
 * ```ts
 * const myList = new LinkedList([1, 2, 3])
 * for ( const item of myList ){
 *   // do something
 * }
 */
export class LinkedList<T> {
  private items: Set<ListItem<T>> = new Set();
  private first?: ListItem<T>;
  private last?: ListItem<T>;

  constructor(list: Array<T> = []) {
    for (const item of list) this.push(item);
  }

  /**
   * returns the length of the linked list
   */
  get length(): number {
    return this.items.size;
  }

  /**
   * adds the item at the end of the list
   *
   * @param item the item to add
   * @returns the linked list
   */
  push(item: T): this {
    const newItem = new ListItem(item);
    const previousItem = this.last;
    if (previousItem) {
      previousItem.next = newItem;
      newItem.prev = previousItem;
    }
    if (!this.length) this.first = newItem;
    this.last = newItem;
    this.items.add(newItem);
    return this;
  }

  /**
   * adds the item at the beginning of the list
   *
   * @param item the item to be added
   * @returns the linked list
   */
  unshift(item: T): this {
    const newItem = new ListItem(item);
    const currentFirstItem = this.first;

    if (currentFirstItem) {
      currentFirstItem.prev = newItem;
      newItem.next = currentFirstItem;
    }
    if (!this.length) this.last = newItem;
    this.first = newItem;
    this.items.add(newItem);
    return this;
  }

  /**
   * inserts the item after the `after` item
   *
   * @param param0
   * @returns the linked list
   */
  insertAfter({ item, after }: { item: T; after: ListItem<T> }): this {
    if (after === this.last) this.push(item);
    else {
      const newItem = new ListItem(item);
      newItem.prev = after;
      newItem.next = after.next;

      if (newItem.next) newItem.next.prev = newItem;
      newItem.prev.next = newItem;
      this.items.add(newItem);
    }
    return this;
  }

  /**
   * inserts the item before the `before` item
   *
   * @param param0
   * @returns the linked list
   */
  insertBefore({ item, before }: { item: T; before: ListItem<T> }): this {
    if (before === this.first) this.unshift(item);
    else {
      const newItem = new ListItem(item);
      newItem.prev = before.prev;
      newItem.next = before;

      if (newItem.prev) newItem.prev.next = newItem;
      newItem.next.prev = newItem;
      this.items.add(newItem);
    }
    return this;
  }

  /**
   * returns an item at a given index
   *
   * @param index 0 based index
   * @returns the ListItem
   */
  get(index: number): ListItem<T> {
    if (index >= this.length) throw new Error("index exceeds size");
    if (index < 0) throw new Error("index is negative");

    let i = 0;

    for (const item of this) {
      if (i === index) return item;
      i++;
    }
    throw new Error("something went wrong");
  }

  /**
   * replaces an item in the list at a given index
   *
   * @param item the item to be setted
   * @param index the index at which to replace existing items
   * @returns the linked list
   */
  set(item: T, index: number): this {
    if (index >= this.length) throw new Error("index exceeds size");
    if (index < 0) throw new Error("index is negative");

    let i = 0;
    let current;
    for (const item of this) {
      if (i === index) {
        current = item;
        break;
      }
      i++;
    }
    if (!current) throw new Error("item not found");

    const newItem = new ListItem(item);
    newItem.next = current.next;
    newItem.prev = current.prev;

    if (current.next) current.next.prev = newItem;
    if (current.prev) current.prev.next = newItem;

    this.items.add(newItem);
    this.items.delete(current);
    return this;
  }

  /**
   * returns the linked list as array
   *
   * @returns the value of the ListItems as array
   */
  toArray(): T[] {
    const result: T[] = [];

    for (const item of this) {
      result.push(item.value);
    }

    return result;
  }

  /**
   * enables the linked lst to be iterated via for..of
   */
  *[Symbol.iterator](): Generator<ListItem<T>, void, unknown> {
    let currentItem = this.first;
    if (currentItem) yield currentItem;
    while (currentItem?.next) {
      currentItem = currentItem.next;
      yield currentItem;
    }
  }
}

export class ListItem<T> {
  private data: T;
  private previousItem?: ListItem<T>;
  private nextItem?: ListItem<T>;

  constructor(value: T) {
    this.data = value;
  }

  get next(): ListItem<T> | undefined {
    return this.nextItem;
  }

  set next(item: ListItem<T> | undefined) {
    this.nextItem = item;
  }

  get prev(): ListItem<T> | undefined {
    return this.previousItem;
  }

  set prev(item: ListItem<T> | undefined) {
    this.previousItem = item;
  }

  get value(): T {
    return this.data;
  }

  set value(value: T) {
    this.data = value;
  }
}
