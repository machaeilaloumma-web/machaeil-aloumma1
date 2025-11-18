import React from 'react';
import { Target, Eye, Heart, Shield, Lightbulb, Scale, Users } from 'lucide-react';

const VisionSection: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#006233] mb-4">الرؤية، الرسالة، والأهداف الاستراتيجية</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            "الجزائر الجديدة، وعي، مسؤولية، قيم، وحدوية، ونهضة مستدامة."
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-slate-50 p-8 rounded-2xl border-r-4 border-[#006233] shadow-md">
             <div className="w-16 h-16 bg-green-100 text-[#006233] rounded-full flex items-center justify-center mb-6">
                <Eye size={32} />
             </div>
             <h2 className="text-2xl font-bold mb-4">الرؤية</h2>
             <p className="text-gray-700 text-lg leading-relaxed">
               أن يكون كل جزائري شعلةً مضيئةً في وطنه، يحمل وعيًا، ويزرع قيمة، ويصنع أثرًا. الجزائر الجديدة: وطن واعٍ، مسؤول، قائم على القيم، متماسك في وحدته.
             </p>
          </div>
          
          <div className="bg-slate-50 p-8 rounded-2xl border-r-4 border-[#D21034] shadow-md">
             <div className="w-16 h-16 bg-red-100 text-[#D21034] rounded-full flex items-center justify-center mb-6">
                <Target size={32} />
             </div>
             <h2 className="text-2xl font-bold mb-4">الرسالة</h2>
             <p className="text-gray-700 text-lg leading-relaxed">
               إعداد جيل واعٍ، قادر على مواجهة التحديات الفكرية والاجتماعية، وتطبيق القيم الوطنية والأخلاقية. تحويل القيم إلى ممارسة، والوعي إلى حركة.
             </p>
          </div>
        </div>

        {/* Strategic Axes */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">المحاور الاستراتيجية للمشروع</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:border-[#006233] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="text-[#D21034]" />
                <h3 className="font-bold text-lg">تعزيز الوعي الوطني والقيمي</h3>
              </div>
              <p className="text-gray-600 text-sm">تحرير العقول بعد الأرض، غرس القيم الأخلاقية، ونقل تجربة الرموز والمجاهدين.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:border-[#006233] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCapIcon className="text-[#006233]" />
                <h3 className="font-bold text-lg">التربية والإعداد للنهضة</h3>
              </div>
              <p className="text-gray-600 text-sm">التعليم الأخلاقي والاجتماعي، إعداد الأجيال القادمة، وحماية الشباب من الانحراف.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:border-[#006233] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="text-[#D21034]" />
                <h3 className="font-bold text-lg">الوحدة والتلاحم الاجتماعي</h3>
              </div>
              <p className="text-gray-600 text-sm">تعزيز التضامن، الحفاظ على التراث، ومواجهة الانقسامات والفوضى.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:border-[#006233] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-[#006233]" />
                <h3 className="font-bold text-lg">العمل الوطني والبناء المستدام</h3>
              </div>
              <p className="text-gray-600 text-sm">تطوير المشاريع الوطنية، تفعيل القدوات العملية، والتصدي لكل تهديد للهوية.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:border-[#006233] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="text-[#D21034]" />
                <h3 className="font-bold text-lg">الرؤية المستقبلية</h3>
              </div>
              <p className="text-gray-600 text-sm">الربط بين الماضي والحاضر والمستقبل، وبناء الجزائر الجديدة المستدامة.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component locally
const GraduationCapIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

export default VisionSection;
