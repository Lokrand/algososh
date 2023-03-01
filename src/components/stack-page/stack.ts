interface IStack<T> {
  clear: () => void;
  pop: () => void;
  getSize: () => number;
  push: (item: T) => void;
  peek: () => T | null;
}

export class Stack<T> implements IStack<T> {
  container: T[] = [];

  clear = () => (this.container = []);
  pop = () => this.container.pop();
  getSize = () => this.container.length;
  push = (item: T) => this.container.push(item);
  peek = () => {
    if (this.container.length > 0) {
      return this.container[this.container.length - 1];
    } else return null;
  };
}