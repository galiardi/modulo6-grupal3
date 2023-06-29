import { Router } from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import _ from 'lodash';
import chalk from 'chalk';
import { inspect } from 'util';

const router = Router();

let users = null;

router.post('/register', async (req, res) => {
  const { quantity } = req.body;
  const url_user_generator = `https://api.generadordni.es/v2/profiles/person?results=${quantity}`;

  if (quantity > 0) {
    try {
      const { data } = await axios.get(url_user_generator);
      users = data.map((user) => {
        user.uuid = uuidv4();
        user.creation_date = moment().format('MMMM Do YYYY, h:mm:ss a');
        return user;
      });
      console.log(chalk.bgWhite.blue(inspect(users, { colors: true, depth: null })));
      return res.json({ users, error: null });
    } catch (error) {
      console.log(error);
      users = null;
      return res.json({ users, error: error.code });
    }
  }

  console.log('invalid quantity');
  users = null;
  return res.json({ users, error: 'invalid quantity' });
});

router.get('/get-user/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = _.findIndex(users, (o) => o.uuid == id);
  if (userIndex === -1) {
    return res.json({ user: null, error: 'el usuario no existe' });
  }
  const user = users[userIndex];
  console.log(chalk.bgWhite.blue(inspect(user, { colors: true, depth: null })));
  return res.json({ user, error: null });
});

router.get('/get-all-users', (req, res) => {
  console.log(chalk.bgWhite.blue(inspect(users, { colors: true, depth: null })));
  res.json({ users, error: null });
});

export default router;
