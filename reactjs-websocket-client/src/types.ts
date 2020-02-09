export interface Message {
  id?: string;
  from: string;
  to: string;
  content: string;
  type: 'CHAT' | 'GROUP_CHAT';
}
