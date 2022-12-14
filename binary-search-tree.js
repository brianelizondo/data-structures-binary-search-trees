class Node{
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class BinarySearchTree {
    constructor(root = null) {
        this.root = root;
    }

    /** insert(val): insert a new node into the BST with value val.
    * Returns the tree. Uses iteration. */
    insert(val){
        if(!this.root){
            this.root = new Node(val);
            return this;
        }

        let currentNode = this.root;
        let saveNode = true;
        while(saveNode){
            if(val > currentNode.val){
                if(!currentNode.right){
                    currentNode.right = new Node(val);
                    saveNode = false;
                    return this;
                }else{
                    currentNode = currentNode.right;
                }
            }else{
                if(!currentNode.left){
                    currentNode.left = new Node(val);
                    saveNode = false;
                    return this;
                }else{
                    currentNode = currentNode.left;
                }
            }
        }
    }

    /** insertRecursively(val): insert a new node into the BST with value val.
    * Returns the tree. Uses recursion. */
    insertRecursively(val, currentNode = this.root){
        if(!this.root){
            this.root = new Node(val);
            return this;
        }

        if(val > currentNode.val){
            if(!currentNode.right){
                currentNode.right = new Node(val);
                return this;
            }else{
                this.insertRecursively(val, currentNode.right);
            }
        }else{
            if(!currentNode.left){
                currentNode.left = new Node(val);
                return this;
            }else{
                this.insertRecursively(val, currentNode.left);
            }
        }
    }

    /** find(val): search the tree for a node with value val.
    * return the node, if found; else undefined. Uses iteration. */
    find(val){
        let currentNode = this.root;
        while(currentNode){
            if(currentNode.val === val) return currentNode;
            if(currentNode.val > val){
                currentNode = currentNode.left;
            }else{
                currentNode = currentNode.right;
            }
        }
    }

    /** findRecursively(val): search the tree for a node with value val.
    * return the node, if found; else undefined. Uses recursion. */
    findRecursively(val, currentNode = this.root){
        if(currentNode === null) return undefined;
        
        if(currentNode.val === val) return currentNode;
       
        if(currentNode.val > val){
            return this.findRecursively(val, currentNode.left);
        }else{
            return this.findRecursively(val, currentNode.right);
        }
    }

    /** dfsPreOrder(): Traverse the array using pre-order DFS.
    * Return an array of visited nodes. */
    dfsPreOrder(){
        let visitedNodes = [];

        function traversePreOrder(currentNode){
            visitedNodes.push(currentNode.val);
            if(currentNode.left) traversePreOrder(currentNode.left);
            if(currentNode.right) traversePreOrder(currentNode.right);
        }
        
        traversePreOrder(this.root);
        return visitedNodes;
    }

    /** dfsInOrder(): Traverse the array using in-order DFS.
    * Return an array of visited nodes. */
    dfsInOrder(){
        let visitedNodes = [];
        function traverseInOrder(currentNode){
            if(currentNode.left) traverseInOrder(currentNode.left);
            visitedNodes.push(currentNode.val);
            if(currentNode.right) traverseInOrder(currentNode.right);
        }

        traverseInOrder(this.root);
        return visitedNodes;
    }

    /** dfsPostOrder(): Traverse the array using post-order DFS.
    * Return an array of visited nodes. */
    dfsPostOrder(){
        let visitedNodes = [];
        function traversePostOrder(currentNode){
            if(currentNode.left) traversePostOrder(currentNode.left);
            if(currentNode.right) traversePostOrder(currentNode.right);
            visitedNodes.push(currentNode.val);
        }

        traversePostOrder(this.root);
        return visitedNodes;
    }

    /** bfs(): Traverse the array using BFS.
    * Return an array of visited nodes. */
    bfs(){
        let toVisitQueue = [this.root];
        let visitedNodes = [];   
 
        while(toVisitQueue.length) {
            let current = toVisitQueue.shift();
            if(current !== null) visitedNodes.push(current.val);

            current.children = [];
            if(current.left !== null) current.children.push(current.left);
            if(current.right !== null) current.children.push(current.right);

            for(let child of current.children){
                toVisitQueue.push(child);
            }
        }

        return visitedNodes;
    }

    /** Further Study!
    * remove(val): Removes a node in the BST with the value val.
    * Returns the removed node. */
    remove(val){
        let currentNode = this.root;
        let parentNode;

        function findNodeChilds(startNode){
            let nodesChilds = [];
            function traverse(currentNode){
                if(currentNode !== null){
                    nodesChilds.push(currentNode.val);
                    if(currentNode.left) traverse(currentNode.left);
                    if(currentNode.right) traverse(currentNode.right);
                }
            }
            traverse(startNode.right);
            traverse(startNode.left);
            return nodesChilds;
        }

        while(currentNode){
            if(currentNode.val === val){
                if(parentNode.left !== null){
                    if(parentNode.left.val === currentNode.val){
                        if(currentNode.left === null && currentNode.right === null){
                            parentNode.left = null;
                            parentNode.right = null;
                        }else{
                            let currentNodeChilds = findNodeChilds(currentNode);
                            parentNode.left = null;
                            for(let childVal of currentNodeChilds) this.insert(childVal);
                        }
                    }
                }
                if(parentNode.right !== null){
                    if(parentNode.right.val === currentNode.val){
                        if(currentNode.left === null && currentNode.right === null){
                            parentNode.left = null;
                            parentNode.right = null;
                        }else{
                            let currentNodeChilds = findNodeChilds(currentNode);
                            parentNode.right = null;
                            for(let childVal of currentNodeChilds) this.insert(childVal);
                        }
                    }
                }

                return currentNode;
            };

            parentNode = currentNode;
            if(currentNode.val > val){
                currentNode = currentNode.left;
            }else{
                currentNode = currentNode.right;
            }
        }
    }

    /** Further Study!
    * isBalanced(): Returns true if the BST is balanced, false otherwise. */
    isBalanced(){
        function checkMinDepth(node){
            if(node === null) return 1;
            return 1 + Math.min(checkMinDepth(node.left), checkMinDepth(node.right));
        }

        function checkMaxDepth(node){
            if(node === null) return 1;
            return 1 + Math.max(checkMaxDepth(node.left), checkMaxDepth(node.right));
        }

        const treeMinDepth = checkMinDepth(this.root);
        const treeMaxDepth = checkMaxDepth(this.root);
        return treeMaxDepth - treeMinDepth <= 1 ? true : false;
    }

    /** Further Study!
     * findSecondHighest(): Find the second highest value in the BST, if it exists.
     * Otherwise return undefined. */

    findSecondHighest() {

    }
}

module.exports = BinarySearchTree;
