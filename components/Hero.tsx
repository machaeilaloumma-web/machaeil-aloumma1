import React from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  setPage: (page: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setPage }) => {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/1080?grayscale&blur=2" 
          alt="Algeria Landscapes" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#006233]/90 via-[#006233]/70 to-[#D21034]/60 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white space-y-8">
        <div className="inline-block border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium mb-4 animate-fade-in-up">
          مشروع وطني شامل
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black leading-tight drop-shadow-lg">
          مشاعل الأمة <br/>
          <span className="text-red-100 text-4xl md:text-6xl mt-2 block">سفراء القيم</span>
        </h1>

        <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light text-gray-100 leading-relaxed">
          «الجزائر مسؤوليتنا… يقظتنا سلاحنا، ووحدتنا درعنا»
        </p>

        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 mt-8">
          <p className="italic text-lg">
            "لسنا خالدين.. سيأتي بعدنا جيل يحمل مشعل الثورة."
            <br/>
            <span className="text-sm font-bold mt-2 block text-red-300">- الشهيد ديدوش مراد</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <button onClick={() => setPage('program')} className="bg-[#D21034] hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
            اكتشف البرنامج الوطني
          </button>
          <button onClick={() => setPage('dashboard')} className="bg-white hover:bg-gray-100 text-[#006233] px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
            سجل كمشعل
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/70">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default Hero;
