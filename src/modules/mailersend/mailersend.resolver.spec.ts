import { Test, TestingModule } from '@nestjs/testing';
import { MailersendResolver } from './mailersend.resolver';
import { MailersendService } from './mailersend.service';

describe('MailersendResolver', () => {
  let resolver: MailersendResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailersendResolver, MailersendService],
    }).compile();

    resolver = module.get<MailersendResolver>(MailersendResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
