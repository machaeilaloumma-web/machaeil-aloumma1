import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, Bot, User, Loader2, Sparkles, HelpCircle, ChevronLeft, Star, Flag, Award, GraduationCap } from 'lucide-react';

const STUDENT_SUGGESTED_QUESTIONS = [
  "كيف أكون 'مشعل قدوة' في مدرستي؟",
  "أريد أن أساعد زملائي، ماذا أفعل؟",
  "ماذا يعني أن أكون سفيراً للقيم؟",
  "كيف أحافظ على نظافة حيّي ومدينتي؟",
  "كيف أتجنب رفقاء السوء؟",
  "ما قصة الشهيد ديدوش مراد؟ أحكها لي ببساطة",
  "كيف أنظم وقتي للدراسة والتطوع؟",
  "كيف أصبح 'مشعل قائد' لفريق صفي؟"
];

const StudentGeminiChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'أهلاً بك يا بطل المستقبل! 🇩🇿\nأنا مدربك الذكي في مشروع "مشاعل الأمة". هذا الفضاء مخصص للأطفال والمراهقين (6-17 سنة).\n\nأنا هنا لأساعدك لتكون قدوة رائعة، وسفيراً مميزاً، وقائداً ناجحاً في مدرستك وحيّك.' }
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
        أنت "المستشار الصغير" أو "المدرب الذكي" الخاص بالتلاميذ (الأطفال والمراهقين 6-17 سنة) في الجزائر ضمن مشروع "مشاعل الأمة".
        
        **دورك:**
        مدرب ودود، محفز، ومعلم يساعد الطلاب على فهم المشروع واجتياز المستويات الثلاثة الأولى فقط.

        **المستويات التي تدرب عليها:**
        1. **مشعل القدوة (المستوى 1):** التركيز على الصدق، الأمانة، النظافة، احترام الوالدين والمعلمين، التفوق الدراسي.
        2. **مشعل السفير (المستوى 2):** نشر الخير، مساعدة الزملاء، التحدث بلباقة، تمثيل المدرسة أو الحي بشكل جيد.
        3. **مشعل القائد (المستوى 3):** تنظيم فريق صغير، قيادة مبادرة تنظيف أو مراجعة دروس، حل المشاكل بين الزملاء.

        **أسلوبك:**
        - لغة عربية بسيطة، سهلة الفهم، ومشجعة جداً.
        - استخدم الإيموجي 🌟🇩🇿📚 بكثرة لجعل المحادثة ممتعة.
        - نادِ المستخدم بـ "يا بطل" أو "يا مشعل المستقبل".
        - اربط النصائح بحب الجزائر والشهداء (مثل ديدوش مراد) لكن بطريقة قصصية بسيطة.
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
      setMessages(prev => [...prev, { role: 'model', text: 'أوه! حدثت مشكلة صغيرة في الاتصال. حاول مرة أخرى يا بطل! 🔧' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="student-consultant" className="py-12 bg-[#f0fdf4] min-h-screen flex flex-col">
      <div className="container mx-auto px-4 flex-grow flex flex-col">
        <div className="text-center mb-8 flex-shrink-0">
          <div className="inline-flex items-center justify-center bg-white p-3 rounded-full shadow-md mb-4">
             <GraduationCap size={32} className="text-[#006233] ml-2" />
             <span className="text-xl font-bold text-gray-700">فضاء الأطفال والمراهقين (6-17 سنة)</span>
          </div>
          <h2 className="text-4xl font-black text-[#006233] mb-2 drop-shadow-sm">
            المدرب الذكي للمشاعل الصغار 🇩🇿
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
            هنا ندربك لتكون قدوة، سفيراً، وقائداً في مدرستك وحيّك.
          </p>
        </div>

        {/* Main Container - Fixed Height */}
        <div className="flex-grow bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-[#86efac] flex flex-col lg:flex-row h-[80vh] max-h-[800px] min-h-[600px]">
          
          {/* Sidebar - Levels & Questions */}
          <div className="w-full lg:w-1/3 bg-gradient-to-b from-green-50 to-white border-b lg:border-b-0 lg:border-l border-green-100 flex flex-col h-1/3 lg:h-full">
            <div className="p-5 bg-white border-b border-green-100 sticky top-0 z-10">
              <h3 className="font-bold text-lg text-[#006233] flex items-center gap-2">
                <Star className="fill-yellow-400 text-yellow-400" /> مستويات التدريب
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {/* Levels Progress Visualization */}
              <div className="space-y-3 mb-6">
                <div className="bg-white p-3 rounded-xl border border-green-200 shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Star size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-800">1. مشعل القدوة</div>
                    <div className="text-xs text-gray-500">كن مثالاً بأخلاقك</div>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-blue-200 shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Flag size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-800">2. مشعل السفير</div>
                    <div className="text-xs text-gray-500">انشر الخير حولك</div>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-purple-200 shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <Award size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-800">3. مشعل القائد</div>
                    <div className="text-xs text-gray-500">قُد فريقك للنجاح</div>
                  </div>
                </div>
              </div>

              <h4 className="font-bold text-sm text-gray-500 mb-2 px-1">أسئلة للبدء:</h4>
              {STUDENT_SUGGESTED_QUESTIONS.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(question)}
                  disabled={loading}
                  className="w-full text-right p-3 rounded-xl bg-white hover:bg-green-100 text-gray-700 hover:text-[#006233] transition-all text-sm font-bold border border-green-50 hover:border-green-200 flex justify-between items-center group shadow-sm"
                >
                  <span>{question}</span>
                  <ChevronLeft size={16} className="text-green-300 group-hover:text-[#006233] transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Chat Interface */}
          <div className="w-full lg:w-2/3 flex flex-col h-2/3 lg:h-full relative bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] bg-green-50/30">
            
            {/* Chat Header */}
            <div className="bg-white p-4 flex items-center gap-4 flex-shrink-0 shadow-sm border-b border-green-100 z-10">
              <div className="relative">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-[#006233]">
                  <Bot size={28} />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-bounce"></div>
              </div>
              <div>
                <h3 className="text-gray-800 font-bold text-lg">المدرب الذكي</h3>
                <p className="text-green-600 text-xs font-medium">متاح لمساعدتك دائماً</p>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar scroll-smooth"
            >
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md border-2 border-white ${msg.role === 'user' ? 'bg-[#D21034] text-white' : 'bg-[#006233] text-white'}`}>
                    {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                  </div>
                  <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-base md:text-lg leading-relaxed font-medium ${
                    msg.role === 'user' 
                      ? 'bg-[#D21034] text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 border border-green-100 rounded-tl-none shadow-md'
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-green-600 text-base pr-14 animate-pulse font-bold">
                  <Loader2 size={24} className="animate-spin" />
                  جاري التفكير في إجابة رائعة...
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-green-100 flex-shrink-0">
              <div className="flex items-center gap-3 bg-gray-50 rounded-full px-4 py-3 border-2 border-green-100 focus-within:border-[#006233] focus-within:ring-4 focus-within:ring-green-50 transition-all shadow-inner">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="اكتب سؤالك هنا يا بطل..."
                  className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 text-right text-lg font-medium"
                  disabled={loading}
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={loading || !input.trim()}
                  className={`p-3 rounded-full transition-all transform hover:scale-105 active:scale-95 ${input.trim() ? 'bg-[#006233] text-white hover:bg-[#004d28] shadow-lg' : 'bg-gray-200 text-gray-400'}`}
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

export default StudentGeminiChat;