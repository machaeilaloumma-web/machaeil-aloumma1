import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, Bot, User, Loader2, Sparkles, HelpCircle, ChevronLeft, Heart, Users, BookOpen, Home } from 'lucide-react';

const PARENTS_SUGGESTED_QUESTIONS = [
  "كيف أغرس قيم 'مشعل القدوة' في ابني الصغير؟",
  "ابني المراهق يرفض النصيحة، كيف أتعامل معه وفق قيم المشروع؟",
  "أنا معلم، كيف أطبق مستوى 'مشعل السفير' داخل القسم؟",
  "كيف نحمي أبناءنا من مخاطر الإنترنت والشخصيات السامة؟",
  "كيف نجعل البيت بيئة حاضنة للقيم الوطنية؟",
  "ما هي طرق تعزيز 'القيادة' لدى الطفل الخجول؟",
  "كيف أتعامل مع ابني إذا لاحظت عليه تأثراً بأفكار هدامة؟",
  "كيف نربي الأبناء على احترام رموز الدولة وتاريخها؟"
];

const ParentsGeminiChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'أهلاً بكم في فضاء الأولياء والبالغين (40-59 سنة). 👨‍👩‍👧‍👦🇩🇿\nأنا مستشاركم التربوي والأسري لمشروع "مشاعل الأمة".\n\nمهمتي هي مرافقتكم في بناء جيل واعد، والإجابة عن تساؤلاتكم حول كيفية تنشئة أبنائكم ليكونوا مشاعل تنير الوطن.\n\nكيف يمكنني مساعدتكم اليوم؟' }
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
        أنت "المستشار التربوي والأسري" لمشروع "مشاعل الأمة – سفراء القيم" في الجزائر.
        
        **الجمهور المستهدف:** البالغون (40-59 سنة) ويشمل الأولياء (الآباء والأمهات) والمربون (المعلمون والأساتذة).

        **مهمتك:**
        تقديم استشارات تربوية وأسرية تساعد على تطبيق أهداف المشروع في البيت والمدرسة، وبناء بيئة تنشئة سليمة.

        **المرتكزات:**
        1. **الأسرة هي الحصن الأول:** التأكيد على التماسك الأسري، الحوار، والقدوة الوالدية.
        2. **المدرسة شريكة:** تعزيز العلاقة بين الولي والمربي.
        3. **القيم الخمس:** (الأخلاقية، الوطنية، الإنسانية، الاجتماعية، القيادية) وكيفية غرسها في كل مرحلة عمرية.
        4. **المستويات:** شرح كيف يمكن للولي مساعدة ابنه ليرتقي من "مشعل قدوة" إلى "سفير" ثم "قائد".

        **أسلوب الإجابة:**
        - لغة عربية راقية، رصينة، ومطمئنة (أسلوب الخبير التربوي الحكيم).
        - تقديم نصائح عملية قابلة للتطبيق (خطوات، أساليب حوار).
        - التركيز على حماية الأبناء من الانحرافات الفكرية والسلوكية (المخدرات، العنف، الأفكار الدخيلة).
        - ربط التربية الحديثة بالأصالة الجزائرية وقيم الإسلام والوطنية.

        **مثال:** إذا سأل عن عناد المراهق، وجهه لاحتوائه وتكليفه بمسؤوليات (مشعل القائد) بدلاً من الصدام، مع ربط ذلك بقيم الاحترام والمسؤولية.
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
      setMessages(prev => [...prev, { role: 'model', text: 'نعتذر، حدث خلل تقني بسيط. يرجى إعادة المحاولة لاحقاً. نحن هنا لدعمكم دائماً.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="parents-consultant" className="py-12 bg-teal-50 min-h-screen flex flex-col">
      <div className="container mx-auto px-4 flex-grow flex flex-col">
        <div className="text-center mb-8 flex-shrink-0">
          <div className="inline-flex items-center justify-center bg-teal-700 p-3 rounded-xl shadow-lg mb-4">
             <Home size={32} className="text-white ml-2" />
             <span className="text-xl font-bold text-white">فضاء الأولياء والبالغين (40-59 سنة)</span>
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-2">
            المستشار التربوي للأسرة والمدرسة 👨‍🏫
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
            شراكة من أجل الأبناء.. كيف نبني بيئة تصنع المشاعل وتحمي القيم؟
          </p>
        </div>

        {/* Main Container - Fixed Height */}
        <div className="flex-grow bg-white rounded-2xl shadow-2xl overflow-hidden border border-teal-100 flex flex-col lg:flex-row h-[80vh] max-h-[800px] min-h-[600px]">
          
          {/* Sidebar - Topics & Questions */}
          <div className="w-full lg:w-1/3 bg-slate-50 border-b lg:border-b-0 lg:border-l border-teal-100 flex flex-col h-1/3 lg:h-full">
            <div className="p-5 bg-white border-b border-teal-100 sticky top-0 z-10">
              <h3 className="font-bold text-lg text-teal-800 flex items-center gap-2">
                <Heart className="text-teal-600" /> الأسرة والمدرسة: حصن القيم
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {/* Topics Visualization */}
              <div className="space-y-3 mb-6">
                <div className="bg-white p-3 rounded-lg border-l-4 border-teal-500 shadow-sm flex items-center gap-3 hover:bg-teal-50 transition-colors">
                  <Home size={20} className="text-teal-600" />
                  <div>
                    <div className="font-bold text-sm text-gray-800">التربية الأسرية</div>
                    <div className="text-xs text-gray-500">قدوة، حوار، احتواء</div>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border-l-4 border-cyan-500 shadow-sm flex items-center gap-3 hover:bg-cyan-50 transition-colors">
                  <BookOpen size={20} className="text-cyan-600" />
                  <div>
                    <div className="font-bold text-sm text-gray-800">الدور التربوي</div>
                    <div className="text-xs text-gray-500">غرس القيم في المدرسة</div>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border-l-4 border-rose-500 shadow-sm flex items-center gap-3 hover:bg-rose-50 transition-colors">
                  <Users size={20} className="text-rose-600" />
                  <div>
                    <div className="font-bold text-sm text-gray-800">حماية الأبناء</div>
                    <div className="text-xs text-gray-500">وقاية من الانحرافات</div>
                  </div>
                </div>
              </div>

              <h4 className="font-bold text-sm text-gray-500 mb-2 px-1">تساؤلات تربوية شائعة:</h4>
              {PARENTS_SUGGESTED_QUESTIONS.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(question)}
                  disabled={loading}
                  className="w-full text-right p-3 rounded-lg bg-white hover:bg-teal-50 text-gray-700 hover:text-teal-700 transition-all text-sm font-medium border border-gray-200 hover:border-teal-200 flex justify-between items-center group shadow-sm"
                >
                  <span>{question}</span>
                  <ChevronLeft size={16} className="text-gray-300 group-hover:text-teal-600 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Chat Interface */}
          <div className="w-full lg:w-2/3 flex flex-col h-2/3 lg:h-full relative bg-slate-100">
            
            {/* Chat Header */}
            <div className="bg-white p-4 flex items-center gap-4 flex-shrink-0 shadow-sm border-b border-gray-200 z-10">
              <div className="relative">
                <div className="w-12 h-12 bg-teal-700 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <Bot size={28} />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-teal-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="text-gray-900 font-bold text-lg">الخبير التربوي</h3>
                <p className="text-teal-700 text-xs font-medium">مرافقة للآباء والمعلمين</p>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar scroll-smooth"
            >
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-gray-800 text-white' : 'bg-teal-700 text-white'}`}>
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
                <div className="flex items-center gap-2 text-teal-700 text-sm pr-14 font-semibold">
                  <Loader2 size={20} className="animate-spin" />
                  جاري صياغة الاستشارة التربوية...
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-5 bg-white border-t border-gray-200 flex-shrink-0">
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-300 focus-within:border-teal-600 focus-within:ring-2 focus-within:ring-teal-100 transition-all shadow-inner">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="اكتب تساؤلك التربوي أو الأسري هنا..."
                  className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 text-right text-lg"
                  disabled={loading}
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={loading || !input.trim()}
                  className={`p-3 rounded-lg transition-all transform hover:scale-105 active:scale-95 ${input.trim() ? 'bg-teal-700 text-white hover:bg-teal-800 shadow-md' : 'bg-gray-200 text-gray-400'}`}
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

export default ParentsGeminiChat;