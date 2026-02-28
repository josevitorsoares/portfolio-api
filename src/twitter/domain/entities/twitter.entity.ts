type TweetUser = {
  profileImageUrl: string;
  name: string;
  username: string;
};

export type TweetEntity = {
  postId: string;
  text: string;
  likesCount: number;
  impressionCount: number;
  mediaUrl: string | undefined;
  user: TweetUser;
  createdAt: Date;
};
