import * as crypto from 'crypto';

const CHANNEL_SECRET = 'a61bc3a02f37401bc3e76a235588c905';

export function verifyLineSignature(body: string, signature: string): boolean {
  const hash = crypto
    .createHmac('SHA256', CHANNEL_SECRET)
    .update(body)
    .digest('base64');
  
  return hash === signature;
}

export type LineMessageEvent = {
  type: 'message';
  message: {
    type: string;
    text: string;
  };
  replyToken: string;
  source: {
    userId: string;
    type: string;
  };
};

export type LineFollowEvent = {
  type: 'follow';
  replyToken: string;
  source: {
    userId: string;
    type: string;
  };
};

export type LineEvent = LineMessageEvent | LineFollowEvent;

export type LineWebhookBody = {
  events: LineEvent[];
}; 