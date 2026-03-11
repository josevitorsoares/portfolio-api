import type { TrackingOutputDTO } from '@tracking/application/dtos';

export interface ITrackObjectUseCase {
  execute(trackingCode: string): Promise<TrackingOutputDTO>;
}
