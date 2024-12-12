import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Lessons = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/lessons", {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLessons(data);
        console.log(data);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Lessons</title>
      </Helmet>
      <div className="mt-10 h-full ">
        <h1 className="text-center text-2xl font-extrabold">
          Learn your everyday vocabulary lessons{" "}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center justify-around items-center my-10 mx-auto">
          {lessons?.map((lesson) => (
            <div key={lesson._id} className="card bg-base-100 shadow-xl  w-96">
              <div className="card-body items-center text-center">
                <h2 className="card-title">{lesson.lessonName}</h2>
                <p>Lessons Number {lesson.lessonNumber}</p>
                <p>Amount of vocabulary {lesson.wordCount}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-success">
                    <Link to={`vocabulary/${lesson.lessonNumber}`}>
                      start lesson
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Lessons;
