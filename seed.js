import config from './config.json';
import DB from './app/db';
import populate from './app/db/populate';
import _ from 'lodash';

DB({
  db: config.DB.dbname,
  user: config.DB.user,
  password: config.DB.password,
  host: config.DB.host,
});

populate('User', [
  {
    name: 'Root User',
    email: 'teste@test.com',
    password: '123456'
  },
])
