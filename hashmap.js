export class HashMap {
  capacity = 16;
  loadFactor = 0.75;

  constructor(capacity = this.capacity, loadFactor = this.loadFactor) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(capacity);
  }
}
