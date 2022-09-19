import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { ExampleModule } from './example/example.module';

@Module({
  imports: [ExampleModule, PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
