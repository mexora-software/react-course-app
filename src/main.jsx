import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { useTranslation } from "react-i18next";

import {
  BookOpen,
  Code2,
  Layers,
  Route,
  Database,
  Zap,
  CheckCircle2,
  Menu,
  X,
} from "lucide-react";

import "./i18n";
import "./styles.css";

const moduleConfig = [
  { id: "intro", icon: BookOpen },
  { id: "components", icon: Layers },
  { id: "state", icon: Zap },
  { id: "effects", icon: Code2 },
  { id: "routing", icon: Route },
  { id: "state-management", icon: Database },
];

const App = () => {
  const { t, i18n } = useTranslation();

  const modules = moduleConfig.map((module) => ({
    ...module,
    title: t(`modules.${module.id}.title`),
    level: t(`modules.${module.id}.level`),
    description: t(`modules.${module.id}.description`),
    lessons: t(`modules.${module.id}.lessons`, {
      returnObjects: true,
    }),
  }));

  const quizQuestions = t("quiz.questions", {
    returnObjects: true,
  });

  const [activeModuleId, setActiveModuleId] = useState(modules[0].id);

  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  const [selectedAnswers, setSelectedAnswers] = useState({});

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeModule = useMemo(
    () => modules.find((module) => module.id === activeModuleId),
    [modules, activeModuleId]
  );

  const activeLesson = activeModule.lessons[activeLessonIndex];

  const completedAnswers = Object.keys(selectedAnswers).length;

  const correctAnswers = quizQuestions.filter(
    (item, index) => selectedAnswers[index] === item.answer
  ).length;

  const selectModule = (id) => {
    setActiveModuleId(id);
    setActiveLessonIndex(0);
    setIsSidebarOpen(false);
  };

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "es" : "en");
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-logo">R</div>

          <div>
            <strong>{t("app.brand")}</strong>
            <span>{t("app.subtitle")}</span>
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
          <button
            className="menu-button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div>
            <p>{t("app.suggestedPath")}</p>
            <h1>{t("app.heroTitle")}</h1>
          </div>

          <div className="language-switcher">
            <button
              className="language-button"
              onClick={() =>
                i18n.changeLanguage(
                  i18n.language === "en" ? "es" : "en"
                )
              }
            >
              {i18n.language === "en" ? "ES" : "EN"}
            </button>
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
            <span>{t("app.modules")}</span>
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

            <pre>
              <code>{activeLesson.code}</code>
            </pre>
          </article>

          <aside className="practice-card">
            <h3>{t("practice.title")}</h3>

            <p>{t("practice.description")}</p>

            <ul>
              {t("practice.items", {
                returnObjects: true,
              }).map((item) => (
                <li key={item}>
                  <CheckCircle2 size={17} />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="quiz-section">
          <div className="section-heading">
            <div>
              <p>{t("quiz.eyebrow")}</p>

              <h2>{t("quiz.title")}</h2>
            </div>

            <strong>
              {correctAnswers}/{quizQuestions.length}{" "}
              {t("quiz.correct")}
            </strong>
          </div>

          <div className="quiz-grid">
            {quizQuestions.map((item, questionIndex) => (
              <article
                key={item.question}
                className="quiz-card"
              >
                <h4>{item.question}</h4>

                {item.options.map((option, optionIndex) => {
                  const wasSelected =
                    selectedAnswers[questionIndex] === optionIndex;

                  const isCorrect =
                    item.answer === optionIndex;

                  const showResult =
                    selectedAnswers[questionIndex] !==
                    undefined;

                  return (
                    <button
                      key={option}
                      className={`answer ${wasSelected ? "picked" : ""
                        } ${showResult && isCorrect
                          ? "correct"
                          : ""
                        }`}
                      onClick={() =>
                        setSelectedAnswers({
                          ...selectedAnswers,
                          [questionIndex]: optionIndex,
                        })
                      }
                    >
                      {option}
                    </button>
                  );
                })}
              </article>
            ))}
          </div>

          <p className="quiz-status">
            {t("quiz.answered", {
              completed: completedAnswers,
              total: quizQuestions.length,
            })}
          </p>
        </section>
      </main>
    </div>
  );
};

createRoot(document.getElementById("root")).render(<App />);