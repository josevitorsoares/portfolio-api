import type { ArticleOutput } from '@article/application/dtos';

export interface IGetArticleUseCase {
  execute(): Promise<ArticleOutput | null>;
}
