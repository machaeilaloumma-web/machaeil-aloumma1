import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, Bot, User, Loader2, Sparkles, HelpCircle, ChevronLeft, MessageSquare } from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  "ما هو الهدف الرئيسي لمشروع مشاعل الأمة؟",
  "ما علاقة الشهيد ديدوش مراد بهذا المشروع؟",
  "شرح مستويات المشاعل الخمسة وكيفية الترقي",
  "ما هي الركائز الخمس (القيم) للمشروع؟",
  "من هم الرموز التاريخية والمرجعيات للمشروع؟",
  "كيف يساهم المشروع في تعزيز الوحدة الوطنية؟",
  "ما هو دور 'مشعل القدوة' في المجتمع؟",
  "كيف يحمي المشروع الشباب من الانحرافات؟",
  "كيف يمكنني الانضمام للمشروع؟",
  "ما هي الفئات العمرية المستهدفة؟",
  "كيف يتم تكريم المشاعل المتميزين؟",
  "ما هو دور المؤسسات التربوية في المشروع؟"
];

const GeminiChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'مرحباً بك في مشروع مشاعل الأمة. أنا مساعدك الذكي، كيف يمكنني مساعدتك في فهم القيم، أو اقتراح مبادرات وطنية؟ اختر سؤالاً من القائمة أو اكتب سؤالك.' }
  ]);
  const [loading, setLoading] = useState(false);
  
  // Ref for the scrollable container
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || loading) return;

    if (!textOverride) setInput('');
    
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setLoading(true);

    try {
      const apiKey = process.env.API_KEY; 
      
      if (!apiKey) {
        throw new Error("API Key not found. Please configure process.env.API_KEY");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const systemInstruction = `
        أنت مستشار ذكي ومسؤول لمشروع وطني جزائري يسمى "مشاعل الأمة – سفراء القيم".
        
        **هوية المشروع:**
        - الشعار: «بالقيم نرتقي… وبالقدوات نبني الوطن».
        - النداء الوطني: «الجزائر مسؤوليتنا… يقظتنا سلاحنا، ووحدتنا درعنا».
        - الإلهام: مقولة الشهيد ديدوش مراد "لسنا خالدين.. سيأتي بعدنا جيل يحمل مشعل الثورة".
        
        **الأهداف:**
        1. تعزيز الوعي الوطني والقيمي (تحرير العقول).
        2. التربية والإعداد للنهضة (حماية الشباب).
        3. الوحدة والتلاحم الاجتماعي.
        4. العمل الوطني والبناء المستدام.
        
        **المستويات:**
        1. مشعل القدوة (أساس).
        2. مشعل السفير.
        3. مشعل القائد.
        4. مشعل الرائد.
        5. مشعل الحكيم.

        **الأسلوب:**
        - تحدث باللغة العربية الفصحى الراقية والميسرة.
        - كن وطنياً، إيجابياً، ومحفزاً.
        - استخدم تنسيق Markdown (نقط، عريض) لتنظيم الإجابة.
        - ركز على القيم: الأخلاقية، الوطنية، الإنسانية، الاجتماعية، والقيادية.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: textToSend,
        config: {
          systemInstruction: systemInstruction,
        }
      });

      const text = response.text;
      if (text) {
        setMessages(prev => [...prev, { role: 'model', text: text }]);
      }
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'عذراً، حدث خطأ في الاتصال بالمستشار الذكي. يرجى المحاولة لاحقاً.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="consultant" className="py-12 bg-slate-100 min-h-screen flex flex-col">
      <div className="container mx-auto px-4 flex-grow flex flex-col">
        <div className="text-center mb-6 flex-shrink-0">
          <h2 className="text-3xl font-bold text-[#006233] mb-2 flex items-center justify-center gap-2">
            <MessageSquare className="text-[#D21034]" />
            المستشار الذكي للمشروع
          </h2>
          <p className="text-gray-600 text-lg">اسأل عن تاريخ المشروع، أهدافه، وكيفية المساهمة في بناء الوطن.</p>
        </div>

        {/* Main Container - Fixed Height on Desktop to prevent page scroll issues */}
        <div className="flex-grow bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col lg:flex-row h-[80vh] max-h-[800px] min-h-[600px]">
          
          {/* Questions Sidebar - Scrollable */}
          <div className="w-full lg:w-1/3 bg-gray-50 border-b lg:border-b-0 lg:border-l border-gray-200 flex flex-col h-1/3 lg:h-full">
            <div className="p-4 bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
              <div className="flex items-center gap-2 text-[#D21034] font-bold text-lg">
                <HelpCircle size={20} />
                <h3>أسئلة مقترحة</h3>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              <div className="bg-[#006233] text-white rounded-xl p-4 mb-4 shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={18} className="text-yellow-300" />
                  <h3 className="font-bold text-base">نصيحة اليوم</h3>
                </div>
                <p className="text-sm opacity-95 leading-relaxed font-medium">
                  "القدوة ليست منصباً، بل هي مسؤولية يومية. ابدأ بنفسك تكن مشعلاً."
                </p>
              </div>

              {SUGGESTED_QUESTIONS.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(question)}
                  disabled={loading}
                  className="w-full text-right p-3 rounded-lg bg-white hover:bg-red-50 text-gray-700 hover:text-[#D21034] transition-all text-base font-medium border border-gray-200 hover:border-red-200 flex justify-between items-center group shadow-sm"
                >
                  <span>{question}</span>
                  <ChevronLeft size={18} className="text-gray-300 group-hover:text-[#D21034] transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Chat Interface - Fixed Area */}
          <div className="w-full lg:w-2/3 flex flex-col h-2/3 lg:h-full relative bg-slate-50/50">
            
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-[#1f2937] to-[#111827] p-4 flex items-center gap-4 flex-shrink-0 shadow-md z-10">
              <div className="relative">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">
                  <Bot size={24} />
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">مشاعل AI</h3>
                <p className="text-gray-400 text-xs">مستشار القيم الوطنية</p>
              </div>
            </div>

            {/* Messages Area - Scrollable with ref */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar scroll-smooth"
            >
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${msg.role === 'user' ? 'bg-[#006233] text-white' : 'bg-[#D21034] text-white'}`}>
                    {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                  </div>
                  <div className={`max-w-[85%] p-5 rounded-2xl shadow-sm text-base md:text-lg leading-relaxed font-medium ${
                    msg.role === 'user' 
                      ? 'bg-[#006233] text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none shadow-sm'
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-gray-500 text-base pr-14 animate-pulse">
                  <Loader2 size={20} className="animate-spin" />
                  جاري صياغة الإجابة...
                </div>
              )}
            </div>

            {/* Input Area - Fixed at bottom */}
            <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
              <div className="flex items-center gap-3 bg-gray-50 rounded-full px-4 py-3 border border-gray-300 focus-within:border-[#006233] focus-within:ring-2 focus-within:ring-green-100 transition-all shadow-inner">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="اكتب سؤالك هنا..."
                  className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 text-right text-lg font-medium"
                  disabled={loading}
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={loading || !input.trim()}
                  className={`p-2 rounded-full transition-all ${input.trim() ? 'bg-[#006233] text-white hover:bg-[#004d28] shadow-md' : 'bg-gray-200 text-gray-400'}`}
                >
                  <Send size={20} className={loading ? 'opacity-0' : ''} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeminiChat;