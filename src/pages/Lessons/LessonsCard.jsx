import { useState } from "react";
import ReactConfetti from "react-confetti";
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";

const LessonsCard = () => {
  const data = useLoaderData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const currentWord = data[currentIndex];

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handlePronunciation = () => {
    const utterance = new SpeechSynthesisUtterance(currentWord.pronunciation);
    speechSynthesis.speak(utterance);
  };

  const handleComplete = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      window.location.href = "/userDashboard/lessons"; // Redirect to the Lessons page
    }, 3000);
  };

  return (
    <>
      <Helmet>
        <title>Vocabulary</title>
      </Helmet>
      <div className="text-center p-6 h-5/6 my-12 ">
        {showConfetti && <ReactConfetti />}
        <div className="border-2 border-gray-900 rounded p-5 m-4 auto">
          <h2
            onClick={handlePronunciation}
            style={{ cursor: "pointer", color: "blue" }}
          >
            {currentWord.word}
          </h2>
          <p>
            <strong>Pronunciation:</strong> {currentWord.pronunciation}
          </p>
          <p>
            <strong>Meaning:</strong> {currentWord.meaning}
          </p>
          <p>
            <strong>When to Say:</strong> {currentWord.whenToSay}
          </p>
        </div>
        <div className="gap-5 m-3 flex justify-center align-middle">
          <button
            className="btn btn-info btn-sm"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            Previous
          </button>
          <button
            className="btn btn-info btn-sm"
            onClick={handleNext}
            disabled={currentIndex === data.length - 1}
          >
            Next
          </button>
        </div>
        {currentIndex === data.length - 1 && (
          <button className="btn btn-success" onClick={handleComplete}>
            Complete
          </button>
        )}
      </div>
    </>
  );
};

export default LessonsCard;
