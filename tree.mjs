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
      results.push(node.value);

      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }

    return results;
  }
  inOrderTraversal(callback = null, node = this.root) {
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
  inOrderRecursive(callback = null, node = this.root, results = []) {
    if (node !== null) {
      this.inOrderRecursive(callback, node.left, results);
      if (typeof callback === "function") callback(node);
      results.push(node);
      this.inOrderRecursive(callback, node.right, results);
    }
    return results;
  }
  preOrderTraversal(callback = null, node = this.root) {
    if (node === null) return [];
    const results = [];
    const stack = [node];

    while (stack.length > 0) {
      const poppedNode = stack.pop();
      if (typeof callback === "function") callback(poppedNode);
      results.push(poppedNode.value);

      if (poppedNode.right !== null) {
        stack.push(poppedNode.right);
      }
      if (poppedNode.left !== null) {
        stack.push(poppedNode.left);
      }
    }

    return results;
  }

  preOrderRecursive(callback = null, node = this.root, results = []) {
    if (node !== null) {
      if (typeof callback === "function") callback(node);
      results.push(node);
      this.preOrderRecursive(callback, node.left, results);
      this.preOrderRecursive(callback, node.right, results);
    }
    return results;
  }

  postOrderTraversal(callback = null, node = this.root) {
    if (node === null) return [];
    const results = [];
    const stack = [];
    let temp = node;
    let lastVisited = null;

    while (stack.length > 0 || temp !== null) {
      if (temp !== null) {
        stack.push(temp);
        temp = temp.left;
      } else {
        let peekNode = stack[stack.length - 1];
        if (peekNode.right !== null && lastVisited !== peekNode.right) {
          temp = peekNode.right;
        } else {
          let poppedNode = stack.pop();
          if (typeof callback === "function") callback(poppedNode);
          results.push(poppedNode.value);
          lastVisited = poppedNode;
          temp = null;
        }
      }
    }
    return results;
  }

  postOrderRecursive(callback = null, node = this.root, results = []) {
    if (node !== null) {
      this.preOrderRecursive(callback, node.left, results);
      this.preOrderRecursive(callback, node.right, results);
      if (typeof callback === "function") callback(node);
      results.push(node);
    }
    return results;
  }

  getHeight(node = this.root) {
    if (node === null) return -1;

    let left = this.getHeight(node.left);
    let right = this.getHeight(node.right);

    return Math.max(left, right) + 1;
  }

  getDepth(searchNode, rootNode = this.root) {
    if (rootNode === null || searchNode) {
      return -1;
    }

    if (searchNode.value > rootNode.value) {
      let depth = this.getDepth(searchNode, rootNode.right);
      return depth === -1 ? -1 : depth + 1;
    } else if (searchNode.value < rootNode.value) {
      let depth = this.getDepth(searchNode, rootNode.left);
      return depth === -1 ? null : depth + 1;
    } else return 0;
  }

  isBalanced(node = this.root) {
    if (node === null) return true;

    let leftHeight = this.getHeight(node.left);
    let rightHeight = this.getHeight(node.right);

    let heightDifference = Math.abs(leftHeight - rightHeight) <= 1;
    let leftBalanced = this.isBalanced(node.left);
    let rightBalanced = this.isBalanced(node.right);

    return heightDifference && leftBalanced && rightBalanced;
  }

  rebalance() {
    const previousTreeToArray = this.levelOrderCallback();
    this.root = this.buildTree(previousTreeToArray);

    return this.root;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

const test = new Tree([
  1, 2, 4, 5, 6, 7, 8, 9, 11, 13, 14, 18, 20, 19, 15, 10, 12, 24, 48, 56,
]);
