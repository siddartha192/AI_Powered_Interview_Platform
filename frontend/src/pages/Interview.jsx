
import { useState } from "react";
import "./Interview.css";

const questionBank = {
  Technical: [
    {
      question: "Explain the four principles of Object-Oriented Programming.",
      expected: ["encapsulation", "inheritance", "polymorphism", "abstraction"],
    },
    {
      question: "What is the difference between an array and a linked list?",
      expected: ["contiguous", "nodes", "memory", "insertion"],
    },
    {
      question: "Explain the role of an operating system.",
      expected: ["process", "memory", "resource", "hardware"],
    },
  ],
  HR: [
    {
      question: "Tell me about yourself and your technical background.",
      expected: ["skills", "project", "experience", "learning"],
    },
    {
      question: "What are your strengths, and how do they help you?",
      expected: ["strength", "example", "team", "improve"],
    },
    {
      question: "Describe a challenge you faced while working on a project.",
      expected: ["problem", "solution", "result", "learn"],
    },
  ],
  Aptitude: [
    {
      question: "A number increases from 80 to 100. What is the percentage increase?",
      expected: ["25"],
    },
    {
      question: "If five workers finish a task in ten days, how many worker-days are required?",
      expected: ["50"],
    },
    {
      question: "What is the next number in the sequence 2, 4, 8, 16?",
      expected: ["32"],
    },
  ],
};

const initialConfig = {
  role: "Software Developer",
  type: "Technical",
  difficulty: "Medium",
};

function Interview() {
  const [config, setConfig] = useState(initialConfig);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [current, setCurrent] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState("");

  function startInterview(event) {
    event.preventDefault();

    const selectedQuestions = questionBank[config.type];
    setQuestions(selectedQuestions);
    setAnswers(selectedQuestions.map(() => ""));
    setCurrent(0);
    setFinished(false);
    setError("");
    setStarted(true);
  }

  function submitAnswer() {
    if (!answers[current]?.trim()) {
      setError("Please enter your answer before continuing.");
      return;
    }

    setError("");

    if (current < questions.length - 1) {
      setCurrent((value) => value + 1);
    } else {
      setFinished(true);
    }
  }

  function updateAnswer(value) {
    setAnswers((previous) =>
      previous.map((answer, index) => index === current ? value : answer)
    );
  }

  function calculateResults() {
    const questionResults = questions.map((item, index) => {
      const answer = answers[index].toLowerCase();
      const matched = item.expected.filter((keyword) =>
        answer.includes(keyword.toLowerCase())
      );

      return {
        question: item.question,
        answer: answers[index],
        matched: matched.length,
        total: item.expected.length,
        score: Math.round((matched.length / item.expected.length) * 100),
      };
    });

    const score = Math.round(
      questionResults.reduce((sum, result) => sum + result.score, 0) /
      Math.max(questionResults.length, 1)
    );

    return { questionResults, score };
  }

  function resetInterview() {
    setStarted(false);
    setFinished(false);
    setQuestions([]);
    setAnswers([]);
    setCurrent(0);
    setError("");
  }

  if (finished) {
    const results = calculateResults();

    return (
      <main className="interview-page">
        <button className="back-button" onClick={resetInterview}>
          ← Back to configuration
        </button>

        <section className="interview-panel result-panel">
          <span className="interview-label">DEMONSTRATION RESULTS</span>
          <div className="result-score">{results.score}%</div>
          <h1>Interview completed</h1>
          <p>
            This preliminary score measures expected keyword coverage only.
            It is not an AI assessment of answer correctness.
          </p>

          <div className="result-list">
            {results.questionResults.map((result, index) => (
              <article className="result-item" key={result.question}>
                <h3>{index + 1}. {result.question}</h3>
                <p>Your answer: {result.answer}</p>
                <span>Keyword coverage: {result.score}%</span>
              </article>
            ))}
          </div>

          <button className="interview-primary" onClick={resetInterview}>
            Start another interview
          </button>
        </section>
      </main>
    );
  }

  if (!started) {
    return (
      <main className="interview-page">
        <div className="interview-heading">
          <span className="interview-label">AI INTERVIEW MODULE</span>
          <h1>Prepare for your next interview</h1>
          <p>Configure a practice session and work through interview questions.</p>
        </div>

        <form className="interview-panel config-panel" onSubmit={startInterview}>
          <h2>Interview configuration</h2>

          <label>
            Target job role
            <input
              value={config.role}
              onChange={(event) =>
                setConfig({ ...config, role: event.target.value })
              }
              required
              placeholder="e.g. Java Developer"
            />
          </label>

          <label>
            Interview type
            <select
              value={config.type}
              onChange={(event) =>
                setConfig({ ...config, type: event.target.value })
              }
            >
              <option>Technical</option>
              <option>HR</option>
              <option>Aptitude</option>
            </select>
          </label>

          <label>
            Difficulty
            <select
              value={config.difficulty}
              onChange={(event) =>
                setConfig({ ...config, difficulty: event.target.value })
              }
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </label>

          <div className="demo-notice">
            <strong>Practice mode</strong>
            <p>
              This version uses a small local question bank.
              Gemini question generation and AI evaluation will be integrated next.
            </p>
          </div>

          <button className="interview-primary" type="submit">
            Start interview →
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="interview-page">
      <div className="interview-heading">
        <span className="interview-label">MOCK INTERVIEW · {config.type.toUpperCase()}</span>
        <h1>{config.role}</h1>
        <p>Difficulty: {config.difficulty}</p>
      </div>

      <section className="interview-panel question-panel">
        <div className="question-progress">
          <span>Question {current + 1} of {questions.length}</span>
          <span>{Math.round(((current + 1) / questions.length) * 100)}%</span>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>

        <h2>{questions[current].question}</h2>

        <label className="answer-label" htmlFor="answer">
          Your answer
        </label>

        <textarea
          id="answer"
          rows="7"
          value={answers[current]}
          onChange={(event) => updateAnswer(event.target.value)}
          placeholder="Explain your answer clearly..."
        />

        {error && <p className="form-error">{error}</p>}

        <div className="question-actions">
          <button
            className="interview-secondary"
            disabled={current === 0}
            onClick={() => {
              setCurrent((value) => value - 1);
              setError("");
            }}
          >
            ← Previous
          </button>
          <button className="interview-primary" onClick={submitAnswer}>
            {current === questions.length - 1 ? "Finish interview" : "Next question →"}
          </button>
        </div>
      </section>
    </main>
  );
}

export default Interview;
