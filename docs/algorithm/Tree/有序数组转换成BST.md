#### [108. 将有序数组转换为二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/)

给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 高度平衡 二叉搜索树。

高度平衡 二叉树是一棵满足「每个节点的左右两个子树的高度差的绝对值不超过 1 」的二叉树。

**示例 1**

```
输入：nums = [-10,-3,0,5,9]
输出：[0,-3,9,-10,null,5]
```

**示例 2：**

```
输入：nums = [1,3]
输出：[3,1]
```

**解法：**

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
  let buildBST = (arr,left,right) => {
    if(left > right) return null;
    let mid = math.floor((left + right) / 2);
    let node = TreeNode(arr[mid]);
    node.left = buildBST(arr,left,mid-1);
    node.right = buildBST(arr,mid+1,right);
    return node;
  }
  return buildBST(nums,0,nums.length-1);
}
```

