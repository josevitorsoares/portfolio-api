import type { ITrackingGateway } from '../contracts/gateways';
import type { ITrackObjectUseCase } from '../contracts/usecases';
import type { TrackingOutputDTO } from '../dtos';

export class TrackObjectUseCase implements ITrackObjectUseCase {
  constructor(private readonly _trackingGateway: ITrackingGateway) {}

  async execute(trackingCode: string): Promise<TrackingOutputDTO> {
    const tracking = await this._trackingGateway.trackObject(trackingCode);

    return tracking;
  }
}
