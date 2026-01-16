
import React, { useState, useMemo } from 'react';
import { AlertGroup } from '../types';

interface TopicDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockAlerts: AlertGroup[] = [
  {
    id: 1,
    name: "2026 霸王茶姬春季新品口碑预警",
    monitoringItem: "霸王茶姬-品牌公关部",
    topicCount: 4,
    topics: [
      { id: 101, name: "#霸王茶姬万山红好难喝#", platform: "微博", date: "2026-01-02 12:00", reads: "4.2w", discuss: "1.2k", likes: "8.5k", type: "负面#话题预警" },
      { id: 102, name: "#伯牙绝弦杯底异物事件#", platform: "小红书", date: "2026-01-02 10:45", reads: "1.5w", discuss: "450", likes: "2.1k", type: "敏感#话题预警" },
      { id: 103, name: "#霸王茶姬包装被指抄袭大牌#", platform: "抖音", date: "2026-01-02 09:30", reads: "8.8w", discuss: "5.6k", likes: "12w", type: "负面#话题预警" },
      { id: 104, name: "#排队2小时只为一杯霸王茶姬#", platform: "朋友圈", date: "2026-01-02 08:00", reads: "5k", discuss: "89", likes: "231", type: "非风险" }
    ]
  },
  {
    id: 2,
    name: "霸王茶姬加盟商维权趋势监测",
    monitoringItem: "运营管理组-风险控制",
    topicCount: 3,
    topics: [
      { id: 201, name: "#二线城市霸王茶姬闭店潮#", platform: "今日头条", date: "2026-01-02 11:20", reads: "2.1w", discuss: "340", likes: "1.2k", type: "负面#话题预警" },
      { id: 202, name: "#霸王茶姬加盟政策变动争议#", platform: "知乎", date: "2026-01-02 10:15", reads: "8k", discuss: "120", likes: "400", type: "敏感#话题预警" },
      { id: 203, name: "#加盟商控诉霸王茶姬割韭菜#", platform: "微博", date: "2026-01-02 09:00", reads: "3.4w", discuss: "980", likes: "5.5k", type: "负面#话题预警" }
    ]
  },
  {
    id: 3,
    name: "霸王茶姬与茶百道联名热度",
    monitoringItem: "市场营销-联名项目组",
    topicCount: 2,
    topics: [
      { id: 301, name: "#霸王茶姬茶百道世纪联名#", platform: "微博", date: "2026-01-02 14:00", reads: "25w", discuss: "12w", likes: "45w", type: "非风险" },
      { id: 302, name: "#联名杯垫被黄牛炒至百元#", platform: "闲鱼", date: "2026-01-02 15:30", reads: "1.2w", discuss: "890", likes: "3.2k", type: "敏感#话题预警" }
    ]
  }
];

const TopicDrawer: React.FC<TopicDrawerProps> = ({ isOpen, onClose }) => {
  const [expandedRows, setExpandedRows] = useState<number[]>([1]);
  const [filterAlert, setFilterAlert] = useState('');
  const [filterItem, setFilterItem] = useState('');
  const [filterTopic, setFilterTopic] = useState('');
  const [filterRisk, setFilterRisk] = useState('全部');

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} style={{ color: '#0033EE', fontWeight: 'bold' }}>{part}</span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const filteredAlerts = useMemo(() => {
    return mockAlerts.map(alert => {
      const alertMatch = alert.name.toLowerCase().includes(filterAlert.toLowerCase());
      const itemMatch = alert.monitoringItem.toLowerCase().includes(filterItem.toLowerCase());
      
      const filteredTopics = alert.topics.filter(t => {
        const nameMatch = t.name.toLowerCase().includes(filterTopic.toLowerCase());
        const riskMatch = filterRisk === '全部' || t.type === filterRisk;
        return nameMatch && riskMatch;
      });

      // Show alert if its name or item matches (and we aren't filtering specifically by a non-matching topic/risk)
      // Or if any of its topics match both name and risk filters
      if (filteredTopics.length > 0) {
        return { ...alert, topics: filteredTopics };
      }
      return null;
    }).filter(Boolean) as AlertGroup[];
  }, [filterAlert, filterItem, filterTopic, filterRisk]);

  const toggleRow = (id: number) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      {/* Drawer Content */}
      <div className="relative w-[1100px] h-full bg-white flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-800 flex items-center">
            <span className="w-1 h-4 bg-blue-600 rounded-full mr-3"></span>
            话题清单
          </h2>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <span className="material-icons">close</span>
          </button>
        </div>

        {/* Filter Area */}
        <div className="p-6 bg-slate-50/50 border-b border-slate-100">
          <div className="grid grid-cols-4 gap-6">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">预警名称</label>
              <input 
                className="w-full text-xs border-slate-200 rounded focus:ring-1 focus:ring-blue-600 outline-none px-3 py-2 bg-white" 
                placeholder="搜索预警名称" 
                type="text"
                value={filterAlert}
                onChange={(e) => setFilterAlert(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">监测项</label>
              <input 
                className="w-full text-xs border-slate-200 rounded focus:ring-1 focus:ring-blue-600 outline-none px-3 py-2 bg-white" 
                placeholder="搜索监测项" 
                type="text"
                value={filterItem}
                onChange={(e) => setFilterItem(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">话题名称</label>
              <input 
                className="w-full text-xs border-slate-200 rounded focus:ring-1 focus:ring-blue-600 outline-none px-3 py-2 bg-white" 
                placeholder="搜索话题" 
                type="text"
                value={filterTopic}
                onChange={(e) => setFilterTopic(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">风险级别</label>
              <select 
                className="w-full text-xs border-slate-200 rounded focus:ring-1 focus:ring-blue-600 outline-none py-2 px-3 bg-white"
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
              >
                <option value="全部">全部</option>
                <option value="负面#话题预警">负面#话题预警</option>
                <option value="敏感#话题预警">敏感#话题预警</option>
                <option value="非风险">非风险</option>
              </select>
            </div>
            
            {/* Added Time Selection Row */}
            <div className="col-span-2 space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">时间范围</label>
              <div className="flex items-center border border-slate-200 rounded px-3 py-2 bg-white">
                <input className="w-full text-xs bg-transparent border-none focus:ring-0 p-0" placeholder="开始时间" type="text" defaultValue="2026-01-01 00:00" />
                <span className="mx-2 text-slate-300 text-xs">→</span>
                <input className="w-full text-xs bg-transparent border-none focus:ring-0 p-0" placeholder="结束时间" type="text" defaultValue="2026-01-31 23:59" />
                <span className="material-symbols-outlined text-sm text-slate-400 ml-2">calendar_month</span>
              </div>
            </div>

            <div className="col-span-2 flex items-end justify-end space-x-3">
              <button 
                onClick={() => { setFilterAlert(''); setFilterItem(''); setFilterTopic(''); setFilterRisk('全部'); }}
                className="px-5 py-2 text-xs font-bold text-slate-600 border border-slate-200 rounded hover:bg-white transition-all shadow-sm"
              >
                清空重置
              </button>
              <button className="px-10 py-2 text-xs font-bold text-white bg-blue-600 rounded hover:bg-blue-700 shadow-md transition-all">确认筛选</button>
            </div>
          </div>
        </div>

        {/* Table List */}
        <div className="flex-1 overflow-auto">
          <table className="w-full border-collapse">
            <thead className="bg-slate-50 sticky top-0 z-10 border-b border-slate-200">
              <tr>
                <th className="w-14"></th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">预警名称</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">监测项</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">话题数</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAlerts.length > 0 ? filteredAlerts.map(alert => (
                <React.Fragment key={alert.id}>
                  <tr className="hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => toggleRow(alert.id)}>
                    <td className="text-center py-5">
                      <span className={`material-symbols-outlined text-blue-500 transition-transform font-bold ${expandedRows.includes(alert.id) ? 'rotate-180' : 'rotate-270'}`}>
                        expand_more
                      </span>
                    </td>
                    <td className="px-4 py-5 text-[15px] font-bold text-slate-800">
                      {highlightText(alert.name, filterAlert)}
                    </td>
                    <td className="px-4 py-5 text-xs text-slate-500 font-medium">
                      {highlightText(alert.monitoringItem, filterItem)}
                    </td>
                    <td className="px-4 py-5 text-xs">
                      <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded font-bold border border-blue-100 min-w-[32px] inline-block text-center shadow-sm">
                        {alert.topics.length}
                      </span>
                    </td>
                  </tr>
                  
                  {expandedRows.includes(alert.id) && (
                    <tr className="bg-slate-50/40">
                      <td colSpan={4} className="p-0">
                        <div className="pl-20 pr-8 pb-8 pt-2 space-y-4">
                          {alert.topics.length > 0 ? alert.topics.map(topic => (
                            <div key={topic.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                              <div className="flex flex-col space-y-3">
                                <a className="text-[15px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors" href="#">
                                  {highlightText(topic.name, filterTopic)}
                                </a>
                                <div className="flex items-center text-xs text-slate-400 space-x-4">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                                    topic.type.includes('负面') || topic.type.includes('敏感') 
                                      ? 'bg-red-50 text-red-500 border border-red-100' 
                                      : 'bg-slate-50 text-slate-600 border border-slate-200'
                                  }`}>
                                    {topic.type}
                                  </span>
                                  <span className="h-3 w-px bg-slate-200"></span>
                                  <span className="font-bold text-slate-500">{topic.platform}</span>
                                  <span className="h-3 w-px bg-slate-200"></span>
                                  <span className="font-medium text-slate-500">{topic.date}</span>
                                  <span className="h-3 w-px bg-slate-200"></span>
                                  <div className="flex items-center space-x-6">
                                    <span className="flex items-center"><span className="font-bold text-slate-700 mr-1.5">{topic.reads}</span> 展现</span>
                                    <span className="flex items-center"><span className="font-bold text-slate-700 mr-1.5">{topic.discuss}</span> 评论</span>
                                    <span className="flex items-center"><span className="font-bold text-slate-700 mr-1.5">{topic.likes}</span> 热度</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )) : (
                            <div className="text-center py-10 bg-white rounded-xl border border-dashed border-slate-300">
                               <span className="material-symbols-outlined text-slate-300 text-4xl block mb-2">search_off</span>
                               <span className="text-slate-400 text-xs font-medium">该分组下暂无匹配的话题</span>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              )) : (
                <tr>
                  <td colSpan={4} className="py-20 text-center">
                    <div className="flex flex-col items-center">
                      <span className="material-symbols-outlined text-slate-200 text-6xl mb-4">dataset</span>
                      <p className="text-slate-400 font-bold text-sm">未搜索到相关预警项，请尝试更换关键词</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-white">
          <div className="text-xs font-bold text-slate-400">
            命中结果: <span className="text-blue-600">{filteredAlerts.length}</span> / {mockAlerts.length}
          </div>
          <div className="flex items-center space-x-1.5">
            <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded bg-blue-600 text-white text-xs font-bold shadow-md">1</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicDrawer;
