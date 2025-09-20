import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CreateComment } from './dto/create-comment.dto';
import { UpdateComment } from './dto/update-comment.dto';
import { Comment } from '@src/models/global.model';

@Resolver('Comment')
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => Comment)
  async createComment(
    @Args('createCommentInput') createComment: CreateComment,
  ) {
    console.log('ccccccccc', createComment);
    return this.commentService.createComment(createComment);
  }

  @Query(() => Comment)
  async getCommentsByToolId(@Args('toolId') toolId: number) {
    return this.commentService.getCommentsByToolId(toolId);
  }

  @Query(() => Comment)
  async getCommentById(@Args('id') id: number) {
    return this.commentService.getCommentById(id);
  }

  @Mutation(() => Comment)
  async updateComment(
    @Args('updateCommentInput') updateComment: UpdateComment,
  ) {
    return this.commentService.updateComment(updateComment);
  }

  @Mutation(() => Comment)
  async removeComment(@Args('id') id: number) {
    return this.commentService.removeComment(id);
  }
}
