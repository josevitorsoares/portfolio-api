import type { IArticleGateway } from '@article/application/contracts/gateways';
import type { ArticleOutput } from '@article/application/dtos';
import type { IHttpService } from '@shared/application/contracts/services';

export class AxiosArticleGateway implements IArticleGateway {
  constructor(private readonly _httpService: IHttpService) {}

  async getArticle(articleURL: string): Promise<ArticleOutput> {
    const headers = {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      Accept: 'application/pdf, application/json, text/plain, */*',
      Referer: 'https://revistas.unifacs.br/',
      'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
    };

    const response = await this._httpService.request<ArticleOutput>({
      url: articleURL,
      method: 'GET',
      responseType: 'stream',
      headers,
    });

    return response.body;
  }
}
