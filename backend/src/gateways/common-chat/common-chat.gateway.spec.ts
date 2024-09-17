import { Test, TestingModule } from '@nestjs/testing';
import { CommonChatGateway } from './common-chat.gateway';

describe('CommonChatGateway', () => {
  let gateway: CommonChatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommonChatGateway],
    }).compile();

    gateway = module.get<CommonChatGateway>(CommonChatGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
