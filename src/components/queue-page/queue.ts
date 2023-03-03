interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  clear: () => void;
  peek: () => T | null;
}

export class Queue<T> implements IQueue<T> {
  container: (T | null)[] = [];
  head = 0;
  tail = 0;
  readonly size = 7;
  length = 0;

  constructor() {
    this.container = new Array(7).fill(null);
  }

  enqueue = (item: T) => {
    this.length++;
    this.container[this.tail++] = item;
  };

  dequeue = () => {
    this.length--;
    let item = this.container[this.head++];
    const prev = this.head - 1;
    this.container[prev] = null;
    return item;
  };

  clear = () => {
    this.length = 0;
    this.head = 0;
    this.tail = 0;
    this.container = new Array(this.size).fill(null);
  };

  peek = () => this.container[this.head % this.length];
  isEmpty = () => this.length === 0;

  get elements() {
    return this.container;
  }
}
