class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface IList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  addElByIndex: (element: T, position: number) => void;
  removeElByIndex: (position: number) => void;
  getSize: () => number;
  toArr: () => void;
  removeTail: () => void;
  removeHead: () => void;
}

export class List<T> implements IList<T> {
  private tail: Node<T> | null;
  private size: number;
  private head: Node<T> | null;
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  addElByIndex(el: T, index: number) {
    const node = new Node<T>(el);
    let previousNode: Node<T> | null = null;
    if (index === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let curr = this.head;
      let currIndex = 0;
      while (currIndex < index && curr) {
        currIndex++;
        previousNode = curr;
        curr = curr.next;
      }
      node.next = curr;
      if (previousNode) previousNode.next = node;
    }

    this.size++;
  }

  removeElByIndex(index: number) {
    let current = this.head;
    if (index === 0 && current) {
      this.head = current.next;
    } else {
      let prev = null;
      let position = 0;
      while (position < index && current) {
        prev = current;
        current = current.next;
        position++;
      }
      if (prev && current) prev.next = current.next;
    }
    this.size--;
  }

  prepend(element: T) {
    const node = new Node(element, this.head);
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    this.size++;
    return this;
  }

  removeHead() {
    if (!this.head) return;
    let newHead = this.head.next;
    this.head = newHead;
    this.size--;
    return this;
  }

  append(value: T) {
    const node = new Node(value);
    if (!this.head || !this.tail) {
      this.size++;
      this.head = node;
      this.tail = node;
      return this;
    }
    this.tail.next = node;
    this.tail = node;
    this.size++;
    return this;
  }

  removeTail() {
    if (!this.tail) return;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    }

    let current = this.head;
    while (current?.next) {
      if (!current.next.next) {
        current.next = null;
      } else {
        current = current.next;
      }
    }
    this.tail = current;
    this.size--;
  }

  toArr() {
    const nodes = [];
    let current = this.head;
    while (current) {
      nodes.push(current);
      current = current.next;
    }
    return nodes;
  }

  getSize() {
    return this.size;
  }
}
