import { NextResponse } from 'next/server';

const CHANNEL_ACCESS_TOKEN = '3ATEVHVRENFgCAu+HWty3SDCQvGR1oRvF6u2yTyVUWoxSFnutxfSfICEIBChr8iJGqmFd0V4YWA4qTa/fLx5nGH+yWv27of4C5RbcmPF8tf6pv/sUAc0DtXA8x3p/DWzbIQzm3OlbTHWL7jD8TM+egdB04t89/1O/w1cDnyilFU=';
const USER_ID = 'Ub9df7c953300b31d6338c5f6f93abb77';

export async function POST(request: Request) {
  try {
    await request.json();

    const message = {
      to: USER_ID,
      messages: [
        {
          type: "text",
          text: "以下から選択してください",
          quickReply: {
            items: [
              {
                type: "action",
                action: {
                  type: "message",
                  label: "ご飯を注文する",
                  text: "ご飯を注文する"
                }
              },
              {
                type: "action",
                action: {
                  type: "message",
                  label: "メニューをリクエストする",
                  text: "メニューをリクエストする"
                }
              },
              {
                type: "action",
                action: {
                  type: "message",
                  label: "予約をキャンセルする",
                  text: "予約をキャンセルする"
                }
              }
            ]
          }
        }
      ]
    };

    const response = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`LINE API Error: ${JSON.stringify(errorData)}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('LINE メッセージ送信エラー:', error);
    return NextResponse.json(
      { error: 'LINE メッセージの送信に失敗しました' },
      { status: 500 }
    );
  }
} 