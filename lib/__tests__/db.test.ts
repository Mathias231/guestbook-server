import mongoose, { isObjectIdOrHexString, Types } from 'mongoose';
import { IUser } from '../../models/user.model';
import connect, {
  createPost,
  createUser,
  deletePost,
  deleteUser,
  updatePost,
  updateUser,
} from '../db';
import { v4 as uuidv4 } from 'uuid';
import { IPost } from '../../models/post.model';
import { OperationCanceledException } from 'typescript';

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

describe('Post creation', () => {
  beforeAll((done) => {
    done();
  });
  let postObj: IPost;
  let user = createUser({ username: uuidv4(), password: 'Passord1' });
  it('Should create a post with title and content', async () => {
    let resolvedUser = await user;
    let post = await createPost({
      userId: resolvedUser._id.toString(),
      title: 'Test Title',
      content: 'Amazing Content',
    });
    postObj = post;
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('content');
    return;
  });

  it('Should update a post with title and content', async () => {
    let post = await updatePost(postObj._id.toString(), {
      title: 'Utrolig endring!',
      content: 'Endring er gjort!',
    });
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('content');
  });

  it('Should delete a post by id', async () => {
    let post = await deletePost(postObj._id.toString());
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('content');
    return;
  });

  afterAll((done) => {
    mongoose.connection.close();
    done();
  });
});
