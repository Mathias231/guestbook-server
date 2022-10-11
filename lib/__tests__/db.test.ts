import mongoose, { Types } from 'mongoose';
import { IUser } from '../../models/user.model';
import connect, { createUser, deleteUser, updateUser } from '../db';
import { v4 as uuidv4 } from 'uuid';
import { IPost } from '../../models/post.model';

describe('User creation', () => {
  beforeAll((done) => {
    done();
  });
  let userObj: IUser;
  it('Should create a user with username and password', async () => {
    let user = await createUser({ username: uuidv4(), password: 'Passord1' });
    userObj = user;
    expect(user).toHaveProperty('username');
    expect(user).toHaveProperty('password');
    return;
  });
  it('Should update user with username and password', async () => {
    let user = await updateUser(userObj._id.toString(), {
      username: 'Tore-Tang',
      password: 'Passord2',
    });
    expect(user).toHaveProperty('username');
    expect(user).toHaveProperty('password');
    return;
  });
  it('Should delete user by id', async () => {
    let user = await deleteUser(userObj._id.toString());
    expect(user).toHaveProperty('username');
    expect(user).toHaveProperty('password');
    return;
  });
  afterAll((done) => {
    mongoose.connection.close();
    done();
  });
});
