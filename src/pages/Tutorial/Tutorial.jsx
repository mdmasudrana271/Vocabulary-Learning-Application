import { useEffect, useState } from "react";

const Tutorial = () => {
  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
    fetch("https://vocabulary-app-server.vercel.app/tutorials", {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTutorials(data);
      });
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4">
        Japanese Tutorials For Practice Everyday
      </h1>
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-4 p-4">
        {tutorials.map((tutorial) => (
          <div
            key={tutorial._id}
            className="card lg:card-side bg-base-100 shadow-xl"
          >
            <figure>
              <iframe
                src={tutorial.embedUrl}
                title={tutorial.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </figure>
            <div className="card-body">
              <h2 className="card-title">{tutorial.title}</h2>
              <p>{tutorial.description}</p>
              <p className="font-bold">
                Uploaded on:{" "}
                <span className="text-success">{tutorial.updatedAt}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutorial;
