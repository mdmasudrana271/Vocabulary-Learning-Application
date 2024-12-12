import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddLesson = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const navigate = useNavigate();

  const handleAddLesson = (data) => {
    const lesson = {
      lessonNumber: parseInt(data.lessonNumber),
      lessonName: data.lessonName,
      wordCount: 0,
    };

    fetch("http://localhost:5000/lesson", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(lesson),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Add Lesson Successfully");
          reset();
          navigate("/adminDashboard/lessonsmanagement");
        }
      });
  };
  return (
    <>
      <Helmet>
        <title>Add Lessons</title>
      </Helmet>
      <div className=" p-7">
        <h1 className="text-3xl font-bold">Add A Lesson</h1>
        <form className="mt-6" onSubmit={handleSubmit(handleAddLesson)}>
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

export default AddLesson;
