
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize, MessageSquare, BookOpen, Volume2, Grid, CheckCircle } from 'lucide-react';
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
  duration: string; // Estimated reading time
}

const SLIDES: Slide[] = [
  {
    id: 1,
    title: "Математические основы машинного обучения",
    type: "title",
    visualType: "image",
    visualSrc: "video-1/Slide_01_Title_Background.png",
    visualAlt: "Abstract geometric shapes forming AI structure",
    content: (
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
          Математические Основы ML
        </h1>
        <div className="flex justify-center gap-4 text-gray-400">
          <span>Курс: LLM Start</span>
          <span>•</span>
          <span>Лекция 1</span>
        </div>
      </div>
    ),
    script: "Добрый день! Добро пожаловать на курс LLM Start. Я Алексей, и сегодня мы начнём с фундамента - математики машинного обучения. Многих студентов пугает слово 'математика', но на самом деле, если вы поймёте основные концепции, весь остальной курс будет простым. Давайте начнём с главного вопроса: что общего между всеми моделями машинного обучения, от простой регрессии до GPT-4?",
    duration: "3 min"
  },
  {
    id: 2,
    title: "Цели лекции",
    type: "split",
    visualType: "image",
    visualSrc: "video-1/Slide_02_Lecture_Goals_Roadmap.png",
    visualAlt: "Roadmap infographic",
    content: (
      <ul className="space-y-4 text-lg">
        <li className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">1</div>
          <span>Понять, как компьютер работает с числами (векторы, матрицы)</span>
        </li>
        <li className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">2</div>
          <span>Освоить линейную регрессию - самый простой алгоритм ML</span>
        </li>
        <li className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">3</div>
          <span>Познакомиться с нейронными сетями</span>
        </li>
        <li className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">4</div>
          <span>Увидеть, как Transformer работает под капотом</span>
        </li>
      </ul>
    ),
    script: "Я не буду вас пугать формулами. Вместо этого мы пойдём пошагово: Сначала поймём, как компьютер видит данные. Затем посмотрим, как простые алгоритмы работают. И наконец, разберёмся, почему нейросети так мощны.",
    duration: "2 min"
  },
  {
    id: 3,
    title: "Иерархия данных (Data Hierarchy)",
    type: "content",
    visualType: "video",
    visualSrc: "video-1/Slide_03_Data_Hierarchy_Animation.mp4",
    visualAlt: "Animation: Scalar to Tensor",
    content: (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-center">
        <Card className="p-4 border-primary/50 bg-gray-900/50">
          <div className="text-2xl font-bold text-primary">Скаляр</div>
          <div className="text-sm text-gray-500">Одно число (25°C)</div>
        </Card>
        <Card className="p-4 border-primary/50 bg-gray-900/50">
          <div className="text-2xl font-bold text-primary">Вектор</div>
          <div className="text-sm text-gray-500">Ряд ([25, 30])</div>
        </Card>
        <Card className="p-4 border-primary/50 bg-gray-900/50">
          <div className="text-2xl font-bold text-primary">Матрица</div>
          <div className="text-sm text-gray-500">Таблица (Excel)</div>
        </Card>
        <Card className="p-4 border-primary/50 bg-gray-900/50">
          <div className="text-2xl font-bold text-primary">Тензор</div>
          <div className="text-sm text-gray-500">Многомерный массив</div>
        </Card>
      </div>
    ),
    script: "Представьте, что вы - компьютер. Если я скажу 'температура 25°C', вы получили один скаляр. Если я дам вам график погоды на 4 дня, это вектор. Таблица с температурой и влажностью - это матрица. А 1000 таких таблиц - это тензор. Главное: все операции ML - это операции с этими структурами.",
    duration: "4 min"
  },
  {
    id: 4,
    title: "Матрица как реальные данные",
    type: "split",
    visualType: "image",
    visualSrc: "video-1/Slide_04_HR_Table_Matrix.png",
    visualAlt: "HR Data Table",
    content: (
        <div className="space-y-4">
            <p className="text-gray-300">
                Представьте задачу HR: предсказать, будет ли нанят кандидат.
            </p>
            <div className="bg-gray-800 p-4 rounded-lg font-mono text-sm border border-gray-700">
                <div className="text-primary font-bold mb-2">INPUT MATRIX</div>
                <div>ID | Возраст | Опыт | Зарплата | Статус</div>
                <div className="text-gray-500 my-1">-------------------------------------</div>
                <div>1  | 25      | 2    | 50000    | НАНЯТ</div>
                <div>2  | 32      | 5    | 80000    | НАНЯТ</div>
                <div>3  | 28      | 3    | 60000    | ОТКАЗ</div>
            </div>
            <p className="text-sm text-gray-400">
                Модель ищет закономерности: "Если Опыт &gt; 2, то Статус = НАНЯТ"
            </p>
        </div>
    ),
    script: "В бизнесе мы видим таблицы. Для алгоритма это просто матрица чисел. Модель смотрит на эти данные и учится: 'А, похоже, опыт важнее возраста. Если опыт > 2, обычно берут.' Математика здесь простая: мы просто ищем закономерности в этих числах.",
    duration: "3 min"
  },
  {
    id: 5,
    title: "Векторы в геометрии",
    type: "split",
    visualType: "image",
    visualSrc: "video-1/Slide_05_Vector_Geometry.png",
    visualAlt: "Vector Graph",
    content: (
        <div>
            <p className="mb-4 text-lg">
                Вектор — это стрелка в пространстве смыслов.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Координаты [2, 3] указывают направление.</li>
                <li>В LLM слово — это вектор из 768 чисел.</li>
                <li>Похожие слова (Король, Царица) смотрят в одну сторону.</li>
            </ul>
        </div>
    ),
    script: "Вектор - это не просто список чисел. Это точка в пространстве, или стрелка, указывающая в определённом направлении. Почему это важно? Потому что всё машинное обучение работает в многомерном пространстве. Эмбеддинг из LLM - это вектор. Каждое число - это 'координата' в пространстве смысла.",
    duration: "2 min"
  },
  {
    id: 6,
    title: "Матричное умножение",
    type: "content",
    visualType: "video",
    visualSrc: "video-1/Slide_06_Matrix_Multiplication.mp4",
    visualAlt: "Matrix Multiplication Animation",
    content: (
        <div className="text-center mt-4 bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-primary mb-2">Строка × Столбец = Число</h3>
            <p className="text-gray-400">Это происходит миллиарды раз при генерации одного ответа ChatGPT.</p>
        </div>
    ),
    script: "Матричное умножение - это самая важная операция в ML. Процесс простой: Берём строку, умножаем на столбец, суммируем. Это смешивает входные данные с весами нейросети, выделяя важную информацию.",
    duration: "3 min"
  },
  {
    id: 7,
    title: "Линейная регрессия",
    type: "split",
    visualType: "image",
    visualSrc: "video-1/Slide_07_Linear_Regression_Graph.png",
    visualAlt: "Linear Regression Graph",
    content: (
        <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded-lg text-center">
                <code className="text-xl text-green-400 font-mono">y = w*x + b</code>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
                <li><strong className="text-white">y</strong>: Цена (предсказание)</li>
                <li><strong className="text-white">x</strong>: Площадь (данные)</li>
                <li><strong className="text-white">w</strong>: Вес (наклон линии)</li>
                <li><strong className="text-white">b</strong>: Смещение (база)</li>
            </ul>
            <p>Мы ищем идеальную прямую линию, которая пройдет через все точки с минимальной ошибкой.</p>
        </div>
    ),
    script: "Линейная регрессия - начало всего. Мы пытаемся провести прямую линию через прошлое, чтобы предсказать будущее. Алгоритм учится подбирать наклон (w) и сдвиг (b), чтобы минимизировать ошибку между линией и реальными точками.",
    duration: "5 min"
  },
  {
    id: 8,
    title: "Градиентный спуск",
    type: "content",
    visualType: "image",
    visualSrc: "video-1/Slide_08_Gradient_Descent_Mountain.png",
    visualAlt: "Gradient Descent Animation",
    content: (
        <div className="max-w-2xl mx-auto mt-4 bg-gray-900/80 p-6 rounded-xl">
            <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
                <span>Высокая ошибка</span>
                <span>Минимальная ошибка</span>
            </div>
            <div className="h-2 bg-gradient-to-r from-red-500 to-green-500 rounded-full"></div>
            <p className="text-center mt-4 text-gray-300">Алгоритм "шагает" вниз по склону функции потерь, пока не найдет дно (оптимальные веса).</p>
        </div>
    ),
    script: "Представьте, вы стоите на горе в тумане. Как спуститься? Вы делаете шаг туда, где наклон идет вниз. Это и есть градиентный спуск. 1. Вычисляем направление. 2. Делаем шаг. 3. Повторяем. Так сеть учится.",
    duration: "4 min"
  },
  {
    id: 9,
    title: "Деревья решений",
    type: "split",
    visualType: "image",
    visualSrc: "video-1/Slide_09_Decision_Tree_Logic.png",
    visualAlt: "Decision Tree",
    content: (
        <div className="space-y-4">
            <p className="text-lg">Логика "Если-То", понятная человеку.</p>
            <div className="pl-4 border-l-2 border-primary space-y-2 font-mono text-sm bg-gray-800/50 p-4 rounded-r-lg">
                <div>IF (Petal Length &gt; 5.5)</div>
                <div className="pl-4 text-green-400">➜ THEN: Not Iris</div>
                <div className="pl-4 text-orange-400">➜ ELSE: IF (Width &gt; 3)</div>
                <div className="pl-8 text-blue-400">➜ THEN: Iris Versicolor</div>
            </div>
        </div>
    ),
    script: "Деревья решений думают как люди. Они задают серию вопросов Да/Нет, чтобы прийти к ответу. Это делает их очень интерпретируемыми, в отличие от 'черного ящика' нейросетей.",
    duration: "3 min"
  },
  {
    id: 10,
    title: "Нейрон",
    type: "split",
    visualType: "image",
    visualSrc: "video-1/Slide_10_Neuron_Closeup.png",
    visualAlt: "Neuron Diagram",
    content: (
        <div className="space-y-4">
            <h3 className="text-xl font-bold">Анатомия ИИ</h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-300">
                <li><span className="text-white font-bold">Входы (x):</span> Данные</li>
                <li><span className="text-white font-bold">Веса (w):</span> Важность входа</li>
                <li><span className="text-white font-bold">Сумма (Σ):</span> Смешивание</li>
                <li><span className="text-white font-bold">Активация (σ):</span> Нелинейность (Решение)</li>
            </ol>
            <div className="bg-gray-800 p-2 rounded text-center text-xs font-mono mt-4 border border-gray-700">
                y = activation( sum(x * w) + b )
            </div>
        </div>
    ),
    script: "Нейрон - это базовый блок. Входы умножаются на веса (синапсы), суммируются, и проходят через функцию активации. Без функции активации сеть была бы просто линейной регрессией. Активация добавляет 'искру' интеллекта.",
    duration: "4 min"
  },
  {
    id: 11,
    title: "Свёрточные сети (CNN)",
    type: "split",
    visualType: "image",
    visualSrc: "video-1/Slide_11_CNN_Scanning.png",
    visualAlt: "CNN Filter Scanning",
    content: (
        <div>
            <p className="mb-4">Идеальны для изображений (Computer Vision).</p>
            <div className="flex flex-col gap-4">
                <Card className="p-3 bg-blue-900/20 border-blue-800">
                    <h4 className="font-bold text-blue-400">Фильтр (Свертка)</h4>
                    <p className="text-sm">Скользит по картинке, ищет края, углы, текстуры.</p>
                </Card>
                <Card className="p-3 bg-purple-900/20 border-purple-800">
                    <h4 className="font-bold text-purple-400">Pooling</h4>
                    <p className="text-sm">Уменьшает размер, оставляя только самое важное.</p>
                </Card>
            </div>
        </div>
    ),
    script: "Для картинок мы используем 'окно', которое скользит по изображению. Это позволяет находить котиков независимо от того, в каком углу фотографии они сидят. CNN видят мир через фильтры.",
    duration: "3 min"
  },
  {
    id: 12,
    title: "Механизм Attention",
    type: "content",
    visualType: "image",
    visualSrc: "video-1/Slide_12_Attention_Mechanism_Network.png",
    visualAlt: "Attention Mechanism Visualization",
    content: (
        <div className="mt-6 text-center max-w-2xl mx-auto bg-black/60 p-6 rounded-xl border border-gray-800">
            <h3 className="text-2xl font-bold mb-4 font-serif">"The cat sat on the mat"</h3>
            <p className="text-gray-300 mb-4">
                Слово <span className="text-primary font-bold">"it"</span> смотрит на все остальные слова.
                Оно понимает, что относится к <span className="text-primary font-bold">"cat"</span>, а не к "mat".
            </p>
            <div className="flex justify-center gap-8 text-sm font-mono text-gray-500">
                <div className="text-green-400">Query (Вопрос)</div>
                <div className="text-blue-400">Key (Ключ)</div>
                <div className="text-purple-400">Value (Значение)</div>
            </div>
        </div>
    ),
    script: "Это главный прорыв. Модель больше не читает слева направо. Она видит всё предложение сразу. Механизм Attention позволяет каждому слову 'обратить внимание' на релевантные слова контекста, независимо от расстояния.",
    duration: "5 min"
  },
  {
    id: 13,
    title: "Архитектура Transformer",
    type: "content",
    visualType: "image",
    visualSrc: "all_diagrams/transformer_architecture.png",
    visualAlt: "Transformer Stack Animation",
    content: (
        <div className="absolute top-4 right-4 bg-black/80 p-4 rounded-xl border border-gray-800 max-w-xs text-left shadow-2xl">
            <h4 className="text-primary font-bold mb-2 border-b border-gray-700 pb-2">Блок Трансформера:</h4>
            <ul className="text-xs space-y-3 text-gray-300">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> <strong>Input Embedding:</strong> Токен в вектор</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> <strong>Positional Encoding:</strong> Порядок</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> <strong>Attention:</strong> Контекст</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> <strong>Feed Forward:</strong> Обработка</li>
            </ul>
        </div>
    ),
    script: "Это двигатель GPT-4. Токены текут снизу вверх через 96 таких слоев. Каждый слой уточняет смысл. Attention понимает контекст, Feed-Forward обрабатывает факты. Это архитектура, изменившая мир.",
    duration: "5 min"
  },
  {
    id: 14,
    title: "Итоги лекции",
    type: "split",
    visualType: "image",
    visualSrc: "video-1/Slide_14_Summary_Collage.png",
    visualAlt: "Summary Collage",
    content: (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Что мы узнали:</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 p-2 bg-gray-800 rounded"><CheckCircle size={16} className="text-green-500"/> Данные = Матрицы</div>
                <div className="flex items-center gap-2 p-2 bg-gray-800 rounded"><CheckCircle size={16} className="text-green-500"/> Обучение = Спуск</div>
                <div className="flex items-center gap-2 p-2 bg-gray-800 rounded"><CheckCircle size={16} className="text-green-500"/> Нейроны = Активация</div>
                <div className="flex items-center gap-2 p-2 bg-gray-800 rounded"><CheckCircle size={16} className="text-green-500"/> Attention = Контекст</div>
            </div>
            <div className="pt-6 border-t border-gray-700">
                <p className="text-gray-400 text-sm mb-2">Следующая лекция:</p>
                <div className="text-lg font-bold text-primary">Параметры генерации и Промпт-инжиниринг</div>
            </div>
        </div>
    ),
    script: "Мы прошли путь от простого числа до архитектуры, изменившей мир. Теперь вы понимаете физику процесса. В следующих модулях мы научимся управлять этими гигантами.",
    duration: "2 min"
  }
];

export const Lecture1Interactive: React.FC<{ onClose: () => void }> = ({ onClose }) => {
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

  // Keyboard navigation
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
    <div className="fixed inset-0 z-50 bg-[#0a0a0a] text-white flex flex-col font-sans">
      
      {/* Header */}
      <header className="h-16 border-b border-gray-800 bg-[#121212] px-6 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-4">
          <div className="bg-primary/20 p-2 rounded-lg text-primary">
            <BookOpen size={20} />
          </div>
          <div>
            <h1 className="font-bold text-sm md:text-base">Lecture 1: Transformer Basics</h1>
            <div className="text-xs text-gray-500 flex items-center gap-2">
              <span>Slide {currentSlideIndex + 1} of {SLIDES.length}</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <span>{currentSlide.duration}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-gray-400 hover:text-white" onClick={() => setShowGrid(!showGrid)}>
             <Grid size={20} className={showGrid ? "text-primary" : ""} />
             <span className="hidden md:inline ml-2 text-xs">Overview (G)</span>
          </Button>
          <div className="h-6 w-px bg-gray-800 mx-1"></div>
          <Button variant="ghost" className="text-gray-400 hover:text-white" onClick={() => setShowScript(!showScript)}>
            <MessageSquare size={20} className={showScript ? "text-primary" : ""} />
            <span className="hidden md:inline ml-2 text-xs">Script</span>
          </Button>
          <div className="h-6 w-px bg-gray-800 mx-2"></div>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Slide Visuals */}
        <div className={`flex-1 relative flex flex-col transition-all duration-300 ${showScript ? 'w-2/3' : 'w-full'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#121212] to-[#0a0a0a] flex flex-col items-center justify-start p-8 md:p-12 overflow-y-auto custom-scrollbar">
            
            {/* Visual Container */}
            <div className="w-full max-w-5xl aspect-video bg-black/50 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden relative group shrink-0">
              {currentSlide.visualType === 'video' ? (
                <video 
                  key={`video-${currentSlide.id}`}
                  src={currentSlide.visualSrc} 
                  autoPlay 
                  loop 
                  muted 
                  className="w-full h-full object-contain animate-fade-in"
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
                  className="w-full h-full object-contain animate-fade-in"
                  onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/1280x720/1a1a1a/32B8C6?text=${encodeURIComponent(currentSlide.title)}`;
                  }}
                />
              )}
            </div>

            {/* Content Area (Separate from Visual) */}
            {currentSlide.content && (
               <div className="w-full max-w-5xl mt-6 animate-slide-up shrink-0 pb-12">
                   <div className="bg-[#1F2121] border border-gray-800 rounded-xl p-8 text-gray-300 leading-relaxed shadow-lg">
                       {currentSlide.type === 'title' && (
                            <div className="text-center mb-4">
                                {/* Title styling overrides for the box content */}
                            </div>
                       )}
                       {currentSlide.content}
                   </div>
               </div>
            )}

          </div>
        </div>

        {/* Script Sidebar */}
        {showScript && (
          <div className="w-full md:w-96 border-l border-gray-800 bg-[#151515] flex flex-col shrink-0 transition-all duration-300 absolute md:static right-0 bottom-0 top-0 z-20">
             <div className="p-4 border-b border-gray-800 bg-[#1a1a1a] flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">Speaker Transcript</span>
                <Badge text={currentSlide.duration} type="tag" />
             </div>
             <div className="flex-1 p-6 overflow-y-auto leading-loose text-gray-300 font-serif text-lg">
                <p key={currentSlide.id} className="animate-fade-in">{currentSlide.script}</p>
             </div>
             <div className="p-4 border-t border-gray-800 bg-[#1a1a1a]">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                         <Volume2 size={16} />
                    </div>
                    <span>AI Voice narration active</span>
                </div>
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
                                className={`group cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${idx === currentSlideIndex ? 'border-primary shadow-lg shadow-primary/20 scale-105' : 'border-gray-800 hover:border-gray-600'}`}
                            >
                                <div className="aspect-video bg-gray-900 relative">
                                    {/* Thumbnail Placeholder */}
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

      {/* Footer / Controls */}
      <footer className="h-20 border-t border-gray-800 bg-[#121212] px-6 flex items-center justify-between shrink-0 z-30">
         <div className="flex items-center gap-4 w-1/3">
             {/* Progress Bar */}
             <div className="w-full max-w-xs h-1.5 bg-gray-800 rounded-full overflow-hidden">
                 <div 
                    className="h-full bg-primary transition-all duration-300"
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
                className="rounded-full w-12 h-12 p-0 flex items-center justify-center shadow-lg shadow-primary/20"
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
