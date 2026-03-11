import { TRACKING_API_URL } from '@configs/environment';
import type { IHttpService } from '@shared/application/contracts/services';
import { HttpServiceError } from '@shared/application/errors';
import type { ITrackingGateway } from '@tracking/application/contracts/gateways';
import type { TrackingOutputDTO } from '@tracking/application/dtos';

export class TrackingApiGateway implements ITrackingGateway {
  constructor(private readonly _httpService: IHttpService) {}

  async trackObject(trackingCode: string): Promise<TrackingOutputDTO> {
    const response = await this._httpService.request<{ data: TrackingOutputDTO }>({
      method: 'GET',
      url: `${TRACKING_API_URL}/track/${trackingCode}`,
    });

    if (response.statusCode >= 500) {
      throw new HttpServiceError(
        'An error occurred while communicating with an external service.',
        502,
        'BadGatewayError',
      );
    }

    return response.body.data;
  }
}
