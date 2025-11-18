import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, Bot, User, Loader2, Sparkles, HelpCircle, ChevronLeft, Star, Flag, Award, Medal, BookOpen, Lightbulb } from 'lucide-react';

const YOUTH_SUGGESTED_QUESTIONS = [
  "كيف أجسد 'الأمانة العلمية' في دراستي كواجب وطني وأخلاقي؟", // قيمة أخلاقية + وطنية (مستوى القدوة)
  "كيف أحافظ على الهوية الجزائرية ومبادئ الثورة في عصر العولمة؟", // قيمة وطنية (مستوى القدوة/السفير)
  "أريد إطلاق مبادرة 'جامعة خالية من الآفات'، ما هي خطوات مشعل القائد؟", // قيمة اجتماعية + قيادية (مستوى القائد)
  "كيف أكون سفيراً رقمياً للدفاع عن صورة الجزائر ومواجهة التضليل؟", // قيمة وطنية + قيادية (مستوى السفير)
  "كيف نفعّل التضامن الطلابي مع الفئات الهشة تعزيزاً للقيمة الإنسانية؟", // قيمة إنسانية (مستوى السفير)
  "كيف أحول أفكاري الشبابية إلى مشاريع اقتصادية تخدم الوطن؟", // قيمة قيادية + وطنية (مستوى الرائد)
  "ما هي صفات 'الطالب القدوة' الذي يحمل رسالة الشهداء اليوم؟", // شامل القيم (مستوى القدوة)
  "كيف نعزز اللحمة الوطنية وننبذ الجهوية داخل الحرم الجامعي؟" // قيمة وطنية + اجتماعية (مستوى القائد)
];

const YouthGeminiChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'مرحباً بك في فضاء الشباب والنخبة (18-39 سنة). 🎓🇩🇿\nأنا مدربك الاستراتيجي للقيم الوطنية. هنا نتدرب على تحويل القيم الخمس (الأخلاقية، الوطنية، الإنسانية، الاجتماعية، والقيادية) إلى ممارسة عملية للارتقاء من القدوة إلى الريادة.\n\nاختر سؤالاً للبدء في التدريب.' }
  ]);
  const [loading, setLoading] = useState(false);
  
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
        throw new Error("API Key not found");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const systemInstruction = `
        أنت "الموجه الاستراتيجي والوطني" الخاص بالشباب (18-24 سنة) والبالغين الشباب (25-39 سنة) في الجزائر ضمن مشروع "مشاعل الأمة".

        **المبادئ الصارمة (خطوط حمراء):**
        1. **السيادة الوطنية:** تعزيز حب الجزائر، الوحدة الوطنية، واحترام رموز الدولة ومؤسساتها (الجيش، العلم، النشيد).
        2. **المرجعية النوفمبرية:** الاستلهام الدائم من قيم ثورة 1 نوفمبر والشهداء (مثل ديدوش مراد، بن مهيدي) كمرجعية عليا.
        3. **الهوية:** الحفاظ على الهوية الوطنية الجزائرية (الإسلام، العروبة، الأمازيغية) كنسيج موحد.
        4. **نبذ التفرقة:** محاربة الجهوية، خطاب الكراهية، والأفكار الهدامة التي تهدد استقرار المجتمع.

        **مهمتك التدريبية (القيم الخمس):**
        عليك تدريب الشاب على تطبيق القيم الخمسة التالية للانتقال بين المستويات:
        1. **القيم الأخلاقية:** (الصدق، الأمانة العلمية، احترام الأساتذة).
        2. **القيم الوطنية:** (الولاء للوطن، حماية الذاكرة، الدفاع عن صورة الجزائر).
        3. **القيم الإنسانية:** (التطوع، التضامن، مساعدة المحتاجين).
        4. **القيم الاجتماعية:** (التماسك الأسري، حسن الجوار، محاربة الآفات).
        5. **القيم القيادية:** (المبادرة، التخطيط، المسؤولية).

        **مستويات التدريب:**
        - **مشعل القدوة:** دربهم على إصلاح النفس، التفوق الدراسي، والالتزام بالقوانين.
        - **مشعل السفير:** دربهم على نشر الوعي، التأثير الإيجابي في الزملاء، والتمثيل المشرف.
        - **مشعل القائد:** دربهم على إدارة الفرق التطوعية، وقيادة المبادرات المحلية.
        - **مشعل الرائد:** دربهم على المشاريع الوطنية، الابتكار، والرؤية الاستراتيجية.

        **أسلوب الإجابة:**
        - كن حازماً ومحفزاً في آن واحد (أسلوب "الأخ الأكبر" أو "القائد الميداني").
        - قدم خطوات عملية (1، 2، 3) للإجابة على الأسئلة.
        - اربط كل إجابة بضرورة خدمة الجزائر وحمايتها.
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
      setMessages(prev => [...prev, { role: 'model', text: 'عذراً، واجهنا انقطاعاً بسيطاً في الاتصال. لنعد المحاولة، فالقادة لا يستسلمون. 🔄' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="youth-consultant" className="py-12 bg-[#f8fafc] min-h-screen flex flex-col">
      <div className="container mx-auto px-4 flex-grow flex flex-col">
        <div className="text-center mb-8 flex-shrink-0">
          <div className="inline-flex items-center justify-center bg-indigo-600 p-3 rounded-xl shadow-lg mb-4">
             <BookOpen size={32} className="text-white ml-2" />
             <span className="text-xl font-bold text-white">فضاء الشباب (18-39 سنة)</span>
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-2">
            الموجه الاستراتيجي للقادة والرواد 🎓
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
            تدريب ميداني على القيم الخمس.. لنتدرج من القدوة الذاتية إلى الريادة الوطنية.
          </p>
        </div>

        {/* Main Container - Fixed Height */}
        <div className="flex-grow bg-white rounded-2xl shadow-2xl overflow-hidden border border-indigo-100 flex flex-col lg:flex-row h-[80vh] max-h-[800px] min-h-[600px]">
          
          {/* Sidebar - Levels & Questions */}
          <div className="w-full lg:w-1/3 bg-slate-50 border-b lg:border-b-0 lg:border-l border-indigo-100 flex flex-col h-1/3 lg:h-full">
            <div className="p-5 bg-white border-b border-indigo-100 sticky top-0 z-10">
              <h3 className="font-bold text-lg text-indigo-800 flex items-center gap-2">
                <Lightbulb className="text-indigo-600" /> مسار القيم والقيادة
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {/* Levels Progress Visualization */}
              <div className="space-y-3 mb-6">
                <div className="bg-white p-3 rounded-lg border-l-4 border-emerald-500 shadow-sm flex items-center gap-3 hover:bg-emerald-50 transition-colors">
                  <Star size={20} className="text-emerald-600" />
                  <div>
                    <div className="font-bold text-sm text-gray-800">1. مشعل القدوة</div>
                    <div className="text-xs text-gray-500">أخلاق، وطنية، انضباط</div>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border-l-4 border-blue-500 shadow-sm flex items-center gap-3 hover:bg-blue-50 transition-colors">
                  <Flag size={20} className="text-blue-600" />
                  <div>
                    <div className="font-bold text-sm text-gray-800">2. مشعل السفير</div>
                    <div className="text-xs text-gray-500">وعي، تأثير، تضامن</div>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border-l-4 border-indigo-500 shadow-sm flex items-center gap-3 hover:bg-indigo-50 transition-colors">
                  <Award size={20} className="text-indigo-600" />
                  <div>
                    <div className="font-bold text-sm text-gray-800">3. مشعل القائد</div>
                    <div className="text-xs text-gray-500">قيادة، مسؤولية، مبادرة</div>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border-l-4 border-purple-600 shadow-sm flex items-center gap-3 hover:bg-purple-50 transition-colors">
                  <Medal size={20} className="text-purple-600" />
                  <div>
                    <div className="font-bold text-sm text-gray-800">4. مشعل الرائد</div>
                    <div className="text-xs text-gray-500">تخطيط، اقتصاد، استدامة</div>
                  </div>
                </div>
              </div>

              <h4 className="font-bold text-sm text-gray-500 mb-2 px-1">تدريبات القيم الخمس:</h4>
              {YOUTH_SUGGESTED_QUESTIONS.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(question)}
                  disabled={loading}
                  className="w-full text-right p-3 rounded-lg bg-white hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 transition-all text-sm font-medium border border-gray-200 hover:border-indigo-200 flex justify-between items-center group shadow-sm"
                >
                  <span>{question}</span>
                  <ChevronLeft size={16} className="text-gray-300 group-hover:text-indigo-600 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Chat Interface */}
          <div className="w-full lg:w-2/3 flex flex-col h-2/3 lg:h-full relative bg-slate-100">
            
            {/* Chat Header */}
            <div className="bg-white p-4 flex items-center gap-4 flex-shrink-0 shadow-sm border-b border-gray-200 z-10">
              <div className="relative">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg transform rotate-3">
                  <Bot size={28} />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="text-gray-900 font-bold text-lg">المستشار الشبابي</h3>
                <p className="text-indigo-600 text-xs font-medium">تدريب قيمي ووطني</p>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar scroll-smooth"
            >
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-gray-800 text-white' : 'bg-indigo-600 text-white'}`}>
                    {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                  </div>
                  <div className={`max-w-[85%] p-5 rounded-2xl shadow-sm text-base leading-relaxed font-medium ${
                    msg.role === 'user' 
                      ? 'bg-gray-800 text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-indigo-600 text-sm pr-14 font-semibold">
                  <Loader2 size={20} className="animate-spin" />
                  جاري تحليل القيم وصياغة التوجيه...
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-5 bg-white border-t border-gray-200 flex-shrink-0">
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-300 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100 transition-all shadow-inner">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="اطرح تساؤلك حول القيادة والقيم الوطنية..."
                  className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 text-right text-lg"
                  disabled={loading}
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={loading || !input.trim()}
                  className={`p-3 rounded-lg transition-all transform hover:scale-105 active:scale-95 ${input.trim() ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md' : 'bg-gray-200 text-gray-400'}`}
                >
                  <Send size={22} className={loading ? 'opacity-0' : ''} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouthGeminiChat;