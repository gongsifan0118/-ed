
import React from 'react';

const Navbar: React.FC = () => {
  const navItems = [
    { name: '项目管理', active: false },
    { name: '数据洞察', active: false },
    { name: '数据任务', active: false },
    { name: '手动补文', active: false },
    { name: '预警', active: true },
    { name: '维护工具', active: false },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-[1600px] mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center space-x-10">
          {/* Logo Area */}
          <div className="flex items-center space-x-2">
            <div className="grid grid-cols-2 gap-0.5 bg-blue-600 p-1.5 rounded-sm">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
            <span className="text-xl font-bold text-blue-600 tracking-tight">Easy Data</span>
          </div>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center space-x-8 text-sm font-medium">
            {navItems.map((item) => (
              <a
                key={item.name}
                href="#"
                className={`h-14 flex items-center transition-colors ${
                  item.active
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* User Profile Area */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-slate-600 cursor-pointer hover:text-blue-600 transition-colors">
            <span className="material-icons text-xl">account_circle</span>
            <span className="font-medium">Gong Si Fan 龚思帆</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
