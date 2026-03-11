import type { ArticleOutput } from '../../dtos';

export interface IArticleGateway {
  getArticle(articleURL: string): Promise<ArticleOutput>;
}
