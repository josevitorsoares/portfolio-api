import { makeAxiosHttpService } from '@shared/main/factories/infrastructure/services';
import type { ITrackingGateway } from '@tracking/application/contracts/gateways';
import { TrackingApiGateway } from '@tracking/infrastructure/gateways';

export const makeTrackingApiGateway = (): ITrackingGateway => {
  const axiosHttpService = makeAxiosHttpService();

  return new TrackingApiGateway(axiosHttpService);
};
