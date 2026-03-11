type PublicMetricsData = {
  retweet_count: number;
  reply_count: number;
  like_count: number;
  quote_count: number;
  bookmark_count: number;
  impression_count: number;
};

export type Tweet = {
  public_metrics: PublicMetricsData;
  text: string;
  id: string;
  created_at: string;
};

type TweetMediaData = {
  media_key: string;
  type: string;
  url: string;
};

type TweetUserData = {
  profile_image_url: string;
  name: string;
  username: string;
};

export type TweetIncludes = {
  media: TweetMediaData[];
  users: TweetUserData[];
};
