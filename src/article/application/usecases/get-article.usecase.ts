import type { IArticleGateway } from '../contracts/gateways';
import type { IGetArticleUseCase } from '../contracts/usecases';
import type { ArticleOutput } from '../dtos';

export class GetArticleUseCase implements IGetArticleUseCase {
  constructor(private readonly _articleGateway: IArticleGateway) {}

  async execute(): Promise<ArticleOutput> {
    const articleURL: string =
      'https://revistas.unifacs.br/index.php/rsc/article/viewFile/8567/5141.pdf' as const;

    const article = await this._articleGateway.getArticle(articleURL);

    return article;
  }
}
