import type { IArticleGateway } from '@article/application/contracts/gateways';
import type { ArticleOutput } from '@article/application/dtos';
import { createReadStream, existsSync } from 'node:fs';
import { join } from 'node:path';
import { cwd } from 'node:process';

export class ArticleGateway implements IArticleGateway {
  async getArticle(): Promise<ArticleOutput | null> {
    const filePath = join(cwd(), 'assets', 'article.pdf');

    if (!existsSync(filePath)) {
      return null;
    }

    const fileStream = createReadStream(filePath);

    // const headers = {
    //   'User-Agent':
    //     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    //   Accept: 'application/pdf, application/json, text/plain, */*',
    //   Referer: 'https://revistas.unifacs.br/',
    //   'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
    // };

    // const response = await this._httpService.request<ArticleOutput>({
    //   url: articleURL,
    //   method: 'GET',
    //   responseType: 'stream',
    //   headers,
    // });

    return fileStream;
  }
}
