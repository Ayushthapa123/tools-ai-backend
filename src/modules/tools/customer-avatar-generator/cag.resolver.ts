import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CagService } from './cag.service';
import { CustomerAvatarGeneratorInput } from './dto/cag.input';
import { CAGList } from './models/cag.model';

@Resolver()
export class CagResolver {
  constructor(private readonly cagService: CagService) {}

  @Mutation(() => CAGList)
  async getCustomerAvatar(@Args('input') input: CustomerAvatarGeneratorInput) {
    return this.cagService.generateCustomerAvatar(input);
  }
}
