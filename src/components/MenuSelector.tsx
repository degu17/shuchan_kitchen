"use client"

import type React from "react"

import { useState } from "react"

interface MenuSelectorProps {
  selectedDate: Date | null
}

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
};

// サンプルメニューデータ
const SAMPLE_MENUS: MenuItem[] = [
  {
    id: '1',
    name: '唐揚げ弁当',
    description: '自家製タルタルソース付き',
    price: 800,
  },
  {
    id: '2',
    name: '焼き魚定食',
    description: '日替わりの魚を使用',
    price: 900,
  },
  {
    id: '3',
    name: 'カレーライス',
    description: '野菜たっぷり',
    price: 750,
  },
];

export default function MenuSelector({ selectedDate }: MenuSelectorProps) {
  // 選択済みメニューのIDを管理
  const [selectedMenuIds, setSelectedMenuIds] = useState<Set<string>>(new Set());

  const handleMenuSelect = (menuId: string) => {
    setSelectedMenuIds(prev => {
      const newSet = new Set(prev);
      newSet.add(menuId);
      return newSet;
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  };

  if (!selectedDate) {
    return (
      <div className="menu-selector-container">
        <p className="text-gray-600">日付を選択してください</p>
      </div>
    );
  }

  return (
    <div className="menu-selector-container">
      <h2 className="menu-selector-title">{formatDate(selectedDate)}のメニュー</h2>
      <div className="space-y-4">
        {SAMPLE_MENUS.map((menu) => (
          <div
            key={menu.id}
            className={`menu-item ${
              selectedMenuIds.has(menu.id)
                ? 'menu-item-selected'
                : 'menu-item-unselected'
            }`}
            onClick={() => !selectedMenuIds.has(menu.id) && handleMenuSelect(menu.id)}
          >
            <div className="menu-item-content">
              <div>
                <h3 className="menu-item-info">{menu.name}</h3>
                <p className="menu-item-description">{menu.description}</p>
              </div>
              <div className="text-right">
                <p className="menu-item-price">¥{menu.price}</p>
                {selectedMenuIds.has(menu.id) && (
                  <span className="menu-item-selected-label">選択済み</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedMenuIds.size > 0 && (
        <div className="selected-menu-summary">
          <h3 className="selected-menu-title">選択済みメニュー</h3>
          <ul className="selected-menu-list">
            {Array.from(selectedMenuIds).map(id => {
              const menu = SAMPLE_MENUS.find(m => m.id === id);
              return menu && (
                <li key={id} className="selected-menu-item">
                  {menu.name} - ¥{menu.price}
                </li>
              );
            })}
          </ul>
          <p className="selected-menu-total">
            合計: ¥{Array.from(selectedMenuIds).reduce((sum, id) => {
              const menu = SAMPLE_MENUS.find(m => m.id === id);
              return sum + (menu?.price || 0);
            }, 0)}
          </p>
        </div>
      )}
    </div>
  )
}

