import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateComment } from './dto/create-comment.dto';
import { UpdateComment } from './dto/update-comment.dto';
import { ToolType } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async createComment(createComment: CreateComment) {
    const comment = await this.prisma.comment.create({
      data: {
        comment: createComment.comment,
        toolId: createComment.toolId,
        listedAiToolId: createComment.listedAiToolId,
        toolType: createComment.toolType as ToolType,
        userId: createComment.userId,
      },
    });

    return {
      data: comment,
      error: null,
    };
  }

  async getCommentById(id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    return {
      data: comment,
      error: null,
    };
  }

  async getCommentsByToolId(toolId: number) {
    const comments = await this.prisma.comment.findMany({
      where: { toolId },
    });

    return {
      data: comments,
      error: null,
    };
  }

  async updateComment(updateComment: UpdateComment) {
    const { id } = updateComment;
    const comment = await this.prisma.comment.update({
      where: { id },
      data: {
        comment: updateComment.comment,
        toolId: updateComment.toolId,
        listedAiToolId: updateComment.listedAiToolId,
        toolType: updateComment.toolType as ToolType,
        userId: updateComment.userId,
      },
    });

    return {
      data: comment,
      error: null,
    };
  }

  async removeComment(id: number) {
    const comment = await this.prisma.comment.delete({
      where: { id },
    });

    return {
      data: comment,
      error: null,
    };
  }
}
