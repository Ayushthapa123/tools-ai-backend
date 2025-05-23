import { Test, TestingModule } from '@nestjs/testing';
import { RoomAmenityResolver } from './room-amenity.resolver';
import { RoomAmenityService } from './room-amenity.service';

describe('RoomAmenityResolver', () => {
  let resolver: RoomAmenityResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomAmenityResolver, RoomAmenityService],
    }).compile();

    resolver = module.get<RoomAmenityResolver>(RoomAmenityResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
