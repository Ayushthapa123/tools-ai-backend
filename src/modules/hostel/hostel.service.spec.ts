import { HostelService } from './hostel.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('HostelService', () => {
  let service: HostelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HostelService],
    }).compile();

    service = module.get<HostelService>(HostelService);
  });

  
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
