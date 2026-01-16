
import React from 'react';
import { DataItem } from '../types';

const mockData: DataItem[] = [
  {
    id: 1,
    title: "霸王茶姬伯牙绝弦杯子底部发现异物，客服处理态度消极",
    content: "投诉问题：食品安全/异物。 投诉要求：按照食品安全法赔偿1000元并道歉。 2026-01-02 09:15:33 于黑猫投诉平台发起。在上海某门店购买的伯牙绝弦，喝到一半发现杯底有类似塑料碎片的异物，联系店长只愿意退单杯奶茶钱，霸王条款拒绝额外赔偿...",
    source: "黑猫投诉",
    category: "投诉类",
    author: "茶味喵",
    date: "2026-01-02 09:15:33",
    views: 125,
    comments: 12,
    shares: 4,
    likes: 8,
    tags: ["食品安全", "霸王茶姬"],
    sentiment: "negative",
    isDelayed: false
  },
  {
    id: 2,
    title: "霸王茶姬新品“万山红”口感翻车？网友吐槽像中药排骨汤",
    content: "社交媒体热点。大量用户在小红书、微博吐槽近期推出的万山红系列。部分用户表示：诱导消费，实物与宣传不符，霸王条款不支持由于口味原因的退款。该话题正在社交媒体迅速蔓延，涉及多个一线城市核心商圈门店...",
    source: "微博热搜",
    category: "舆情动态",
    author: "奶茶控",
    date: "2026-01-02 14:32:00",
    views: 8900,
    comments: 450,
    shares: 120,
    likes: 340,
    tags: ["新品反馈", "负面趋势"],
    sentiment: "negative",
    isDelayed: true
  }
];

const ContentList: React.FC = () => {
  return (
    <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
      {/* List Header */}
      <div className="flex items-center justify-between p-3 bg-slate-50 border-b border-slate-200 text-[11px] font-medium">
        <div className="flex items-center space-x-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-slate-500">全选当前页</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-slate-500">全选检索结果</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-slate-500">含聚类</span>
          </label>
          <span className="text-slate-500">共计: <span className="text-blue-600 font-bold">1,420</span> 个 (总量: 5,680)</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center px-3 py-1 bg-slate-200 rounded text-slate-600 hover:bg-slate-300 transition-colors">
            <span className="material-icons text-sm mr-1">visibility</span> 已查看
          </button>
          <button className="flex items-center px-3 py-1 bg-slate-600 text-white rounded hover:bg-slate-700 transition-colors">
            <span className="material-icons text-sm mr-1">bookmark</span> 保留
          </button>
          <button className="px-3 py-1 border border-slate-300 rounded text-slate-500 hover:bg-slate-50">取消初保留</button>
          <button className="px-3 py-1 bg-slate-300 rounded text-slate-700 hover:bg-slate-400">批量处理</button>
        </div>
      </div>

      {/* Items */}
      <div className="divide-y divide-slate-100">
        {mockData.map((item) => (
          <div key={item.id} className="p-4 flex group hover:bg-blue-50/30 transition-all">
            <div className="flex flex-col items-center mr-5 pt-1">
              <span className="text-[10px] text-blue-500 font-bold mb-2">{item.id}</span>
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center mb-1.5">
                <h3 className="text-sm font-bold text-slate-800 hover:text-blue-600 cursor-pointer transition-colors leading-snug">
                  {item.title} 
                  {item.isDelayed && (
                    <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded ml-2 font-medium">异常</span>
                  )}
                  <span className="material-symbols-outlined text-[16px] text-blue-400 ml-2 align-middle">verified_user</span>
                </h3>
              </div>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed max-w-6xl">
                {item.content.split('霸王茶姬').map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span style={{ color: '#0033EE', fontWeight: 'bold' }}>霸王茶姬</span>
                    )}
                  </React.Fragment>
                ))}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-[11px] text-slate-400">
                  <span className="text-blue-500 font-medium cursor-pointer hover:underline">{item.category}</span>
                  <span className="border-l border-slate-200 pl-4">{item.source}</span>
                  <span>{item.author}</span>
                  <span className="border-l border-slate-200 pl-4">{item.date}</span>
                  <div className="flex items-center space-x-3 ml-2 border-l border-slate-200 pl-4">
                    <span className="flex items-center"><span className="material-icons text-xs mr-0.5 opacity-60">visibility</span> {item.views}</span>
                    <span className="flex items-center"><span className="material-icons text-xs mr-0.5 opacity-60">comment</span> {item.comments}</span>
                    <span className="flex items-center"><span className="material-icons text-xs mr-0.5 opacity-60">thumb_up</span> {item.likes}</span>
                  </div>
                </div>
                <button className="flex items-center px-4 py-1.5 bg-slate-600 text-white text-xs font-bold rounded shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-700">
                  <span className="material-icons text-sm mr-1">bookmark</span> 保留
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination (Simplified for clarity) */}
      <div className="p-4 flex items-center justify-between border-t border-slate-100 bg-slate-50/30">
        <div className="text-slate-400 text-xs font-medium">
          显示 1 - 2 之 1,420 条数据
        </div>
        <div className="flex items-center space-x-1.5">
          <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded bg-white text-slate-600 font-bold text-xs shadow-sm">1</button>
          <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded bg-white text-slate-400 hover:text-blue-600 text-xs shadow-sm">2</button>
          <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded bg-white text-slate-400 hover:text-blue-600 text-xs shadow-sm">3</button>
        </div>
      </div>
    </div>
  );
};

export default ContentList;
