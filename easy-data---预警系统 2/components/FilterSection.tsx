
import React from 'react';

interface FilterSectionProps {
  onTopicListClick: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ onTopicListClick }) => {
  return (
    <div className="bg-white rounded shadow-sm border border-slate-200 p-5 space-y-5">
      {/* Row 1: GID and Entry Time */}
      <div className="grid grid-cols-12 gap-x-8 gap-y-4 items-center">
        <div className="col-span-4 flex items-center space-x-3">
          <label className="text-xs text-slate-500 w-16 text-right font-medium">客户GID</label>
          <div className="flex-1 flex items-center border border-slate-200 rounded px-2 py-1 bg-slate-50">
            <div className="bg-white px-2 py-0.5 text-xs rounded border border-slate-200 flex items-center shadow-sm">
              CJSH <span className="ml-1 text-slate-400 cursor-pointer hover:text-red-500">×</span>
            </div>
            <input
              className="bg-transparent border-none focus:ring-0 text-sm flex-1 placeholder:text-slate-400"
              placeholder="请输入"
              type="text"
            />
          </div>
        </div>

        <div className="col-span-5 flex items-center space-x-3">
          <label className="text-xs text-slate-500 w-16 text-right font-medium">入库时间</label>
          <div className="flex-1 flex items-center space-x-2">
            <div className="flex-1 flex items-center border border-slate-200 rounded px-3 py-1.5 bg-white">
              <input className="w-full text-xs bg-transparent border-none focus:ring-0 p-0" placeholder="开始日期" type="text" />
              <span className="mx-2 text-slate-300">→</span>
              <input className="w-full text-xs bg-transparent border-none focus:ring-0 p-0" placeholder="结束日期" type="text" />
              <span className="material-icons text-sm text-slate-400 ml-2">calendar_today</span>
            </div>
            <div className="flex bg-blue-600 rounded overflow-hidden">
              <button className="px-3 py-1.5 text-xs text-white bg-blue-600 border-r border-blue-500 hover:bg-blue-700">交班</button>
              <button className="px-3 py-1.5 text-xs text-white bg-blue-600 hover:bg-blue-700">接班</button>
            </div>
          </div>
        </div>

        <div className="col-span-3 text-right">
          <button className="text-xs font-medium text-slate-600 border border-slate-200 rounded px-4 py-2 hover:bg-slate-50 transition-colors">条件管理</button>
        </div>

        {/* Row 2: Send Time and Select GID */}
        <div className="col-span-4 flex items-center space-x-3">
          <label className="text-xs text-slate-500 w-16 text-right font-medium">收发时间</label>
          <div className="flex-1 flex items-center border border-slate-200 rounded px-3 py-1.5 bg-white">
            <input className="w-full text-xs bg-transparent border-none focus:ring-0 p-0" type="text" defaultValue="2026-01-01 00:00:00" />
            <span className="mx-2 text-slate-300">→</span>
            <input className="w-full text-xs bg-transparent border-none focus:ring-0 p-0" type="text" defaultValue="2026-01-31 12:24:12" />
            <span className="material-icons text-sm text-slate-400 ml-2">calendar_today</span>
          </div>
        </div>

        <div className="col-span-8 flex items-center space-x-3">
          <label className="text-xs text-slate-500 w-16 text-right font-medium">选择GID</label>
          <div className="flex space-x-2">
            <span className="px-3 py-1.5 bg-slate-100 text-xs rounded border border-slate-200 font-medium">
              CJSH(<span className="text-red-600">6,513</span>)
            </span>
          </div>
        </div>
      </div>

      {/* Keyword Matching Boxes */}
      <div className="flex pt-2 border-t border-slate-100">
        <div className="w-12 pt-2">
          <div className="flex flex-col bg-slate-100 rounded border border-slate-200 overflow-hidden">
            <button className="bg-blue-600 text-white text-[10px] py-2 px-1 font-bold">简单</button>
            <button className="text-slate-500 text-[10px] py-2 px-1 font-bold hover:bg-slate-200">高级</button>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-3 gap-4 ml-3">
          {[
            { label: '任一满足', placeholder: '任一满足，满足框内任一关键词都会被搜索出来 (多关键词间是or关系)...' },
            { label: '同时满足', placeholder: '同时满足，同时满足框内多个关键词时，才会被搜索出来 (关键词间是and关系)...' },
            { label: '排除词', placeholder: '排除词，文章包含该关键词时则不会被搜索出 (多关键词间是or关系)...' }
          ].map((box, idx) => (
            <div key={idx} className="relative group">
              <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] font-bold text-slate-400 z-10">{box.label}</label>
              <textarea
                className="w-full h-24 border border-slate-200 rounded p-3 text-xs focus:ring-1 focus:ring-blue-600 focus:border-blue-600 resize-none bg-slate-50/30 placeholder:text-slate-400"
                placeholder={box.placeholder}
              />
              <span className="material-icons text-slate-300 absolute bottom-2 right-2 cursor-pointer hover:text-red-500 transition-colors">delete_outline</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar: Checkboxes and Actions */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center space-x-6">
          <span className="text-xs font-bold text-slate-500">匹配内容</span>
          <div className="flex items-center space-x-4">
            {['全选', '标题', '内容', '仅OCR', '媒体名称', '账号名称'].map((label, i) => (
              <label key={label} className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="checkbox"
                  defaultChecked={i === 0 || i === 1 || i === 2 || i === 3 || i === 4 || i === 5}
                  className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs text-slate-600 group-hover:text-blue-600 transition-colors">{label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="px-6 py-2 border border-slate-200 text-xs font-medium rounded hover:bg-slate-50 transition-colors">重置</button>
          <button className="px-6 py-2 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 shadow-sm transition-colors">保存条件</button>
          <button className="px-10 py-2 bg-blue-700 text-white text-xs font-bold rounded hover:bg-blue-800 flex items-center shadow-md transition-colors">
            <span className="material-icons text-sm mr-2">search</span> 搜索
          </button>
        </div>
      </div>

      {/* Secondary Tabs & Filter Options */}
      <div className="pt-4 border-t border-slate-100 flex items-center space-x-4">
        <div className="flex items-center bg-slate-100 rounded p-1">
          {['全部', '党央媒', '重点媒体', '政府网站', '投诉网站'].map((tab, i) => (
            <button
              key={tab}
              className={`px-4 py-1.5 text-xs font-medium rounded transition-all ${
                i === 0 ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="flex-1 flex items-center space-x-2">
          <button 
            onClick={onTopicListClick}
            className="flex items-center bg-blue-600 text-white rounded px-4 py-1.5 text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            话题清单
          </button>
          <button className="bg-blue-600 text-white rounded px-4 py-1.5 text-xs font-medium">话题</button>
          <select className="bg-slate-50 border border-slate-200 rounded text-xs py-1.5 px-3 min-w-[120px] focus:ring-1 focus:ring-blue-600 outline-none">
            <option>全部</option>
          </select>
          <div className="flex items-center border border-slate-200 rounded bg-white px-3 py-1.5">
            <input className="bg-transparent border-none p-0 text-xs w-20 focus:ring-0 outline-none" placeholder="新情感" type="text"/>
          </div>
          <div className="flex items-center border border-slate-200 rounded bg-white px-3 py-1.5">
            <span className="text-xs text-slate-500">负面概率</span>
          </div>
          <label className="flex items-center space-x-2 px-2 cursor-pointer">
            <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-[10px] leading-tight text-slate-600">只看疑似<br/>负面</span>
          </label>
          <div className="flex items-center border border-slate-200 rounded bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 cursor-pointer hover:bg-slate-100">
            负面分值 <span className="material-icons text-sm ml-1">expand_more</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <button className="px-4 py-1.5 border border-blue-400 text-blue-600 text-xs font-medium rounded hover:bg-blue-50 transition-colors">原转载</button>
          <button className="px-4 py-1.5 border border-slate-200 text-xs font-medium rounded bg-white hover:bg-slate-50">废文标签</button>
          <button className="px-4 py-1.5 border border-slate-400 text-xs font-medium rounded bg-white hover:bg-slate-50">废文标记</button>
          <button className="px-4 py-1.5 border border-slate-200 text-xs font-medium rounded bg-white hover:bg-slate-50">主体显著性</button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
