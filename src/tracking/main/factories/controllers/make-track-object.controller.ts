import type { IController } from '@shared/presentation/http';
import { TrackObjectController } from '@tracking/presentation/controllers';
import { makeTrackObjectUseCase } from '../application';

export const makeTrackObjectController = (): IController => {
  const trackObjectUseCase = makeTrackObjectUseCase();

  return new TrackObjectController(trackObjectUseCase);
};
