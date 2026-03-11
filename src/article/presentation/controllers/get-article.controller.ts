import type { IGetArticleUseCase } from '@article/application/contracts/usecases';
import { CustomError } from '@shared/application/errors';
import { ControllerResponse } from '@shared/presentation/controllers';
import type { IController, ICustomHttpReply } from '@shared/presentation/http';

export class GetArticleController implements IController {
  constructor(private readonly _getArticleUseCase: IGetArticleUseCase) {}

  async handle(): Promise<ICustomHttpReply> {
    try {
      const articleStream = await this._getArticleUseCase.execute();

      if (!articleStream) {
        return ControllerResponse.badRequest('Article not found');
      }

      return ControllerResponse.file(articleStream, 'application/pdf', 'article.pdf');
    } catch (error: any) {
      if (error instanceof CustomError) {
        return ControllerResponse.customError(error);
      }

      return ControllerResponse.internalServerError(error.message);
    }
  }
}
