import type { IArticleGateway } from '@article/application/contracts/gateways';
import type { ArticleOutput } from '@article/application/dtos';
import type { IHttpService } from '@shared/application/contracts/services';

export class AxiosArticleGateway implements IArticleGateway {
  constructor(private readonly _httpService: IHttpService) {}

  async getArticle(articleURL: string): Promise<ArticleOutput> {
    const response = await this._httpService.request<ArticleOutput>({
      url: articleURL,
      method: 'GET',
      responseType: 'stream',
      headers: {
        'Content-Type': 'application/pdf'
      }
    });

    return response.body;
  }
}
