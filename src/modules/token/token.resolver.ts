import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TokenService } from './token.service';
import { CreateToken } from './dto/create-token.dto';
import { ApiToken as Token } from '@src/models/global.model';
import { UpdateToken } from './dto/update-token.dto';
import { CtxType } from '@src/models/global.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';

@Resolver('Token')
export class TokenResolver {
  constructor(private readonly tokenService: TokenService) {}

  @Mutation(() => Token)
  async createToken(@Args('createTokenInput') createToken: CreateToken) {
    console.log('ccccccccc', createToken);
    return this.tokenService.createToken(createToken);
  }

  @UseGuards(AuthGuard)
  @Query(() => Token)
  async getTokenByUserToken(@Context() ctx: CtxType) {
    const userId = ctx.user.sub;
    return this.tokenService.getTokenByUserId(userId);
  }

  @Query(() => Token)
  async getTokenById(@Args('id') id: number) {
    return this.tokenService.getTokenById(id);
  }

  @Mutation(() => Token)
  async updateToken(@Args('updateTokenInput') updateComment: UpdateToken) {
    return this.tokenService.updateToken(updateComment);
  }

  @Mutation(() => Token)
  async removeToken(@Args('id') id: number) {
    return this.tokenService.removeToken(id);
  }
}
