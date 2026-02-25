type PublicMetrics = {
  retweet_count: number;
  reply_count: number;
  like_count: number;
  quote_count: number;
  bookmark_count: number;
  impression_count: number;
};

export type Tweet = {
  public_metrics: PublicMetrics;
  text: string;
  id: string;
  created_at: string;
};
