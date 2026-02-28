import { CustomError } from '@shared/application/errors';
import { ControllerResponse } from '@shared/presentation/controllers';
import type { IController, ICustomHttpReply, ICustomHttpRequest } from '@shared/presentation/http';
import type { ITrackObjectUseCase } from '@tracking/application/contracts/usecases';

export class TrackObjectController implements IController {
  constructor(private readonly _trackObjectUseCase: ITrackObjectUseCase) {}

  async handle(
    request: ICustomHttpRequest<undefined, { trackingCode: string }>,
  ): Promise<ICustomHttpReply> {
    try {
      const { trackingCode } = request.params ?? {};

      if (!trackingCode) {
        return ControllerResponse.badRequest('The tracking code is missing');
      }

      const tracking = await this._trackObjectUseCase.execute(trackingCode);

      return ControllerResponse.success(tracking);
    } catch (error: any) {
      if (error instanceof CustomError) {
        return ControllerResponse.customError(error);
      }

      return ControllerResponse.internalServerError(error.message);
    }
  }
}
