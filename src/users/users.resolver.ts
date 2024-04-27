import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Users } from '@src/models/global.model';
import { CreateUserInput } from './create-user.dto';

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [Users])
  async getUsers() {
    return this.usersService.getAllUsers();
  }

  @Query(() => Users, { nullable: true })
  async getUser(@Args('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @Mutation(() => Users)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.usersService.createUser(input);
  }

  //   @Mutation(() => [Users])
  //   async createUsers(@Args('input') input: CreateUserInput[]) {
  //     return this.usersService.createUsers(input);
  //   }
}
