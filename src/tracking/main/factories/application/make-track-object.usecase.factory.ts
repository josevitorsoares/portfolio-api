import type { ITrackObjectUseCase } from '@tracking/application/contracts/usecases';
import { TrackObjectUseCase } from '@tracking/application/usecases';
import { makeTrackingApiGateway } from '../infrastructure';

export const makeTrackObjectUseCase = (): ITrackObjectUseCase => {
  const trackingObjectApiGateway = makeTrackingApiGateway();

  return new TrackObjectUseCase(trackingObjectApiGateway);
};
