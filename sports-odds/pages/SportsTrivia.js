import { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/src/Header";
import styles from "@/styles/trivia.module.css";
import he from "he";

const SportsTrivia = () => {
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  function replaceHtmlEntities(str) {
    return he.decode(str);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let url;
    if (difficulty === "" && questionType === "") {
      url = `https://opentdb.com/api.php?amount=${numQuestions}&category=21`;
    } else if (difficulty !== "" && questionType === "") {
      url = `https://opentdb.com/api.php?amount=${numQuestions}&category=21&difficulty=${difficulty}`;
    } else if (difficulty === "" && questionType !== "") {
      url = `https://opentdb.com/api.php?amount=${numQuestions}&category=21&type=${questionType}`;
    } else {
      url = `https://opentdb.com/api.php?amount=${numQuestions}&category=21&difficulty=${difficulty}&type=${questionType}`;
    }
    axios.get(url).then((response) => {
      setQuestions(response.data.results);
      setQuizStarted(true);
    });
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null) {
      const currentQuestion = questions[currentQuestionIndex];

      if (selectedAnswer === currentQuestion.correct_answer) {
        setAnswer("That is correct!");
      } else {
        setAnswer("That is incorrect, try again!");
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setAnswer("");
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleStartNewQuiz = () => {
    setQuizFinished(false);
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
  };

  useEffect(() => {
    if (questions.length > 0 && questions[currentQuestionIndex]) {
      const { correct_answer, incorrect_answers } =
        questions[currentQuestionIndex];
      const options = [correct_answer, ...incorrect_answers].sort(
        () => Math.random() - 0.5
      );
      setShuffledOptions(options);
    }
  }, [questions, currentQuestionIndex]);

  let question;
  if (questions && questions.length > 0) {
    question = questions[currentQuestionIndex];
  }

  return (
    <div className={styles.header}>
      <Header />
      <h1 className={styles.header}>SportsTrivia</h1>
      {!quizStarted ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.labels} htmlFor="amount_of_question">
            How many questions
          </label>
          <input
            type="number"
            className={styles.form_input}
            value={numQuestions}
            onChange={(e) => {
              setNumQuestions(Number(e.target.value));
            }}
          />
          <label className={styles.labels} htmlFor="difficulty">
            Select difficulty
          </label>
          <select
            value={difficulty}
            className={styles.form_select}
            onChange={(e) => {
              setDifficulty(e.target.value);
              console.log(difficulty);
            }}
          >
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <label className={styles.labels} htmlFor="question_type">
            Select question type
          </label>
          <select
            className={styles.form_select}
            value={questionType}
            onChange={(e) => {
              setQuestionType(e.target.value);
              console.log(questionType);
            }}
          >
            <option value="">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
          <button className={styles.form_button} type="submit">
            Submit
          </button>
        </form>
      ) : null}
      {quizStarted && !quizFinished && question ? (
        <div className={styles.trivia}>
          <div>
            <h3 className={styles.trivia_h3}>
              {replaceHtmlEntities(question.question)}
            </h3>
            <ul className={styles.trivia_ul}>
              {shuffledOptions.map((option, index) => (
                <label
                  key={index}
                  className={styles.trivia_label}
                  style={{
                    backgroundColor:
                      selectedAnswer === option ? "rgb(118 117 117)" : null,
                    borderRadius: 5,
                  }}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    className={styles.trivia_radio}
                    checked={selectedAnswer === option}
                    onChange={() => handleAnswerSelect(option)}
                  />
                  {replaceHtmlEntities(option)}
                </label>
              ))}
            </ul>
            <button
              className={styles.trivia_button}
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
            >
              Submit
            </button>
            <button
              className={styles.trivia_button}
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex >= questions.length}
            >
              {currentQuestionIndex === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </button>
            {answer !== "" ? (
              <p
                style={{
                  color: answer.length < 17 ? "green" : "red",
                  padding: 10,
                  fontSize: 18,
                }}
              >
                {answer}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
      {quizFinished ? (
        <div className={styles.trivia}>
          <p>You have finished the quiz! Want to take another one?</p>
          <button
            className={styles.play_again_button}
            onClick={handleStartNewQuiz}
          >
            Yes
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default SportsTrivia;
