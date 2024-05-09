import Node from "./node.mjs";

export default class Tree {
  constructor(initialArray) {
    this.root = this.buildTree(initialArray);
  }

  buildTree(initialArray) {
    if (initialArray.length === 0 || !Array.isArray(initialArray)) return null;

    const sortedArray = [...new Set(initialArray)].sort((a, b) => a - b);
    return this.createTree(sortedArray, 0, sortedArray.length - 1);
  }

  createTree(array, start, end) {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);
    node.left = this.createTree(array, start, mid - 1);
    node.right = this.createTree(array, mid + 1, end);

    return node;
  }

  insertNode(value) {
    const newNode = new Node(value);

    if (this.root === null) {
      return (this.root = newNode);
    }

    let node = this.root;

    while (node !== null) {
      if (value === node.value) {
        throw new Error("Duplicate value");
      }
      if (value > node.value) {
        if (node.right === null) {
          return (node.right = newNode);
        }
        node = node.right;
      } else {
        if (node.left === null) {
          return (node.left = newNode);
        }
        node = node.left;
      }
    }
  }
  deleteNode(value) {
    if (this.root === null) return null;
    let node = this.root;

    if (value > node.value) {
      node.right = this.deleteNode(node.right);
    } else if (value < node.value) {
      node.left = this.deleteNode(node.left);
    } else {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      const minValue = this.getMinValue(node.right);
      node.value = minValue;
      node.right = this.deleteNode(minValue);
    }

    return node;
  }
  getMinValue(node) {
    let minValue = node.value;
    while (node !== null) {
      if (minValue > node.value) {
        minValue = node.value;
      }
      node = node.left;
    }

    return minValue;
  }
}
