import { Test, TestingModule } from '@nestjs/testing';
import { AmenityResolver } from './amenity.resolver';
import { AmenityService } from './amenity.service';

describe('AmenityResolver', () => {
  let resolver: AmenityResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmenityResolver, AmenityService],
    }).compile();

    resolver = module.get<AmenityResolver>(AmenityResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
