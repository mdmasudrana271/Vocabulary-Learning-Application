import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateLesson = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const navigate = useNavigate();
  const lesson = useLoaderData();

  const handleUpdateLesson = (data) => {
    const newLesson = {
      lessonNumber: parseInt(data.lessonNumber),
      lessonName: data.lessonName,
      wordCount: data.wordCount,
    };

    fetch(
      `https://vocabulary-app-server.vercel.app/updatelesson/${lesson._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(newLesson),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Update Lesson Successfully");
          reset();
          navigate("/adminDashboard/lessonsmangement");
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>Update Lessons</title>
      </Helmet>

      <div className=" p-7">
        <h1 className="text-3xl font-bold">Update Lesson</h1>
        <form className="mt-6" onSubmit={handleSubmit(handleUpdateLesson)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Lesson Name</span>
            </label>
            <input
              {...register("lessonName", {
                required: "Lesson name is required",
              })}
              type="text"
              placeholder="Lesson Name"
              className="input input-bordered w-full"
              defaultValue={lesson.lessonName}
            />
            {errors.lesson && (
              <p role="alert" className="text-error">
                {errors.lessonName?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Lesson Number</span>
            </label>
            <input
              {...register("lessonNumber", {
                required: "Lesson number is required",
              })}
              type="number"
              placeholder="Lesson Number"
              className="input input-bordered w-full"
              defaultValue={lesson.lessonNumber}
            />
            {errors.lessonNumber && (
              <p role="alert" className="text-error">
                {errors.lessonNumber?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Word Count</span>
            </label>
            <input
              {...register("wordCount", {
                required: "word count is required",
              })}
              type="number"
              className="input input-bordered w-full"
              defaultValue={lesson.wordCount}
            />
            {errors.lessonNumber && (
              <p role="alert" className="text-error">
                {errors.lessonNumber?.message}
              </p>
            )}
          </div>
          <input
            className="btn btn-accent w-full mt-5"
            value="Submit"
            type="submit"
          />
        </form>
      </div>
    </>
  );
};

export default UpdateLesson;
