import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { DngService } from './dng.service';
import { DomainNameGeneratorInput } from './dto/dng.input';
import { DNGList } from './models/dng.model';

@Resolver()
export class DngResolver {
  constructor(private readonly dngService: DngService) {}

  @Mutation(() => DNGList)
  async getDomainNames(@Args('input') input: DomainNameGeneratorInput) {
    return this.dngService.generateDomainName(input);
  }
}
