class Node():
    def __init__(self , value , left=None,right = None):
        self.value = value
        self.left = left
        self.right = right
    
    def R_son(self , son):
        self.right = son
    
    def L_son(self , son):
        self.left = son
    
    def count_Node(self):
        L_count = 0
        R_count = 0

        if(self.left != None):
            L_count = self.left.count_Node()
        if(self.right != None):
            R_count = self.right.count_Node()
        return L_count + R_count + 1
    
    def height(self):
        L_height = 0
        R_height = 0

        if self.right != None:
            R_height = self.right.height()
        if self.left != None:
            L_height = self.left.height()
        return  1 + max(L_height ,R_height) 

root = Node(10,
            left = Node(5,left = Node(3),right = Node(7)),
            right = Node(20))

print(root.value)             # 10
print(root.right.value)       # 20
print(root.left.right.value)  # 7
print(root.right.left)        # None
print(3*'----')
print(root.count_Node())       # 5
print(root.left.count_Node())  # 3
print(3*'----')
print(root.height())             # 3
print(root.left.height())        # 2
print(root.right.height())       # 1
print(root.left.left.height())   # 1
'''
print(root.value)
print(root.left.right.value)
print(root.right.left)
'''
