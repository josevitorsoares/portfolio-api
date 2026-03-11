import type { IArticleGateway } from '@article/application/contracts/gateways';
import { ArticleGateway } from '@article/infrastructure/gateways';

export const makeArticleGateway = (): IArticleGateway => {
  return new ArticleGateway();
};
