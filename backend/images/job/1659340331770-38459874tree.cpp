#include<iostream>
using namespace std;

struct Node{
	int data;
	Node *left;
	Node *right;
};
Node *newNode(int data,Node *root){
	root=new Node;
	root->data=data;
	root->left=root->right=NULL;
	return root;
}
Node *insertNode(Node *root,int data){
	if(root==NULL){
		return newNode(data,root);
	}
	if(data>root->data){
		root->right= insertNode(root->right,data);
	}
	if(data<root->data){
		root->left= insertNode(root->left,data);
	}
  return root;
}
void inorder(Node* root)
{
	if(root != NULL)
	{
		inorder(root->left);
		cout<<root->data<<" ";
		inorder(root->right);
	}
}
//preorder
void preorder(Node *root){
	cout<<root->data;
	preorder(root->left);
	preorder(root->right);
}

Node *search(Node *root,int data){
	if(root->data==data || root==NULL){
		return root;
	}
	if(data<root->data){
		return search(root->left,data);
	}
	if(data>root->data){
		return search(root->right,data);
	}
  return root;
}

Node *minimum(Node *root){
	Node *current=root;
	while(current->left!=NULL){
		current=current->left;
	}
	return current;
}
Node *maxvalue(Node *root){
	Node *current=root;
	
	while(current->right!=NULL){	
	   current=current->right;
	}
	return current;
}

int main()
{
	Node *root=new Node;
	root=NULL;
	root=insertNode(root,5);
	root=insertNode(root,6);
	root=insertNode(root,7);
	root=insertNode(root,8);
	root=insertNode(root,9);
	inorder(root);
	
	Node *min=minimum(root);
	cout<<endl<<"Mininum:"<<min->data<<endl;
	Node *max=maxvalue(root);
	cout<<"Maximum:"<<max->data;
	Node *sear=search(root,9);
	cout<<endl<<"Search:"<<sear->data<<endl;
	
	preorder(root);
	return 0;
}
