import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { STATS_DATA, KPI_DATA } from '../constants';

const Dashboard: React.FC = () => {
  return (
    <section id="dashboard" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[#D21034] font-bold text-sm tracking-wider uppercase">التقييم والمتابعة</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">لوحة القيادة الوطنية</h2>
          <p className="text-gray-600">مؤشرات النجاح والأثر الاجتماعي لمشروع مشاعل الأمة.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Distribution Chart */}
          <div className="bg-slate-50 p-6 rounded-2xl shadow-md border border-slate-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6 border-r-4 border-[#006233] pr-3">توزيع المشاعل حسب الفئات العمرية</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={STATS_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {STATS_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Impact Chart */}
          <div className="bg-slate-50 p-6 rounded-2xl shadow-md border border-slate-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6 border-r-4 border-[#D21034] pr-3">تطور المبادرات والأثر المجتمعي</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={KPI_DATA}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ direction: 'rtl', textAlign: 'right', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Bar dataKey="initiatives" name="المبادرات المنفذة" fill="#006233" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="impact" name="المستفيدين (عشرات)" fill="#D21034" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-[#006233] to-emerald-800 rounded-xl p-6 text-white text-center">
            <div className="text-4xl font-bold mb-1">12K+</div>
            <div className="text-sm opacity-80">مشعل مسجل</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
            <div className="text-4xl font-bold mb-1 text-gray-800">58</div>
            <div className="text-sm text-gray-500">ولاية مغطاة</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
            <div className="text-4xl font-bold mb-1 text-gray-800">850</div>
            <div className="text-sm text-gray-500">مبادرة وطنية</div>
          </div>
          <div className="bg-gradient-to-br from-[#D21034] to-rose-800 rounded-xl p-6 text-white text-center">
            <div className="text-4xl font-bold mb-1">45</div>
            <div className="text-sm opacity-80">شريك مؤسسي</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
