export default class BinaryHeap {
  constructor(data, comparator) {
    this.data = data;
    this.comparator = comparator;
  }

  insert(v) {
    this.data.push(v);
    let idx = this.data.length - 1;
    let pIdx = Math.floor((idx - 1) / 2);
    while (pIdx >= 0 && this.comparator(v, this.data[pIdx]) < 0) {
      this.data[idx] = this.data[pIdx];
      this.data[pIdx] = v;
      idx = pIdx;
      pIdx = Math.floor((idx - 1) / 2);
    }
  }

  take() {
    let v = this.data[0];
    this.data[0] = this.data[this.data.length - 1];
    this.data.pop();
    let idx = 0;
    while (idx * 2 + 1 < this.data.length) {
      let leftIdx = idx * 2 + 1;
      let rightIdx = idx * 2 + 2;
      let minIdx =
        rightIdx >= this.data.length || this.comparator(this.data[leftIdx], this.data[rightIdx]) < 0
          ? leftIdx
          : rightIdx;
      if (this.comparator(this.data[minIdx], this.data[idx]) > 0) {
        break;
      } else {
        let temp = this.data[minIdx];
        this.data[minIdx] = this.data[idx];
        this.data[idx] = temp;
      }
      idx = minIdx;
    }
    return v;
  }
}
