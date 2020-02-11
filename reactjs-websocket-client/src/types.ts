export interface Message {
  id?: string;
  from: string;
  to: string;
  content: string;
  type: 'CHAT' | 'GROUP_CHAT';
}

export interface User {
  id?: string;
  name: string;
  lastMessage: string;
  timeLastConnected: string;
}

export interface UsersList {
  users: Array<User>;
}
