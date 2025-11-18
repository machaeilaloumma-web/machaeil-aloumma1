import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import VisionSection from './components/VisionSection';
import Levels from './components/Levels';
import Dashboard from './components/Dashboard';
import GeminiChat from './components/GeminiChat';
import StudentGeminiChat from './components/StudentGeminiChat';
import YouthGeminiChat from './components/YouthGeminiChat';
import ParentsGeminiChat from './components/ParentsGeminiChat';
import SeniorsGeminiChat from './components/SeniorsGeminiChat';
import Footer from './components/Footer';
import { SYMBOLS_DATA, AGE_GROUPS, PROGRAM_PILLARS } from './constants';
import { BookOpen, Users, Award, Shield, Target } from 'lucide-react';

// --- Page Components (Internal for simplicity in this environment) ---

const HomePage: React.FC<{ setPage: (page: string) => void }> = ({ setPage }) => (
  <>
    <Hero setPage={setPage} />
    <div className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-[#006233]">مشروع وطني متكامل</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div onClick={() => setPage('vision')} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="w-16 h-16 bg-red-50 text-[#D21034] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">الرؤية والأهداف</h3>
            <p className="text-gray-600">رؤية الجزائر الجديدة القائمة على الوعي والمسؤولية والقيم.</p>
          </div>
          <div onClick={() => setPage('levels')} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="w-16 h-16 bg-green-50 text-[#006233] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Award size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">مستويات المشاعل</h3>
            <p className="text-gray-600">من القدوة إلى الحكيم، مسار للارتقاء بالقيم وبناء الوطن.</p>
          </div>
          <div onClick={() => setPage('program')} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">البرنامج الوطني</h3>
            <p className="text-gray-600">آليات التدريب، الدعم المؤسسي، وحماية المشروع.</p>
          </div>
        </div>
      </div>
    </div>
    <Levels />
  </>
);

const SymbolsPage: React.FC = () => (
  <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#006233] mb-4">الرموز والمرجعيات</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">"لسنا خالدين.. سيأتي بعدنا جيل يحمل مشعل الثورة." نستلهم من رموزنا التاريخية والقدوات الحية.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SYMBOLS_DATA.map((symbol, idx) => (
          <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-lg border-t-4 border-[#D21034]">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="text-[#006233]" />
                <span className="text-sm font-bold bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                  {symbol.category === 'historical' ? 'رمز تاريخي' : 'قدوة معاصرة'}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{symbol.name}</h3>
              <h4 className="text-lg text-[#D21034] font-medium mb-4">{symbol.title}</h4>
              <p className="text-gray-600 leading-relaxed">{symbol.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AgeGroupsPage: React.FC = () => (
  <div className="pt-24 pb-16 bg-white min-h-screen">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#006233] mb-4">الفئات العمرية المستهدفة</h1>
        <p className="text-xl text-gray-600">برامج مخصصة لكل مرحلة عمرية لضمان استمرار روح المشاعل في كل جيل.</p>
      </div>

      <div className="space-y-8">
        {AGE_GROUPS.map((group, idx) => (
          <div key={idx} className={`rounded-2xl p-8 border ${group.color} bg-opacity-20`}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <span className="inline-block px-4 py-1 bg-white rounded-full shadow-sm text-sm font-bold mb-2 border">
                  {group.range}
                </span>
                <h3 className="text-2xl font-bold">{group.title}</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> الرؤية:</h4>
                <p className="text-gray-700 leading-relaxed">{group.vision}</p>
              </div>
              <div>
                <h4 className="font-bold mb-2 flex items-center gap-2"><Award size={18} /> الأهداف:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {group.goals.map((goal, gIdx) => (
                    <li key={gIdx} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-2 h-2 bg-current rounded-full opacity-50"></span>
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ProgramPage: React.FC = () => (
  <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#006233] mb-4">البرنامج الوطني للمشروع</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          آليات تنفيذية شاملة لدعم المؤسسات، التدريب، الحماية القانونية، والاستدامة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {PROGRAM_PILLARS.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-r-4 border-[#D21034] flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-[#D21034]">
                  <Icon size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{pillar.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{pillar.content}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-[#006233] text-white rounded-3xl p-8 md:p-12 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">أدوات وآليات التدريب</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                <Shield className="text-yellow-400" />
                <span>المنصة الإلكترونية التعليمية (فيديوهات ومقالات)</span>
              </li>
              <li className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                <Shield className="text-yellow-400" />
                <span>اختبارات إلكترونية وتقييم ذاتي</span>
              </li>
              <li className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                <Shield className="text-yellow-400" />
                <span>ورشات عمل عملية للمشاعل</span>
              </li>
              <li className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                <Shield className="text-yellow-400" />
                <span>برامج تدريبية للقادة والمدرسين</span>
              </li>
            </ul>
          </div>
          <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
            <h3 className="text-xl font-bold mb-4 text-yellow-300">الحماية القانونية والدستورية</h3>
            <p className="text-white/90 leading-relaxed mb-4">
              يضمن المشروع آليات قانونية لضمان ممارسة المشاعل لمهامهم السامية، وحماية المشروع من أي تدخل سياسي أو تجاري، مع تأكيد استقلالية المشروع عن خصوصيات المؤسسات المشاركة.
            </p>
            <button className="bg-white text-[#006233] px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors">
              تحميل الوثيقة القانونية
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage setPage={setCurrentPage} />;
      case 'vision': return <VisionSection />;
      case 'symbols': return <SymbolsPage />;
      case 'levels': return <Levels />;
      case 'age-groups': return <AgeGroupsPage />; // Kept for general info
      case 'program': return <ProgramPage />;
      case 'dashboard': return <Dashboard />;
      case 'consultant': return <GeminiChat />;
      case 'student-consultant': return <StudentGeminiChat />;
      case 'youth-consultant': return <YouthGeminiChat />;
      case 'parents-consultant': return <ParentsGeminiChat />;
      case 'seniors-consultant': return <SeniorsGeminiChat />;
      default: return <HomePage setPage={setCurrentPage} />;
    }
  };

  // Scroll to top when page changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen flex flex-col" dir="rtl">
      <Header currentPage={currentPage} setPage={setCurrentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer setPage={setCurrentPage} />
    </div>
  );
};

export default App;