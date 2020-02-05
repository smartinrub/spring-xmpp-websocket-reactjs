import storage from '../../utils/storage';
import { history } from '../../browserhistory';

export const join = username => {
  storage.set('isAuthenticated', true);
  storage.set('user', username);
  history.push('/chat');
  history.go(0);
};
