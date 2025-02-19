import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message, token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'LINE Notifyトークンが設定されていません' },
        { status: 400 }
      );
    }

    if (!message) {
      return NextResponse.json(
        { error: 'メッセージが指定されていません' },
        { status: 400 }
      );
    }

    const response = await fetch('https://notify-api.line.me/api/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`,
      },
      body: new URLSearchParams({
        message: message,
      }),
    });

    if (!response.ok) {
      throw new Error('LINE Notify APIへの送信に失敗しました');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('LINE通知エラー:', error);
    return NextResponse.json(
      { error: 'LINE通知の送信に失敗しました' },
      { status: 500 }
    );
  }
} 