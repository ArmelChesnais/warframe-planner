class PriorityQueue_Sorter<T> {
  queue: { item: T; priority: number }[];
  sorted: boolean;
  constructor() {
    console.log("PriorityQueue_Sorter constructor called");
    this.queue = [];
    this.sorted = false;
  }

  enqueue(item:T, priority:number) {
    this.queue.push({ item, priority });
    this.sorted = false;
    // this.queue.sort((a, b) => a.priority - b.priority); // Min-heap
  }

  noSortEnqueue(item:T, priority:number) {
    this.queue.push({ item, priority });
  }

  dequeue():T|undefined {
    if (!this.sorted) {
      this.sort();
      this.sorted = true;
    }
    return this.queue.shift()?.item;
  }

  sort() {
    this.queue.sort((a, b) => a.priority - b.priority); // Min-heap
  }

  isEmpty():boolean {
    return this.queue.length === 0;
  }
}

class PriorityQueue_Heap<T> {
  queue: Array<{item: T; priority: number}>;
  sorted: true;
  constructor() {
    console.log("PriorityQueue_Heap constructor called");
    this.queue = [];
    this.sorted = true;
  }

  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private getChildIndices(index: number): [number, number] {
    return [2 * index + 1, 2 * index + 2];
  }

  enqueue(item:T, priority: number):void {
    const newIndex = this.queue.length;
    this.queue.push({ item, priority });
    this.bubbleUp(newIndex);
  }

  bubbleUp(index: number): void {
    let currentIndex = index;
    while (currentIndex > 0) {
      const parentIndex = this.getParentIndex(currentIndex);
      const parentPriority = this.queue[parentIndex].priority;
      const currentPriority = this.queue[currentIndex].priority;
      if ( currentPriority < parentPriority ) {
        [this.queue[parentIndex], this.queue[currentIndex]] = [this.queue[currentIndex], this.queue[parentIndex]];
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }
      
  dequeue(): T | undefined {
    if (this.queue.length === 0) {
      return undefined;
    }
    const result = this.queue[0].item;
    const lastItem = this.queue.pop();
    if (this.queue.length > 0 && lastItem) {
      this.queue[0] = lastItem;
      this.bubbleDown(0);
    }
    return result;
  }

  bubbleDown(index: number): void {
    let currentIndex = index;
    const length = this.queue.length;
    while ( true ) {
      const [leftChildIndex, rightChildIndex] = this.getChildIndices(currentIndex);
      const leftPriority = leftChildIndex < length ? this.queue[leftChildIndex].priority : Infinity;
      const rightPriority = rightChildIndex < length ? this.queue[rightChildIndex].priority : Infinity;
      const currentPriority = this.queue[currentIndex].priority;

      if ( currentPriority <= leftPriority && currentPriority <= rightPriority ) {
        return;
      }
      
      if ( leftPriority <= rightPriority ) {
        [this.queue[currentIndex], this.queue[leftChildIndex]] = [this.queue[leftChildIndex], this.queue[currentIndex]];
        currentIndex = leftChildIndex;
      } else /*if ( rightPriority < leftPriority )*/ {
        [this.queue[currentIndex], this.queue[rightChildIndex]] = [this.queue[rightChildIndex], this.queue[currentIndex]];
        currentIndex = rightChildIndex;
      }
    }
  }

  sort() {}

  isEmpty(): boolean {
    return this.queue.length === 0;
  }
}

export { 
  PriorityQueue_Sorter,
  PriorityQueue_Heap,
  PriorityQueue_Heap as PriorityQueue
};