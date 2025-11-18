import React from 'react';
import { LEVELS } from '../constants';
import { ChevronLeft, Medal } from 'lucide-react';

const Levels: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#006233] mb-4">مستويات المشاعل والتكريم</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            نظام ترقٍ قيمي دقيق يبدأ من "القدوة" في محيطه الضيق وصولاً إلى "الحكيم" الذي يمثل الضمير الوطني، مع منظومة تكريم رسمية على أعلى مستويات الدولة.
          </p>
          <div className="w-24 h-1 bg-[#D21034] mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-20">
          {LEVELS.map((level) => {
            const Icon = level.icon;
            return (
              <div 
                key={level.id} 
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-[#006233] flex flex-col items-center text-center h-full"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${level.color} transition-transform group-hover:scale-110`}>
                  <Icon size={32} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">{level.title}</h3>
                <p className="text-sm text-gray-500 mb-4 flex-grow">{level.description}</p>
                
                <div className="w-full space-y-2 mb-4 text-right">
                  <h4 className="text-xs font-bold text-gray-400">المعايير:</h4>
                  <ul className="text-xs text-gray-600 list-disc list-inside">
                    {level.criteria.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>

                <div className="w-full border-t border-gray-100 pt-4 mt-auto bg-gray-50 -mx-6 -mb-6 p-4 rounded-b-2xl">
                  <div className="text-xs font-semibold text-[#D21034] mb-1 flex items-center justify-center gap-1">
                    <Medal size={12} /> التكريم الرسمي
                  </div>
                  <div className="text-sm font-bold text-gray-700 mb-1">{level.award}</div>
                  <div className="text-xs text-gray-500">يمنحها: {level.presenter}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-[#006233] rounded-3xl p-8 md:p-12 relative overflow-hidden text-white shadow-2xl mx-auto max-w-5xl">
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-right md:flex-1">
                 <h3 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-300">الدرع الرئاسي للمشعل الاستثنائي الوطني</h3>
                 <p className="opacity-90 mb-6 leading-relaxed">
                   أرفع جائزة شرفية في منظومة مشاعل الأمة، تُمنح للمشاعل الذين بلغوا ذروة الأداء القيمي والوطني، وجسدوا في مسيرتهم أسمى معاني القيم الخمس: الأخلاقية، الوطنية، الإنسانية، الاجتماعية، والقيادية.
                 </p>
                 <div className="inline-block bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-yellow-400/50 text-yellow-100 font-semibold">
                    يُسلم شخصياً من طرف رئيس الجمهورية
                 </div>
              </div>
              <div className="flex-shrink-0">
                 <div className="w-40 h-40 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border-4 border-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.5)]">
                    <span className="text-7xl">🏆</span>
                 </div>
              </div>
           </div>
           {/* Decorative background circle */}
           <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
           <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>

        <div className="mt-12 text-center max-w-3xl mx-auto p-6 bg-amber-50 border border-amber-100 rounded-xl">
          <h4 className="text-amber-800 font-bold mb-2">تنويه هام</h4>
          <p className="text-amber-700 text-sm">
            كل من يتقلد منصبًا مهما كان ضمن المشروع، يجب أن يكون "مشعل قدوة" على الأقل. التكريم ليس تشريفاً فقط، بل مسؤولية وطنية مستمرة.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Levels;
