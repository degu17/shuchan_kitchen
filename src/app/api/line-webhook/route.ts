import { headers } from 'next/headers';
import { verifyLineSignature, LineWebhookBody, LineMessageEvent } from '@/lib/line';

const CHANNEL_ACCESS_TOKEN = '3ATEVHVRENFgCAu+HWty3SDCQvGR1oRvF6u2yTyVUWoxSFnutxfSfICEIBChr8iJGqmFd0V4YWA4qTa/fLx5nGH+yWv27of4C5RbcmPF8tf6pv/sUAc0DtXA8x3p/DWzbIQzm3OlbTHWL7jD8TM+egdB04t89/1O/w1cDnyilFU=';

type LineMessage = {
  type: string;
  text: string;
};

async function replyMessage(replyToken: string, messages: LineMessage[]) {
  const response = await fetch('https://api.line.me/v2/bot/message/reply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      replyToken: replyToken,
      messages: messages,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`LINE API Error: ${JSON.stringify(errorData)}`);
  }

  return response.json();
}

// 仮のオーダー取得関数
async function fetchOrders() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const data = await response.json();
  // JSONPlaceholderのデータを注文情報形式に変換
  return {
    orderId: data.id,
    orderDate: '2024-03-20',
    menuItems: ['唐揚げ弁当', 'みそ汁'],
    status: '準備中'
  };
}

// POSTメソッドのみを許可
export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const signature = headersList.get('x-line-signature') ?? null;

    if (!signature) {
      // 署名がない場合でも200を返す
      return new Response('OK', { status: 200 });
    }

    const rawBody = await request.text();
    
    // 署名の検証
    if (!verifyLineSignature(rawBody, signature)) {
      // 署名が無効な場合でも200を返す
      return new Response('OK', { status: 200 });
    }

    const body: LineWebhookBody = JSON.parse(rawBody);
    
    // Webhookイベントの処理
    for (const event of body.events) {
      try {
        switch (event.type) {
          case 'message':
            const messageEvent = event as LineMessageEvent;
            if (messageEvent.message.type === 'text') {
              const text = messageEvent.message.text;
              
              switch (text) {
                case 'ご飯を注文する':
                  await replyMessage(messageEvent.replyToken, [{
                    type: 'text',
                    text: '注文を受け付けました。\n以下から希望の日時を選択してください。'
                  }]);
                  break;
                  //これはサンプル　こんな感じで特定のメッセージに対するアクションを作る
                
                case '使い方':
                    break;
                
                case '注文の確認':
                  try {
                    const orderInfo = await fetchOrders();
                    await replyMessage(messageEvent.replyToken, [{
                      type: 'text',
                      text: `注文情報:\n注文番号: ${orderInfo.orderId}\n注文日: ${orderInfo.orderDate}\n商品: ${orderInfo.menuItems.join(', ')}\nステータス: ${orderInfo.status}`
                    }]);
                  } catch (error) {
                    await replyMessage(messageEvent.replyToken, [{
                      type: 'text',
                      text: '注文情報の取得に失敗しました。しばらく経ってから再度お試しください。'
                    }]);
                  }
                  break;
                
                default:
                  await replyMessage(messageEvent.replyToken, [{
                    type: 'text',
                    text: '個別メッセージを受付ました。柊人ママに送信されます。'
                  }]);
                  break;
              }
            }
            break;

          //case 'follow':
            //await replyMessage(event.replyToken, [{
              //type: 'text',
              //text: 'しゅうちゃん食堂へようこそ！下記のメニューから選んでください。'
            //}]);
            //break; 
            //これはフォローしたときのメッセージ例。今回はLINE側で作成
        }
      } catch (eventError) {
        console.error('Event processing error:', eventError);
        // イベント処理エラーでも継続
        continue;
      }
    }

    // 常に200 OKを返す
    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    // エラーが発生しても200を返す
    return new Response('OK', { status: 200 });
  }
} 