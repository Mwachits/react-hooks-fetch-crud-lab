import { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then(data => setQuestions(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setQuestions(prevQuestions => prevQuestions.filter(q => q.id !== id));
      });
  };

  const handleUpdate = (id, correctIndex) => {
    console.log(`Updating question ${id} with correctIndex: ${correctIndex}`);
    
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ correctIndex })
    })
      .then(response => response.json())
      .then(updatedQuestion => {
        setQuestions(prevQuestions =>
          prevQuestions.map(q => (q.id === id ? updatedQuestion : q))
        );
      });
  };
  

  const handleDropdownChange = (id, correctIndex) => {
    handleUpdate(id, correctIndex);
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(question => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDelete}
            onDropdownChange={handleDropdownChange}
          />
        ))}</ul>
    </section>
  );
}

export default QuestionList;
