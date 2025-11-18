import React from 'react';
import { Flame, Facebook, Twitter, Youtube, Mail } from 'lucide-react';

interface FooterProps {
  setPage: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setPage }) => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t-4 border-[#D21034] mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <Flame className="text-white w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">مشاعل الأمة</h2>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              الجزائر مسؤوليتنا… يقظتنا سلاحنا، ووحدتنا درعنا… معًا نحمي الوطن، نبني المستقبل، ونتصدّى لكل مؤامرة. مشروع وطني لغرس القيم وبناء القدوات.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1877F2] transition-colors"><Facebook size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1DA1F2] transition-colors"><Twitter size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF0000] transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#006233]">خريطة الموقع</h3>
            <ul className="space-y-3 text-gray-400">
              <li><button onClick={() => setPage('home')} className="hover:text-white transition-colors">الرئيسية</button></li>
              <li><button onClick={() => setPage('vision')} className="hover:text-white transition-colors">الرؤية والرسالة</button></li>
              <li><button onClick={() => setPage('levels')} className="hover:text-white transition-colors">مستويات المشاعل</button></li>
              <li><button onClick={() => setPage('program')} className="hover:text-white transition-colors">البرنامج الوطني</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#006233]">تواصل معنا</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-3">
                <Mail size={18} />
                <span>contact@mashaal-dz.org</span>
              </li>
              <li>
                <p>الجزائر العاصمة، الجزائر</p>
              </li>
            </ul>
            <button className="mt-6 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-2 rounded-lg text-sm transition-all w-full">
              الإبلاغ عن مخالفة قيمية
            </button>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} مشروع مشاعل الأمة – سفراء القيم. جميع الحقوق محفوظة.</p>
          <p className="mt-2 text-xs">تصميم وطني يحمل الألوان الجزائرية 🇩🇿</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
