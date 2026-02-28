import type { TrackStatusEnum } from '../enums';

type Tracks = {
  description: string;
  status: TrackStatusEnum;
  origin: string;
  destination?: string | undefined;
  date: string;
  time: string;
};

export type TrackingEntity = {
  code: string;
  type: string;
  tracks: Tracks[];
};
