import { useState } from 'react';

interface LineNotificationSettingsProps {
  onSave: (token: string) => void;
}

export default function LineNotificationSettings({ onSave }: LineNotificationSettingsProps) {
  const [lineToken, setLineToken] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(lineToken);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">LINE通知設定</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="lineToken" className="block text-sm font-medium text-gray-700 mb-2">
            LINEアクセストークン
          </label>
          <input
            type="password"
            id="lineToken"
            value={lineToken}
            onChange={(e) => setLineToken(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="LINE Notify のアクセストークンを入力"
          />
        </div>
        <div className="text-sm text-gray-600">
          <p>※ LINE Notify のアクセストークンは以下の手順で取得できます：</p>
          <ol className="list-decimal ml-5 mt-2">
            <li>LINE Notify にアクセス (https://notify-bot.line.me/ja/)</li>
            <li>ログイン後、マイページから「トークンを発行する」を選択</li>
            <li>トークン名を入力し、通知を送信したいトークルームを選択</li>
            <li>発行されたトークンをこちらに入力してください</li>
          </ol>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          設定を保存
        </button>
        {isSaved && (
          <p className="text-green-600 text-center">設定を保存しました</p>
        )}
      </form>
    </div>
  );
} 