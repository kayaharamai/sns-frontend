
//interface　か　type か？
export interface Posts {
  authorId: number;
  comment: [];
  createdAt: string;
  desc: string;
  id: number;
  img: null;
  likes: [];
  userId: string;
  username: string;
}

export interface UserData {
  desc: string;
  email: string;
  followers: [];
  followings: [];
  id: number;
  isAdmin: boolean;
  password: string;
  posts: [];
  profilePicture: string;
  userId: string;
  username: string;
}

export interface Followings {
  id: number;
  followerId: number;
  userId: string;
}

export interface NewPost {
  authorId: number;
  desc: string;
  userId: string;
  username: string;
}

export interface SearchUserData {
  desc: string;
  email: string;
  id: number;
  isAdmin: boolean;
  password: string;
  profilePicture: string;
  userId: string;
  username: string;
}

export interface SearchUser {
  userId: string;
}

export interface FollowerItem {
  followerId: number;
  userId: string;
}

export interface FollowItem {
  followId: number;
  userId: string;
}

export interface SearchItem {
  userId: string;
  id: number;
}

export interface Comment {
  comment: string;
  createdAt: string;
  id: number;
  postId: number;
  userId: string;
  username: string;
}

export interface NewComment {
  comment: string;
  postId: number;
  userId: string;
  username: string;
}

export interface ChangeItem {
  desc: string;
}

export interface LoginUser {
  desc: string;
  email: string;
  id: number;
  isAdmin: boolean;
  password: string;
  profilePicture: string;
  userId: string;
  username: string;
}

export interface LoginInputItem {
  email: string;
  password: string;
}

export interface UserRegister {
  username: string;
  userId: string;
  email: string;
  password: string;
}
