import { makeAxiosHttpService } from '@shared/main/factories/infrastructure/services';
import type { ITwitterGateway } from '@twitter/application/contracts/gateways';
import { TwitterApiGateway } from '@twitter/infrastructure/gateways';

export const makeTwitterGateway = (): ITwitterGateway => {
  const axiosHttpService = makeAxiosHttpService();

  return new TwitterApiGateway(axiosHttpService);
};
