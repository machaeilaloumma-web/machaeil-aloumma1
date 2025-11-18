import React, { useState, useEffect } from 'react';
import { Menu, X, Flame } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

interface HeaderProps {
  currentPage: string;
  setPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setPage(id);
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || currentPage !== 'home' ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo Area */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('home')}>
          <div className="relative w-10 h-10 flex items-center justify-center bg-red-600 rounded-full shadow-lg">
             <Flame className="text-white w-6 h-6" />
          </div>
          <div className={`flex flex-col ${(scrolled || currentPage !== 'home') ? 'text-gray-800' : 'text-white'}`}>
            <span className="font-bold text-lg leading-tight">مشاعل الأمة</span>
            <span className="text-xs opacity-90">سفراء القيم</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-reverse space-x-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm font-medium transition-colors hover:text-red-500 px-2 py-1 rounded-md ${
                currentPage === item.id 
                  ? 'text-[#D21034] font-bold bg-red-50' 
                  : (scrolled || currentPage !== 'home') ? 'text-gray-700' : 'text-white/90 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
             onClick={() => handleNavClick('dashboard')}
             className="bg-[#006233] hover:bg-[#004d28] text-white px-4 py-2 rounded-full text-sm font-bold transition-all shadow-lg border-2 border-white/20"
          >
            انضم للمشروع
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className={`${(scrolled || currentPage !== 'home') ? 'text-gray-800' : 'text-white'}`}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 h-screen overflow-y-auto pb-20">
          <div className="flex flex-col p-4 space-y-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-right font-medium py-3 px-4 rounded-lg border-b border-gray-50 ${
                  currentPage === item.id ? 'bg-red-50 text-[#D21034]' : 'text-gray-700 hover:text-red-600'
                }`}
              >
                {item.label}
              </button>
            ))}
             <button className="bg-[#006233] text-white px-4 py-3 rounded-lg text-sm font-bold w-full mt-2 shadow-lg">
               تسجيل الدخول
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
