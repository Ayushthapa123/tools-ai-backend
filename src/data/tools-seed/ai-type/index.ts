import { generativeAiList } from './generative-ai';
import { computerVisionList } from './computer-vision';
import { conversationalAiList } from './conversational-ai';
import { speechAiList } from './speech-ai';
import { analyticsAiList } from './analytics-ai';
import { codeAiList } from './code-ai';
import { searchRetrievalAiList } from './search-retrival-ai';
import { recommendationAiList } from './recommendation-ai';
import { marketingAiList } from './marketing-ai';
import { automationAiList } from './automation-ai';
import { securityAiList } from './security-ai';

export const aiToolsWithAiType = [
  ...generativeAiList,
  ...computerVisionList,
  ...conversationalAiList,
  ...speechAiList,
  ...analyticsAiList,
  ...codeAiList,
  ...searchRetrievalAiList,
  ...recommendationAiList,
  ...marketingAiList,
  ...automationAiList,
  ...securityAiList,
];
