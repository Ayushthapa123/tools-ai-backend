import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from '@src/models/global.model';
import { CreateUserInput } from './create-user.dto';
import { UpdateUserInput } from './dtos/update-user.dto';

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  async getUsers() {
    return this.usersService.getAllUsers();
  }

  @Query(() => User, { nullable: true })
  async getUserById(@Args('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @Query(() => User, { nullable: true })
  async getUserByUsername(@Args('username') username: string) {
    return this.usersService.getUserByUsername(username);
  }

  @Query(() => User, { nullable: true })
  async getUserByAccessToken(@Args('accessToken') accessToken: string) {
    return this.usersService.getUserByToken(accessToken);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.usersService.createUser(input);
  }

  @Mutation(() => User)
  async updateUser(@Args('input') input: UpdateUserInput) {
    return this.usersService.updateUser(input);
  }
}
