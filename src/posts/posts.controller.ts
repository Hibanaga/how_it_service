import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import createPostDto from './dto/createPost.dto';
import updatePostDto from './dto/updatePost.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAll();
  }

  @Get(':id')
  getPost(@Param('id') id: number) {
    return this.postsService.getPost(id);
  }

  @Post()
  async createPost(@Body() post: createPostDto) {
    return this.postsService.createPost(post);
  }

  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() post: updatePostDto) {
    return this.postsService.updatePost(Number(id), post);
  }
}
