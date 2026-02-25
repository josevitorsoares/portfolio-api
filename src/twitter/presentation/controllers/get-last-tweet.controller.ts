import { CustomError } from '@shared/application/errors';
import { ControllerResponse } from '@shared/presentation/controllers';
import type { IController, ICustomHttpReply } from '@shared/presentation/http';
import type { IGetLastTweetUseCase } from '@twitter/application/contracts/usecases';

export class GetLastTweetController implements IController {
  constructor(private readonly _getLastTweetUseCase: IGetLastTweetUseCase) {}

  async handle(): Promise<ICustomHttpReply> {
    try {
      const freshTweet = await this._getLastTweetUseCase.execute();

      return ControllerResponse.success(freshTweet);
    } catch (error: any) {
      if (error instanceof CustomError) {
        return ControllerResponse.customError(error);
      }

      return ControllerResponse.internalServerError(error.message);
    }
  }
}
