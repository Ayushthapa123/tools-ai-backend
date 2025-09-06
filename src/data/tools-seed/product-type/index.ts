import { aiApplicationsList } from './ai-applications';
import { aiModelsList } from './ai-models';
import { aiAgentList } from './ai-agent';
import { aiDatasetList } from './ai-dataset';
import { aiFrameworkList } from './ai-framework';
import { aiToolkitList } from './ai-toolkit';
import { aiTemplateList } from './ai-template';
import { aiServiceList } from './ai-service';
import { aiHardwareList } from './ai-hardware';

export const aiToolsWithProductType = [
  ...aiApplicationsList,
  ...aiModelsList,
  ...aiAgentList,
  ...aiDatasetList,
  ...aiFrameworkList,
  ...aiToolkitList, // failed here
  ...aiTemplateList,
  ...aiServiceList,
  ...aiHardwareList,
];
