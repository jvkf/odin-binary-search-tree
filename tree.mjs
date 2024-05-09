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
  deleteNode(value, node = this.root) {
    if (node === null) return null;

    if (value > node.value) {
      node.right = this.deleteNode(value, node.right);
    } else if (value < node.value) {
      node.left = this.deleteNode(value, node.left);
    } else {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      const minValue = this.getMinValue(node.right);
      node.value = minValue;
      node.right = this.deleteNode(minValue, node.right);
    }

    return node;
  }

  getMinValue(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current.value;
  }

  find(value, node = this.root) {
    if (node === null) return null;

    if (value > node.value) {
      return this.find(value, node.right);
    } else if (value < node.value) {
      return this.find(value, node.left);
    } else return node;
  }

  levelOrderCallback(callback = null, node = this.root) {
    if (node === null) return null;
    const results = [];
    const queue = [node];

    while (queue.length > 0) {
      const node = queue.shift();

      if (typeof callback === "function") {
        callback(node);
      }
      results.push(node);

      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }

    return results;
  }
  inorderTraversal(callback = null, node = this.root) {
    if (node === null) return [];
    const results = [];
    const stack = [];
    let temp = node;

    while (stack.length > 0 || temp !== null) {
      if (temp !== null) {
        stack.push(temp);
        temp = temp.left;
      } else {
        const poppedNode = stack.pop();
        if (typeof callback === "function") {
          callback(poppedNode);
        }
        results.push(poppedNode.value);
        temp = poppedNode.right;
      }
    }

    return results;
  }
  inorderRecursive(callback = null, node = this.root, results = []) {
    if (node !== null) {
      this.inorderRecursive(node.left);
      if (typeof callback === "function") callback(node);
      results.push(node);
      this.inorderRecursive(node.right);
    }
  }
}
