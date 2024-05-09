import Tree from "./tree.mjs";

const array = createRandomArray();
const tree = new Tree(array);
console.log(tree.isBalanced());
tree.prettyPrint();
console.log(tree.levelOrderCallback());
console.log(tree.preOrderTraversal());
console.log(tree.inOrderTraversal());
console.log(tree.postOrderTraversal());
tree.insertNode(105);
tree.insertNode(107);
tree.insertNode(108);
tree.insertNode(109);
tree.insertNode(110);
tree.insertNode(120);
tree.insertNode(115);
tree.insertNode(113);
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
tree.prettyPrint();
console.log(tree.levelOrderCallback());
console.log(tree.preOrderTraversal());
console.log(tree.inOrderTraversal());
console.log(tree.postOrderTraversal());

function createRandomArray() {
  const maxNumberSize = 100;
  const array = [];
  let size = 25;

  while (size > 0) {
    const value = Math.floor(Math.random() * maxNumberSize);
    array.push(value);
    size -= 1;
  }

  return array;
}
