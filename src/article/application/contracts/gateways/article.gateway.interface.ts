import type { ArticleOutput } from '@article/application/dtos';

export interface IArticleGateway {
  getArticle(): Promise<ArticleOutput | null>;
}
