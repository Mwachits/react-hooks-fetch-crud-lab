import React, { useState } from 'react';
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  const addQuestion = (newQuestion) => {
    setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={addQuestion} /> : <QuestionList questions={questions} />}
    </main>
  );
}

export default App;
