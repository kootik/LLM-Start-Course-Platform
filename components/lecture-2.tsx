import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize, MessageSquare, Layers, Volume2, Grid, CheckCircle } from 'lucide-react';
import { Button, Badge, Card } from './ui';

interface Slide {
  id: number;
  title: string;
  type: 'title' | 'content' | 'split';
  visualType: 'image' | 'video' | 'code' | 'text';
  visualSrc?: string;
  visualAlt?: string;
  content?: React.ReactNode;
  script: string;
  duration: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    title: "Архитектура LLM и параметры генерации",
    type: "title",
    visualType: "image",
    visualSrc: "video-2/Slide_01_LLM_Intro_Background.png",
    visualAlt: "Schematic brain with microchips and text streams",
    content: (
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Архитектура LLM
        </h1>
        <h2 className="text-2xl text-gray-300">и Параметры Генерации</h2>
        <div className="flex justify-center gap-4 text-gray-500 mt-4">
          <span>Лекция 2</span>
          <span>•</span>
          <span>Токены, Контекст, Температура</span>
        </div>
      </div>
    ),
    script: "Добро пожаловать на вторую лекцию. Если первая была про математику, то эта про реальные системы. Сегодня мы разберёмся: Как токены становятся словами, как настраивать параметры генерации (температуру, top-p), какие модели существуют и как выбрать правильную модель для вашей задачи.",
    duration: "2 min"
  },
  {
    id: 2,
    title: "Что такое токен?",
    type: "split",
    visualType: "video",
    visualSrc: "video-2/Slide_02_Tokenization_Animation.mp4",
    visualAlt: "Tokenization Animation",
    content: (
      <div className="space-y-6">
        <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
             <h3 className="text-xl font-mono text-green-400 mb-2">Ingenious</h3>
             <div className="flex gap-2">
                 <Badge text="In" type="tag" />
                 <Badge text="gen" type="tag" />
                 <Badge text="ious" type="tag" />
             </div>
        </div>
        <ul className="space-y-3 text-gray-300">
            <li>• <strong>Токен</strong> ≠ Слово. Это 'кусочек' смысла.</li>
            <li>• <strong>Английский:</strong> 1 слово ≈ 1.3 токена.</li>
            <li>• <strong>Русский:</strong> 1 слово ≈ 2-3 токена.</li>
        </ul>
        <div className="text-xs text-gray-500 italic">
            * Использование русского языка в API OpenAI обычно дороже.
        </div>
      </div>
    ),
    script: "Токен - это не слово! Это кусочек текста, который модель учит понимать. Почему токены, а не слова? Потому что это экономит место. Слово 'Ingenious' разбивается на три токена. Когда вы платите за ChatGPT, вы платите за количество этих кусочков.",
    duration: "4 min"
  },
  {
    id: 3,
    title: "Авторегрессия (Процесс генерации)",
    type: "content",
    visualType: "image",
    visualSrc: "all_diagrams/token_generation_process.png",
    visualAlt: "Autoregression Animation",
    content: (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <Card className="p-4 border-green-500/50 bg-green-900/10">
                <div className="text-2xl font-bold text-green-400">P(России)</div>
                <div className="text-sm">85%</div>
            </Card>
            <Card className="p-4 border-yellow-500/50 bg-yellow-900/10">
                <div className="text-2xl font-bold text-yellow-400">P(мира)</div>
                <div className="text-sm">5%</div>
            </Card>
            <Card className="p-4 border-gray-500/50 bg-gray-900/10">
                <div className="text-2xl font-bold text-gray-400">P(красоты)</div>
                <div className="text-sm">2%</div>
            </Card>
        </div>
    ),
    script: "Это ОЧЕНЬ важно понять: LLM не придумывает всё предложение заранее. Она генерирует один токен за раз! Берет контекст 'Москва - столица...', прогоняет через Трансформер и предсказывает ОДНО следующее слово (России). Затем добавляет его в контекст и повторяет процесс.",
    duration: "5 min"
  },
  {
    id: 4,
    title: "Токенайзер (Tokenizer)",
    type: "split",
    visualType: "image",
    visualSrc: "video-2/Slide_04_Tokenizer_Visual.png",
    visualAlt: "Tokenizer Visualization",
    content: (
        <div className="space-y-4">
            <p className="text-gray-300">
                Компьютер не понимает буквы. Токенайзер — это переводчик.
            </p>
            <div className="font-mono bg-black p-4 rounded-lg text-sm">
                <span className="text-blue-400">"Hello"</span>
                <span className="text-gray-500"> ➜ </span>
                <span className="text-purple-400">15496</span>
            </div>
            <div className="space-y-2">
                <h4 className="font-bold text-white text-sm uppercase mt-4">Размер словаря:</h4>
                <div className="flex justify-between text-sm border-b border-gray-700 pb-1">
                    <span>GPT-4</span>
                    <span className="font-mono text-primary">~100,000 токенов</span>
                </div>
                <div className="flex justify-between text-sm border-b border-gray-700 pb-1">
                    <span>Llama 2</span>
                    <span className="font-mono text-primary">~32,000 токенов</span>
                </div>
            </div>
        </div>
    ),
    script: "Токенайзер берет текст 'Hello' и превращает его в число 15496. Модель работает только с числами. У каждой модели свой словарь. Если слова нет в словаре, оно бьется на более мелкие части.",
    duration: "3 min"
  },
  {
    id: 5,
    title: "Контекстное окно (Context Window)",
    type: "content",
    visualType: "video",
    visualSrc: "video-2/Slide_05_Context_Window.mp4",
    visualAlt: "Context Window Animation",
    content: (
         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4">
             <div className="bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-gray-800 flex justify-between items-center">
                 <div className="text-center">
                     <div className="text-gray-400 text-xs uppercase mb-1">GPT-3.5</div>
                     <div className="text-xl font-bold text-white">16K</div>
                     <div className="text-xs text-gray-500">~12 страниц</div>
                 </div>
                 <div className="h-8 w-px bg-gray-700"></div>
                 <div className="text-center">
                     <div className="text-gray-400 text-xs uppercase mb-1">GPT-4</div>
                     <div className="text-xl font-bold text-primary">128K</div>
                     <div className="text-xs text-gray-500">~100 страниц</div>
                 </div>
                 <div className="h-8 w-px bg-gray-700"></div>
                 <div className="text-center">
                     <div className="text-gray-400 text-xs uppercase mb-1">Claude 3</div>
                     <div className="text-xl font-bold text-purple-400">200K+</div>
                     <div className="text-xs text-gray-500">Вся книга</div>
                 </div>
             </div>
         </div>
    ),
    script: "Context window - это краткосрочная память модели. Представьте стакан воды. Если вы льете новую информацию, старая выливается. GPT-3.5 помнит начало разговора, GPT-4 помнит книгу, а Claude 3 может запомнить целую библиотеку документации.",
    duration: "4 min"
  },
  {
    id: 6,
    title: "Temperature (Температура)",
    type: "split",
    visualType: "image",
    visualSrc: "all_diagrams/temperature_effect_graph.png",
    visualAlt: "Temperature Scale",
    content: (
        <div className="space-y-6">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-blue-400 font-bold">0.0 (Лёд)</span>
                    <span className="text-xs bg-blue-900/30 px-2 py-1 rounded border border-blue-800">Код, Факты</span>
                </div>
                <p className="text-sm text-gray-400">Модель всегда выбирает самый вероятный вариант. Детерминировано.</p>
            </div>
            
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-green-400 font-bold">0.7 (Комната)</span>
                    <span className="text-xs bg-green-900/30 px-2 py-1 rounded border border-green-800">Чат, Текст</span>
                </div>
                <p className="text-sm text-gray-400">Баланс между логикой и разнообразием. Стандарт.</p>
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-red-400 font-bold">1.2 (Огонь)</span>
                    <span className="text-xs bg-red-900/30 px-2 py-1 rounded border border-red-800">Брейншторм</span>
                </div>
                <p className="text-sm text-gray-400">Высокий креатив, возможны галлюцинации.</p>
            </div>
        </div>
    ),
    script: "Temperature - это параметр 'творческого безумия'. При 0.0 модель робот. При 1.0 модель поэт. Никогда не ставьте высокую температуру для задач, где важна точность фактов!",
    duration: "5 min"
  },
  {
    id: 7,
    title: "Top-P (Nucleus Sampling)",
    type: "content",
    visualType: "image",
    visualSrc: "video-2/Slide_07_TopP_Explanation.png",
    visualAlt: "Top-P Diagram",
    content: (
        <div className="mt-4 text-center max-w-xl mx-auto bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h3 className="text-lg font-bold mb-2">Альтернатива Температуре</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
                Top-P говорит модели: "Рассматривай только те слова, чья суммарная вероятность составляет P% (например, 90%)".
                Это отсекает "хвост" из редких и бредовых слов.
            </p>
            <div className="mt-4 p-2 bg-yellow-900/20 border border-yellow-700/50 rounded text-yellow-200 text-xs">
                ⚠️ Совет: Меняйте либо Temperature, либо Top-P, но не оба сразу.
            </div>
        </div>
    ),
    script: "Top-P - это более умный способ добавить разнообразия, не разрешая модели говорить полную чушь. Мы берет только 'верхушку' (Nucleus) вероятностей.",
    duration: "4 min"
  },
  {
    id: 8,
    title: "Зоопарк моделей",
    type: "split",
    visualType: "image",
    visualSrc: "all_diagrams/llm_models_comparison.png",
    visualAlt: "Model Zoo Infographic",
    content: (
        <div className="space-y-3 text-sm">
            <div className="p-3 bg-gray-800 rounded-lg flex justify-between items-center">
                <div>
                    <div className="font-bold text-white">GPT-4o</div>
                    <div className="text-xs text-gray-500">Король логики</div>
                </div>
                <div className="text-yellow-400 text-xs">⭐⭐⭐⭐⭐</div>
            </div>
            <div className="p-3 bg-gray-800 rounded-lg flex justify-between items-center">
                <div>
                    <div className="font-bold text-white">Claude 3 Opus</div>
                    <div className="text-xs text-gray-500">Король литературы</div>
                </div>
                <div className="text-yellow-400 text-xs">⭐⭐⭐⭐⭐</div>
            </div>
            <div className="p-3 bg-gray-800 rounded-lg flex justify-between items-center">
                <div>
                    <div className="font-bold text-white">GPT-3.5 / Haiku</div>
                    <div className="text-xs text-gray-500">Быстро и дешево</div>
                </div>
                <div className="text-yellow-400 text-xs">⭐⭐⭐</div>
            </div>
             <div className="p-3 bg-gray-800 rounded-lg flex justify-between items-center">
                <div>
                    <div className="font-bold text-white">Llama 3 (Open)</div>
                    <div className="text-xs text-gray-500">Приватность</div>
                </div>
                <div className="text-yellow-400 text-xs">⭐⭐⭐⭐</div>
            </div>
        </div>
    ),
    script: "Не существует одной 'лучшей' модели. GPT-4 - для сложной логики и кода. Claude 3 - пишет более человечно, отлично для текстов. Llama 3 - можно запустить локально для полной приватности данных.",
    duration: "5 min"
  },
  {
    id: 9,
    title: "Матрица выбора модели",
    type: "content",
    visualType: "image",
    visualSrc: "video-2/Slide_10_Decision_Matrix.png",
    visualAlt: "Decision Matrix Flowchart",
    content: (
         <div className="grid grid-cols-2 gap-4 mt-8">
             <Card className="p-4 border-l-4 border-l-blue-500 bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer">
                 <h4 className="font-bold text-blue-400 mb-1">Приватность?</h4>
                 <p className="text-xs text-gray-400">Банковские данные, личное</p>
                 <div className="mt-2 font-mono text-sm">➜ Llama 3 / Mistral</div>
             </Card>
             <Card className="p-4 border-l-4 border-l-purple-500 bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer">
                 <h4 className="font-bold text-purple-400">Большой контекст?</h4>
                 <p className="text-xs text-gray-400">Книги, Документация</p>
                 <div className="mt-2 font-mono text-sm">➜ Claude 3</div>
             </Card>
             <Card className="p-4 border-l-4 border-l-green-500 bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer">
                 <h4 className="font-bold text-green-400">Сложная логика?</h4>
                 <p className="text-xs text-gray-400">Код, JSON, Математика</p>
                 <div className="mt-2 font-mono text-sm">➜ GPT-4o</div>
             </Card>
             <Card className="p-4 border-l-4 border-l-yellow-500 bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer">
                 <h4 className="font-bold text-yellow-400">Дешево/Быстро?</h4>
                 <p className="text-xs text-gray-400">Чат-боты, Саммари</p>
                 <div className="mt-2 font-mono text-sm">➜ GPT-3.5 / Haiku</div>
             </Card>
         </div>
    ),
    script: "Вот простой алгоритм: Если нужна приватность - Llama локально. Если нужен огромный контекст (книга) - Claude. Если нужна сложная логика - GPT-4. Если нужно дешево и быстро - GPT-3.5.",
    duration: "4 min"
  },
  {
    id: 10,
    title: "Итоги лекции",
    type: "split",
    visualType: "image",
    visualSrc: "video-2/Slide_11_Summary_Collage.png",
    visualAlt: "Summary Collage",
    content: (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Резюме:</h3>
             <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary"></div> Токены = Атомы смысла ($$$)</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary"></div> Авторегрессия = По слову за раз</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary"></div> Температура = Контроль креативности</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary"></div> Модель = Инструмент под задачу</li>
            </ul>
            <div className="pt-6 border-t border-gray-700">
                <p className="text-gray-400 text-sm mb-2">Далее в программе:</p>
                <div className="text-lg font-bold text-primary">Практика: Обработка данных в n8n</div>
                <p className="text-xs text-gray-500 mt-1">Мы запустим n8n и применим знания на практике.</p>
            </div>
        </div>
    ),
    script: "Теперь вы понимаете теорию. Вы знаете, что платите за токены, знаете, как сделать модель креативной, и какую модель выбрать. В следующем видео мы запустим n8n и научимся обрабатывать данные перед отправкой в эти модели!",
    duration: "2 min"
  }
];

export const Lecture2Interactive: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showScript, setShowScript] = useState(true);
  const [showGrid, setShowGrid] = useState(false);

  const currentSlide = SLIDES[currentSlideIndex];
  const isFirst = currentSlideIndex === 0;
  const isLast = currentSlideIndex === SLIDES.length - 1;

  const nextSlide = () => {
    if (!isLast) setCurrentSlideIndex(prev => prev + 1);
  };

  const prevSlide = () => {
    if (!isFirst) setCurrentSlideIndex(prev => prev - 1);
  };

  const jumpToSlide = (index: number) => {
    setCurrentSlideIndex(index);
    setShowGrid(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showGrid) {
          if (e.key === 'Escape') setShowGrid(false);
          return;
      }
      if (e.key === 'ArrowRight' || e.key === 'Space') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') onClose();
      if (e.key === 'g') setShowGrid(prev => !prev);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, showGrid]);

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a] text-white flex flex-col font-sans animate-fade-in">
      <header className="h-16 border-b border-gray-800 bg-[#121212] px-6 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-4">
          <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400">
            <Layers size={20} />
          </div>
          <div>
            <h1 className="font-bold text-sm md:text-base">Lecture 2: LLM Architecture</h1>
            <div className="text-xs text-gray-500 flex items-center gap-2">
              <span>Slide {currentSlideIndex + 1} of {SLIDES.length}</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <span>{currentSlide.duration}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-gray-400 hover:text-white" onClick={() => setShowGrid(!showGrid)}>
             <Grid size={20} className={showGrid ? "text-purple-400" : ""} />
             <span className="hidden md:inline ml-2 text-xs">Overview (G)</span>
          </Button>
          <div className="h-6 w-px bg-gray-800 mx-1"></div>
          <Button variant="ghost" className="text-gray-400 hover:text-white" onClick={() => setShowScript(!showScript)}>
            <MessageSquare size={20} className={showScript ? "text-purple-400" : ""} />
            <span className="hidden md:inline ml-2 text-xs">Script</span>
          </Button>
          <div className="h-6 w-px bg-gray-800 mx-2"></div>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        <div className={`flex-1 relative flex flex-col transition-all duration-300 ${showScript ? 'w-2/3' : 'w-full'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#121212] to-[#0a0a0a] flex flex-col items-center justify-center p-8 md:p-12 overflow-y-auto custom-scrollbar">
            <div className="w-full max-w-5xl aspect-video bg-black/50 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden relative group transition-all duration-500 ease-in-out transform">
              {currentSlide.visualType === 'video' ? (
                <video 
                  key={`video-${currentSlide.id}`}
                  src={currentSlide.visualSrc} 
                  autoPlay 
                  loop 
                  muted 
                  className="w-full h-full object-cover animate-fade-in"
                  poster={`https://placehold.co/1280x720/1a1a1a/FFF?text=${encodeURIComponent(currentSlide.title)}`}
                >
                    <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-500">
                        Video Placeholder: {currentSlide.visualSrc}
                    </div>
                </video>
              ) : (
                <img 
                  key={`img-${currentSlide.id}`}
                  src={currentSlide.visualSrc} 
                  alt={currentSlide.visualAlt} 
                  className="w-full h-full object-cover animate-fade-in"
                  onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/1280x720/1a1a1a/A855F7?text=${encodeURIComponent(currentSlide.title)}`;
                  }}
                />
              )}
              
              {(currentSlide.type === 'title' || currentSlide.type === 'content') && currentSlide.content && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-8 animate-fade-in">
                   {currentSlide.content}
                </div>
              )}
            </div>

            {currentSlide.type === 'split' && (
               <div className="w-full max-w-5xl mt-8 animate-slide-up">
                   <h2 className="text-2xl font-bold mb-4 text-white">{currentSlide.title}</h2>
                   <div className="bg-[#1F2121] border border-gray-800 rounded-xl p-6 text-gray-300 leading-relaxed">
                       {currentSlide.content}
                   </div>
               </div>
            )}
          </div>
        </div>

        {showScript && (
          <div className="w-full md:w-96 border-l border-gray-800 bg-[#151515] flex flex-col shrink-0 transition-all duration-300 absolute md:static right-0 bottom-0 top-0 z-20">
             <div className="p-4 border-b border-gray-800 bg-[#1a1a1a] flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">Transcript</span>
                <Badge text={currentSlide.duration} type="tag" />
             </div>
             <div className="flex-1 p-6 overflow-y-auto leading-loose text-gray-300 font-serif text-lg">
                <p key={currentSlide.id} className="animate-fade-in">{currentSlide.script}</p>
             </div>
          </div>
        )}

        {/* Slide Overview Grid (Drawer) */}
        {showGrid && (
            <div className="absolute inset-0 z-40 bg-black/90 backdrop-blur-md p-8 overflow-y-auto animate-fade-in">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold">Slide Overview</h2>
                        <Button variant="ghost" onClick={() => setShowGrid(false)}><X/></Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {SLIDES.map((slide, idx) => (
                            <div 
                                key={slide.id} 
                                onClick={() => jumpToSlide(idx)}
                                className={`group cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${idx === currentSlideIndex ? 'border-purple-500 shadow-lg shadow-purple-500/20 scale-105' : 'border-gray-800 hover:border-gray-600'}`}
                            >
                                <div className="aspect-video bg-gray-900 relative">
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-xs p-2 text-center">
                                        {slide.title}
                                    </div>
                                    <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-0.5 rounded text-xs text-gray-400">
                                        {idx + 1}
                                    </div>
                                </div>
                                <div className="p-3 bg-[#1F2121]">
                                    <div className="text-sm font-medium truncate text-gray-300 group-hover:text-white">{slide.title}</div>
                                    <div className="text-xs text-gray-500 mt-1">{slide.duration}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
      </div>

      <footer className="h-20 border-t border-gray-800 bg-[#121212] px-6 flex items-center justify-between shrink-0 z-30">
         <div className="flex items-center gap-4 w-1/3">
             <div className="w-full max-w-xs h-1.5 bg-gray-800 rounded-full overflow-hidden">
                 <div 
                    className="h-full bg-purple-500 transition-all duration-300"
                    style={{ width: `${((currentSlideIndex + 1) / SLIDES.length) * 100}%` }}
                 ></div>
             </div>
         </div>

         <div className="flex items-center gap-6 justify-center w-1/3">
             <Button 
                variant="secondary" 
                onClick={prevSlide} 
                disabled={isFirst}
                className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
             >
                 <ChevronLeft size={24} />
             </Button>
             
             <span className="text-xl font-bold font-mono text-gray-500 w-16 text-center">
                 {currentSlideIndex + 1} <span className="text-gray-700">/</span> {SLIDES.length}
             </span>

             <Button 
                variant="primary" 
                onClick={nextSlide} 
                disabled={isLast}
                className="rounded-full w-12 h-12 p-0 flex items-center justify-center shadow-lg shadow-purple-500/20 bg-purple-600 hover:bg-purple-700"
             >
                 <ChevronRight size={24} />
             </Button>
         </div>

         <div className="w-1/3 flex justify-end">
            <Button variant="ghost" className="text-gray-400 hover:text-white gap-2" onClick={() => {
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                } else {
                    document.exitFullscreen();
                }
            }}>
                <Maximize size={18} />
                <span className="hidden sm:inline">Fullscreen</span>
            </Button>
         </div>
      </footer>
    </div>
  );
};
