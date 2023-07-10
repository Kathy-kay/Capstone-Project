import { Timestamp } from "firebase/firestore";
import {User } from "firebase/auth"

export type ILogin = {
    email: string,
    password: string
}


export type ISignUp = {
    email: string,
    firstName: string;
    lastName: string;
    password: string;
    userName: string;
    confirmPassword: string;
   
}

export type Reaction = {
  eyes: number;
  heart: number;
  hooray: number;
  rocket: number;
  thumbsUp: number;
};

export type MyUser = User;

export type UserChatter = {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    profilePic?: string;
    userid?: string;
  };
  
  export type CreateFeed = {
    title: string;
    image?: null | string;
    imageUrl?: string;
    tags: string[];
  };


  export type Feed = {
    reactions: any;
    id?: string;
    title: string;
    content: string;
    imageUrl: string;
    createdAt: Timestamp;
    author: Author;
    comments?: IComment[];
    tags: string[];
    bookMarkedBy?: string[];
  };
  
  
  export type Author = {
    name: string;
    id: string;
    profilePic?: string;
  };
  
  export type IComment = {
    author: Author;
    body: string;
    createdAt: Timestamp;
    id: string;
    parentId?: string | null;
  };
  

  
  export type Bookmark = Feed & { userId: string };
  
  export type UpdateProfile = {
    firstName: string;
    lastName: string;
  };