import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { BookOpen, Code2, Layers, Route, Database, Zap, CheckCircle2, Menu, X } from "lucide-react";
import "./styles.css";

const modules = [
  {
    id: "intro",
    title: "Fundamentos de React",
    level: "Básico",
    icon: BookOpen,
    description: "Qué es React, JSX, componentes y cómo pensar en UI declarativa.",
    lessons: [
      {
        title: "¿Qué es React?",
        content:
          "React es una librería de JavaScript para construir interfaces de usuario mediante componentes reutilizables. Su idea principal es describir cómo debe verse la UI según el estado actual de la aplicación.",
        code: `function Welcome() {\n  return <h1>Hola React</h1>;\n}`,
      },
      {
        title: "JSX",
        content:
          "JSX permite escribir estructura parecida a HTML dentro de JavaScript. En realidad se transforma a llamadas de React para crear elementos.",
        code: `const name = "Alex";\nconst element = <h2>Bienvenido, {name}</h2>;`,
      },
    ],
  },
  {
    id: "components",
    title: "Componentes y Props",
    level: "Básico",
    icon: Layers,
    description: "Cómo dividir interfaces en piezas pequeñas, reutilizables y mantenibles.",
    lessons: [
      {
        title: "Componentes",
        content:
          "Un componente es una función que regresa UI. La clave es separar responsabilidades: header, cards, formularios, listas, botones, etc.",
        code: `function ProductCard({ name, price }) {\n  return (\n    <article>\n      <h3>{name}</h3>\n      <p>{price}</p>\n    </article>\n  );\n}`,
      },
      {
        title: "Props",
        content:
          "Las props son datos que un componente recibe desde su padre. Sirven para personalizar componentes sin duplicar código.",
        code: `<ProductCard name="Café" price={45} />`,
      },
    ],
  },
  {
    id: "state",
    title: "State y Eventos",
    level: "Básico",
    icon: Zap,
    description: "Manejo de interacción del usuario usando useState y eventos.",
    lessons: [
      {
        title: "useState",
        content:
          "useState guarda información que puede cambiar con el tiempo. Cuando cambia el state, React vuelve a renderizar el componente.",
        code: `const [count, setCount] = useState(0);\n\n<button onClick={() => setCount(count + 1)}>\n  Clicks: {count}\n</button>`,
      },
      {
        title: "Eventos",
        content:
          "React usa eventos como onClick, onChange y onSubmit. Normalmente actualizan estado o disparan lógica de negocio.",
        code: `function SearchBox() {\n  const [query, setQuery] = useState("");\n  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;\n}`,
      },
    ],
  },
  {
    id: "effects",
    title: "Effects y Ciclo de Vida",
    level: "Intermedio",
    icon: Code2,
    description: "Cuándo usar useEffect para sincronizar con sistemas externos.",
    lessons: [
      {
        title: "useEffect",
        content:
          "useEffect sirve para sincronizar el componente con algo externo: APIs, subscriptions, storage, timers o eventos del navegador.",
        code: `useEffect(() => {\n  document.title = ` + "`Curso: ${lessonTitle}`" + `;\n}, [lessonTitle]);`,
      },
      {
        title: "Cleanup",
        content:
          "Cuando un efecto crea una suscripción, timer o listener, conviene limpiar ese recurso para evitar memory leaks.",
        code: `useEffect(() => {\n  const id = setInterval(() => console.log("tick"), 1000);\n  return () => clearInterval(id);\n}, []);`,
      },
    ],
  },
  {
    id: "routing",
    title: "Routing",
    level: "Intermedio",
    icon: Route,
    description: "Conceptos de rutas, páginas, navegación y parámetros dinámicos.",
    lessons: [
      {
        title: "Rutas",
        content:
          "En una SPA, el routing cambia la vista sin recargar toda la página. Frameworks como Next.js usan rutas basadas en carpetas; React Router usa configuración de rutas.",
        code: `<Routes>\n  <Route path="/" element={<Home />} />\n  <Route path="/products/:id" element={<ProductDetail />} />\n</Routes>`,
      },
    ],
  },
  {
    id: "state-management",
    title: "Estado Global",
    level: "Intermedio",
    icon: Database,
    description: "Context, Zustand, Redux y cuándo usar cada opción.",
    lessons: [
      {
        title: "Estado local vs global",
        content:
          "El estado local vive dentro de un componente. El estado global se comparte entre múltiples pantallas o componentes: usuario autenticado, carrito, tema, preferencias, etc.",
        code: `// Ejemplo conceptual con store\nconst cartItems = useCartStore((state) => state.items);\nconst addItem = useCartStore((state) => state.addItem);`,
      },
      {
        title: "Cuándo escalar",
        content:
          "No todo necesita Redux o Zustand. Primero usa state local; si muchos componentes necesitan el mismo dato, considera Context o una store global.",
        code: `// Regla práctica\n// 1 componente: useState\n// Varios cercanos: lift state up\n// Muchas pantallas: store global`,
      },
    ],
  },
];

const quizQuestions = [
  {
    question: "¿Qué provoca que React vuelva a renderizar un componente?",
    options: ["Cambiar una variable normal", "Cambiar state o props", "Crear un archivo CSS"],
    answer: 1,
  },
  {
    question: "¿Para qué sirven las props?",
    options: ["Para pasar datos a componentes", "Para instalar dependencias", "Para crear rutas dinámicas"],
    answer: 0,
  },
  {
    question: "¿Cuándo conviene usar estado global?",
    options: ["Siempre", "Cuando el dato se comparte entre muchas zonas", "Solo para botones"],
    answer: 1,
  },
];

function App() {
  const [activeModuleId, setActiveModuleId] = useState(modules[0].id);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeModule = useMemo(
    () => modules.find((module) => module.id === activeModuleId),
    [activeModuleId]
  );

  const activeLesson = activeModule.lessons[activeLessonIndex];
  const completedAnswers = Object.keys(selectedAnswers).length;
  const correctAnswers = quizQuestions.filter((item, index) => selectedAnswers[index] === item.answer).length;

  const selectModule = (id) => {
    setActiveModuleId(id);
    setActiveLessonIndex(0);
    setIsSidebarOpen(false);
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-logo">R</div>
          <div>
            <strong>React Academy</strong>
            <span>Curso online</span>
          </div>
        </div>

        <nav className="module-list">
          {modules.map((module) => {
            const Icon = module.icon;
            const isActive = module.id === activeModuleId;
            return (
              <button
                key={module.id}
                className={`module-button ${isActive ? "active" : ""}`}
                onClick={() => selectModule(module.id)}
              >
                <Icon size={18} />
                <span>{module.title}</span>
                <small>{module.level}</small>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="content">
        <header className="topbar">
          <button className="menu-button" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div>
            <p>Ruta sugerida</p>
            <h1>Aprende React desde fundamentos hasta arquitectura</h1>
          </div>
        </header>

        <section className="hero-card">
          <div>
            <span className="pill">{activeModule.level}</span>
            <h2>{activeModule.title}</h2>
            <p>{activeModule.description}</p>
          </div>
          <div className="progress-box">
            <strong>{modules.length}</strong>
            <span>Módulos</span>
          </div>
        </section>

        <section className="lesson-grid">
          <article className="lesson-card">
            <div className="lesson-tabs">
              {activeModule.lessons.map((lesson, index) => (
                <button
                  key={lesson.title}
                  className={index === activeLessonIndex ? "selected" : ""}
                  onClick={() => setActiveLessonIndex(index)}
                >
                  {index + 1}. {lesson.title}
                </button>
              ))}
            </div>

            <h3>{activeLesson.title}</h3>
            <p>{activeLesson.content}</p>
            <pre><code>{activeLesson.code}</code></pre>
          </article>

          <aside className="practice-card">
            <h3>Mini práctica</h3>
            <p>Después de estudiar este módulo, intenta explicar el concepto sin ver el código.</p>
            <ul>
              <li><CheckCircle2 size={17} /> Identifica qué datos son props.</li>
              <li><CheckCircle2 size={17} /> Decide qué debería ser state.</li>
              <li><CheckCircle2 size={17} /> Divide la UI en componentes.</li>
            </ul>
          </aside>
        </section>

        <section className="quiz-section">
          <div className="section-heading">
            <div>
              <p>Evaluación rápida</p>
              <h2>Quiz de conceptos</h2>
            </div>
            <strong>{correctAnswers}/{quizQuestions.length} correctas</strong>
          </div>

          <div className="quiz-grid">
            {quizQuestions.map((item, questionIndex) => (
              <article key={item.question} className="quiz-card">
                <h4>{item.question}</h4>
                {item.options.map((option, optionIndex) => {
                  const wasSelected = selectedAnswers[questionIndex] === optionIndex;
                  const isCorrect = item.answer === optionIndex;
                  const showResult = selectedAnswers[questionIndex] !== undefined;
                  return (
                    <button
                      key={option}
                      className={`answer ${wasSelected ? "picked" : ""} ${showResult && isCorrect ? "correct" : ""}`}
                      onClick={() => setSelectedAnswers({ ...selectedAnswers, [questionIndex]: optionIndex })}
                    >
                      {option}
                    </button>
                  );
                })}
              </article>
            ))}
          </div>
          <p className="quiz-status">Has respondido {completedAnswers} de {quizQuestions.length} preguntas.</p>
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
