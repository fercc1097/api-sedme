const bcrypt = require('bcryptjs');

import { createUser} from '../controllers/user.controller';


function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

async function insertUser (req,res) {
  console.table(req.body);
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password,salt);
    return createUser(req,hash,res);

    // return knex('users')
    // .insert({
    //   username: req.body.username,
    //   password: hash
    // })
    // .returning('*');
  }
  

module.exports = {
  comparePass,
  insertUser
};
