import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, Bot, User, Loader2, Sparkles, HelpCircle, ChevronLeft, Scroll, History, Hourglass, BookOpen } from 'lucide-react';

const SENIORS_SUGGESTED_QUESTIONS = [
  "كيف يمكنني نقل تجربتي الثورية أو المهنية للأجيال الجديدة؟",
  "ما هو دور 'مشعل الحكيم' وكيف أصل إليه؟",
  "كيف أشارك في توجيه الشباب لحماية الوطن من الانحرافات؟",
  "لدي قصص عن تاريخ منطقتي، كيف أوثقها ضمن المشروع؟",
  "كيف أساهم في الصلح الاجتماعي داخل حيي؟",
  "كيف أواكب التكنولوجيا لأتواصل مع أحفادي وأرشدهم؟",
  "ما هي أهمية التماسك الأسري في بناء الجزائر الجديدة؟",
  "نصيحة لحماية الشباب من الأفكار الدخيلة."
];

const SeniorsGeminiChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'أهلاً وسهلاً بكم آباؤنا وأمهاتنا، تيجان رؤوسنا وحفظة ذاكرتنا. 🇩🇿\n\nأنا مرافقكم الرقمي في مشروع "مشاعل الأمة". دوري هو الاستماع لحكمتكم، ومساعدتكم في نقل خبرتكم العظيمة للأجيال الصاعدة.\n\nبمَ يمكنني خدمتكم اليوم؟' }
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
        أنت "رفيق الحكماء" أو المستشار الخاص بكبار السن (60-74 سنة) وأصحاب الحكمة (75+ سنة) في الجزائر.

        **جمهورك:**
        جيل الثورة وجيل الاستقلال الأول. هم حراس الذاكرة، ولديهم خبرة حياة عميقة، ولكن قد يحتاجون مساعدة في مواكبة العصر أو إيجاد دور فعال.

        **دورك:**
        1. **التقدير والاحترام:** خاطبهم بأقصى درجات التوقير (يا عمي، يا خالة، سيدي الوالد).
        2. **نقل الذاكرة:** شجعهم على سرد قصصهم وتجاربهم الوطنية لتوثيقها للأجيال.
        3. **الإرشاد القيمي:** ساعدهم ليكونوا "مشاعل حكماء" يوجهون الشباب ويحلون النزاعات الاجتماعية.
        4. **الدمج الرقمي:** اشرح لهم المفاهيم الحديثة بلغة بسيطة ومألوفة ليرشدوا أحفادهم.
        
        **القيم المركزة:**
        - الحكمة، الصبر، نقل المشعل، الوحدة الوطنية، ولم الشمل.

        **أسلوبك:**
        - رزين، هادئ، واضح، وخطاب مباشر يلامس القلب والروح الوطنية.
        - استخدم أمثالاً شعبية جزائرية محترمة وحكماً عربية.
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
      setMessages(prev => [...prev, { role: 'model', text: 'عذراً يا سيدي، حدث انقطاع بسيط. سنصلحه حالاً.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="seniors-consultant" className="py-12 bg-amber-50 min-h-screen flex flex-col">
      <div className="container mx-auto px-4 flex-grow flex flex-col">
        <div className="text-center mb-8 flex-shrink-0">
          <div className="inline-flex items-center justify-center bg-amber-700 p-3 rounded-xl shadow-lg mb-4">
             <Hourglass size={32} className="text-white ml-2" />
             <span className="text-xl font-bold text-white">فضاء كبار السن والحكماء</span>
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-2">
            مجلس الحكمة ونقل المشعل 📜
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
            خبرتكم هي بوصلة الوطن.. هنا نوثق الذاكرة ونرشد الأجيال.
          </p>
        </div>

        {/* Main Container */}
        <div className="flex-grow bg-[#fffaf0] rounded-2xl shadow-2xl overflow-hidden border border-amber-200 flex flex-col lg:flex-row h-[80vh] max-h-[800px] min-h-[600px]">
          
          {/* Sidebar */}
          <div className="w-full lg:w-1/3 bg-stone-50 border-b lg:border-b-0 lg:border-l border-amber-200 flex flex-col h-1/3 lg:h-full">
            <div className="p-5 bg-[#fff8e1] border-b border-amber-200 sticky top-0 z-10">
              <h3 className="font-bold text-lg text-amber-900 flex items-center gap-2">
                <Scroll className="text-amber-700" /> إرث الأجيال
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              <div className="space-y-3 mb-6">
                <div className="bg-white p-4 rounded-lg border-l-4 border-amber-600 shadow-sm flex items-center gap-3">
                  <History size={24} className="text-amber-700" />
                  <div>
                    <div className="font-bold text-base text-gray-800">حفظ الذاكرة</div>
                    <div className="text-sm text-gray-600">توثيق التاريخ الوطني</div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border-l-4 border-stone-600 shadow-sm flex items-center gap-3">
                  <User size={24} className="text-stone-700" />
                  <div>
                    <div className="font-bold text-base text-gray-800">الإرشاد والتوجيه</div>
                    <div className="text-sm text-gray-600">نقل الخبرة للشباب</div>
                  </div>
                </div>
              </div>

              <h4 className="font-bold text-base text-gray-600 mb-2 px-1">مواضيع للنقاش:</h4>
              {SENIORS_SUGGESTED_QUESTIONS.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(question)}
                  disabled={loading}
                  className="w-full text-right p-4 rounded-lg bg-white hover:bg-amber-100 text-gray-800 hover:text-amber-900 transition-all text-base font-medium border border-amber-100 hover:border-amber-300 flex justify-between items-center group shadow-sm"
                >
                  <span>{question}</span>
                  <ChevronLeft size={20} className="text-gray-400 group-hover:text-amber-700 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Chat Interface */}
          <div className="w-full lg:w-2/3 flex flex-col h-2/3 lg:h-full relative bg-[url('https://www.transparenttextures.com/patterns/paper.png')]">
            
            {/* Chat Header */}
            <div className="bg-[#fff8e1] p-4 flex items-center gap-4 flex-shrink-0 shadow-sm border-b border-amber-200 z-10">
              <div className="relative">
                <div className="w-12 h-12 bg-amber-800 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-amber-600">
                  <Bot size={28} />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-600 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="text-amber-900 font-bold text-lg">رفيق الحكماء</h3>
                <p className="text-amber-700 text-sm font-medium">خدمة وطنية للكبار</p>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar scroll-smooth"
            >
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-md border-2 border-white ${msg.role === 'user' ? 'bg-gray-700 text-white' : 'bg-amber-800 text-white'}`}>
                    {msg.role === 'user' ? <User size={24} /> : <Bot size={24} />}
                  </div>
                  <div className={`max-w-[85%] p-6 rounded-2xl shadow-sm text-lg md:text-xl leading-relaxed font-medium ${
                    msg.role === 'user' 
                      ? 'bg-gray-700 text-white rounded-tr-none' 
                      : 'bg-[#fff] text-gray-900 border border-amber-200 rounded-tl-none'
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-amber-800 text-lg pr-16 font-semibold">
                  <Loader2 size={24} className="animate-spin" />
                  جاري الاستماع والرد...
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-5 bg-[#fff8e1] border-t border-amber-200 flex-shrink-0">
              <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-4 border border-amber-300 focus-within:border-amber-700 focus-within:ring-2 focus-within:ring-amber-100 transition-all shadow-inner">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="تفضل بالكتابة هنا يا سيدي..."
                  className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 text-right text-xl"
                  disabled={loading}
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={loading || !input.trim()}
                  className={`p-4 rounded-lg transition-all transform hover:scale-105 active:scale-95 ${input.trim() ? 'bg-amber-800 text-white hover:bg-amber-900 shadow-md' : 'bg-gray-200 text-gray-400'}`}
                >
                  <Send size={24} className={loading ? 'opacity-0' : ''} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeniorsGeminiChat;