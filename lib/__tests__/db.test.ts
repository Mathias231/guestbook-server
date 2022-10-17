import mongoose, { isObjectIdOrHexString, Types } from 'mongoose';
import { IUser } from '../../models/user.model';
import connect, {
  createComment,
  createPost,
  createUser,
  deletePost,
  deleteUser,
  updatePost,
  updateUser,
} from '../db';
import { v4 as uuidv4 } from 'uuid';
import { IPost } from '../../models/post.model';
import { IComment } from '../../models/comment.model';

describe('User creation', () => {
  beforeAll((done) => {
    done();
  });
  let userObj: IUser;

  // Create User
  it('Should create a user with username and password', async () => {
    let user = await createUser({
      username: uuidv4(),
      password: 'DeleteMeFromUser',
    });
    userObj = user;
    expect(user).toHaveProperty('username');
    expect(user).toHaveProperty('password');
    return;
  });

  // Update User
  it('Should update user with username and password', async () => {
    let user = await updateUser(userObj._id.toString(), {
      username: 'Tore-Tang',
      password: 'Passord2',
    });
    expect(user).toHaveProperty('username');
    expect(user).toHaveProperty('password');
    return;
  });

  // Delete User
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

  // Create Post
  it('Should create a post with title and content', async () => {
    let user = createUser({ username: uuidv4(), password: 'DeleteMeFromPost' });
    let resolvedUser = await user;
    let post = await createPost({
      userId: resolvedUser._id.toString(),
      title: 'Test Title',
      content: 'Amazing Content',
    });

    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('content');
    return;
  });

  // Update Post
  it('Should update a post with title and content', async () => {
    // First create User
    let user = createUser({
      username: uuidv4(),
      password: 'DeleteMeFromUpdatePost',
    });
    let resolvedUser = await user;

    // Then crate Post
    let createP = await createPost({
      userId: resolvedUser._id.toString(),
      title: 'DeleteThisPostFromUpdatePost',
      content: 'Amazing Content',
    });
    let resolvedPost = await createP;

    // Then update Post
    let post = await updatePost(resolvedPost._id.toString(), {
      title: 'Utrolig endring!',
      content: 'Endring er gjort!',
    });

    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('content');
    return;
  });

  // Delete Post
  it('Should delete a post by id', async () => {
    // First create User
    let user = createUser({
      username: uuidv4(),
      password: 'DeleteMeFromUpdatePost',
    });
    let resolvedUser = await user;

    // Then crate Post
    let createP = await createPost({
      userId: resolvedUser._id.toString(),
      title: 'DeleteThisPostFromUpdatePost',
      content: 'Amazing Content',
    });
    let resolvedPost = await createP;

    // Then delete Post
    let post = await deletePost(resolvedPost._id.toString());
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('content');
    return;
  });

  afterAll((done) => {
    mongoose.connection.close();
    done();
  });
});

describe('Comment creation', () => {
  beforeAll((done) => {
    done();
  });
  let commentObj: IComment;

  // Craete Comment
  it('Should create a comment to a post', async () => {
    let user = createUser({
      username: uuidv4(),
      password: 'DeleteMeFromComment',
    });
    let resolvedUser = await user;
    let post = createPost({
      userId: resolvedUser._id.toString(),
      title: 'Test Title',
      content: 'Comment Post test',
    });

    let resolvedPost = await post;

    let comment = await createComment({
      userId: resolvedUser._id.toString(),
      postId: resolvedPost._id.toString(),
      title: 'This is a test comment!',
      content: 'Wow i worked!',
    });
    expect(comment).toHaveProperty('title');
    expect(comment).toHaveProperty('content');
    return;
  });
});
