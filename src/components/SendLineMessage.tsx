import { useState } from 'react';

export default function SendLineMessage() {
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  const handleSendMessage = async () => {
    try {
      setIsSending(true);
      setResult(null);

      const response = await fetch('/api/line-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'メッセージの送信に失敗しました');
      }

      setResult({ success: true });
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : 'エラーが発生しました' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">LINEメッセージ送信</h2>
      <button
        onClick={handleSendMessage}
        disabled={isSending}
        className={`w-full py-2 px-4 rounded-md text-white transition-colors ${
          isSending ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isSending ? '送信中...' : 'メニュー選択メッセージを送信'}
      </button>
      {result?.success && (
        <p className="mt-2 text-green-600 text-center">メッセージを送信しました</p>
      )}
      {result?.error && (
        <p className="mt-2 text-red-600 text-center">{result.error}</p>
      )}
    </div>
  );
} 