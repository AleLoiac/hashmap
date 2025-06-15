import { LinkedList } from "@aleloiac/linked-list/LinkedList";

export class HashMap {
  capacity = 16;
  loadFactor = 0.75;

  constructor(capacity = this.capacity, loadFactor = this.loadFactor) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.loadLevel = 0;
    this.buckets = new Array(capacity);

    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i] = new LinkedList();
    }
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const element = {
      key,
      value,
    };

    const hashedKey = this.hash(key);
    const bucket = this.buckets[hashedKey];

    let tmp = bucket.head;

    while (tmp !== null) {
      if (tmp.value.key === key) {
        tmp.value.value = value;
        return;
      }
      tmp = tmp.nextNode;
    }

    bucket.append(element);
    this.loadLevel++;

    // check loadLevel vs loadFactor/capacity
    // if bigger -> double array
    // hash again all keys
  }

  get(key) {
    const hashedKey = this.hash(key);
    const bucket = this.buckets[hashedKey];

    let tmp = bucket.head;

    while (tmp !== null) {
      if (tmp.value.key === key) {
        return tmp.value.value;
      }
      tmp = tmp.nextNode;
    }

    return null;
  }

  has(key) {
    const hashedKey = this.hash(key);
    const bucket = this.buckets[hashedKey];

    let tmp = bucket.head;

    while (tmp !== null) {
      if (tmp.value.key === key) {
        return true;
      }
      tmp = tmp.nextNode;
    }

    return false;
  }

  remove(key) {
    const hashedKey = this.hash(key);
    const bucket = this.buckets[hashedKey];

    let current = bucket.head;
    let index = 0;

    while (current !== null) {
      if (current.value.key === key) {
        bucket.removeAt(index);
        this.loadLevel--;
        return true;
      }
      current = current.nextNode;
      index++;
    }

    return false;
  }

  length() {
    return this.loadLevel;
  }

  clear() {
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i].head = null;
    }
    this.loadLevel = 0;
  }

  keys() {
    const arrayOfKeys = [];

    for (let i = 0; i < this.capacity; i++) {
      const bucket = this.buckets[i];
      let tmp = bucket.head;

      while (tmp !== null) {
        arrayOfKeys.push(tmp.value.key);
        tmp = tmp.nextNode;
      }
    }

    return arrayOfKeys;
  }

  values() {
    const arrayOfValues = [];

    for (let i = 0; i < this.capacity; i++) {
      const bucket = this.buckets[i];
      let tmp = bucket.head;

      while (tmp !== null) {
        arrayOfValues.push(tmp.value.value);
        tmp = tmp.nextNode;
      }
    }

    return arrayOfValues;
  }

  entries() {
    const arrayOfEntries = [];

    for (let i = 0; i < this.capacity; i++) {
      const bucket = this.buckets[i];
      let tmp = bucket.head;

      while (tmp !== null) {
        const entry = [];
        entry.push(tmp.value.key, tmp.value.value);
        arrayOfEntries.push(entry);
        tmp = tmp.nextNode;
      }
    }

    return arrayOfEntries;
  }
}
