import { CustomError } from '@shared/application/errors';
import { ControllerResponse } from '@shared/presentation/controllers';
import type { IController, ICustomHttpReply, ICustomHttpRequest } from '@shared/presentation/http';
import type { IAddLastTweetUseCase } from '@twitter/application/contracts/usecases';
import type { AddLastTweetDTO } from '../dtos';

export class AddLastTweetController implements IController {
  constructor(private readonly _addLastTweetUseCase: IAddLastTweetUseCase) {}

  async handle(request: ICustomHttpRequest<AddLastTweetDTO>): Promise<ICustomHttpReply> {
    try {
      const lastTweet = request.body;

      await this._addLastTweetUseCase.execute(lastTweet);

      return ControllerResponse.noContent();
    } catch (error: any) {
      if (error instanceof CustomError) {
        return ControllerResponse.customError(error);
      }

      return ControllerResponse.internalServerError(error.message);
    }
  }
}
