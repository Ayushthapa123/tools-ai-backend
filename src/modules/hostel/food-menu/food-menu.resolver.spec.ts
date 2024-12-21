import { Test, TestingModule } from '@nestjs/testing';
import { FoodMenuResolver } from './food-menu.resolver';

describe('FoodMenuResolver', () => {
  let resolver: FoodMenuResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodMenuResolver],
    }).compile();

    resolver = module.get<FoodMenuResolver>(FoodMenuResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
