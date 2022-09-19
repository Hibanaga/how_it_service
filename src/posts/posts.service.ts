import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Post from './posts.interface';
import createPostDto from './dto/createPost.dto';
import updatePostDto from './dto/updatePost.dto';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    {
      id: 1,
      title: 'The usages example of nest.js ',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 2,
      title: 'The minuses of usage nest.js',
      content:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: 3,
      title: 'The future of usage nest.js',
      content:
        'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
  ];

  getAll() {
    return this.posts;
  }

  getPost(postID: number) {
    try {
      const searchPost = this.posts.find(
        ({ id }) => Number(id) === Number(postID),
      );
      if (searchPost) {
        return searchPost;
      } else throw new Error('error');
    } catch (error) {
      throw new HttpException("Page doen't exist", HttpStatus.NOT_FOUND);
    }
  }

  createPost(postContent: createPostDto) {
    const newPostID = this.posts.length + 1;

    const newPost = {
      id: newPostID,
      ...postContent,
    };

    this.posts.push(newPost);

    return newPost;
  }

  updatePost(postID: number, newPost: updatePostDto) {
    const { id: newPostID } = newPost;
    const findID = this.posts.findIndex(
      ({ id }) => Number(id) === Number(postID),
    );
    const newPostUniq = this.posts.findIndex(
      ({ id }) => Number(id) === Number(newPostID),
    );

    try {
      if (findID > -1 && newPostUniq < 0) {
        this.posts[findID] = newPost;

        return newPost;
      }

      throw new Error();
    } catch (error) {
      throw new HttpException('Fail update', HttpStatus.BAD_REQUEST);
    }
  }
}
