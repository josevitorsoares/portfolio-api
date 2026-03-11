import type { IArticleGateway } from '../contracts/gateways';
import type { IGetArticleUseCase } from '../contracts/usecases';
import type { ArticleOutput } from '../dtos';

export class GetArticleUseCase implements IGetArticleUseCase {
  constructor(private readonly _articleGateway: IArticleGateway) {}

  async execute(): Promise<ArticleOutput | null> {
    const article = await this._articleGateway.getArticle();

    return article;
  }
}
