import type { TrackingOutputDTO } from '@tracking/application/dtos';

export interface ITrackingGateway {
  trackObject(trackingCode: string): Promise<TrackingOutputDTO>;
}
