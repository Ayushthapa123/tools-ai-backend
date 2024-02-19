import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class DemoResolver {
  @Query(() => String) // This defines a simple query returning a string
  hello(): string {
    return 'Hello, GraphQL!';
  }
}
