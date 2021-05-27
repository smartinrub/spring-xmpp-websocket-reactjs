import storage from '../../utils/storage';
import { history } from '../../browserhistory';

export const join = username => {
  storage.set('isJoined', true);
  storage.set('user', username);
  history.push('/chat');
  // history.go(0);
};
