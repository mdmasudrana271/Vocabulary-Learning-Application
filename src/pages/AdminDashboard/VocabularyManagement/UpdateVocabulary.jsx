import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateVocabulary = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const navigate = useNavigate();
  const vocabulary = useLoaderData();

  const handleUpdateVocab = (data) => {
    const newVocabulary = {
      word: data.word,
      pronunciation: data.pronunciation,
      meaning: data.meaning,
      whenToSay: data.whenToSay,
      lessonNumber: parseInt(data.lessonNumber),
    };

    fetch(
      `https://vocabulary-app-server.vercel.app/updatevocab/${vocabulary._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(newVocabulary),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Update Vocabulary Successfully");
          reset();
          navigate("/adminDashboard/vocabularymangement");
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>Add Vocabulary</title>
      </Helmet>

      <div className=" p-7">
        <h1 className="text-3xl font-bold">Update Vocabulary</h1>
        <form className="mt-6" onSubmit={handleSubmit(handleUpdateVocab)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Word</span>
            </label>
            <input
              {...register("word", { required: "Word is required" })}
              type="text"
              placeholder="Enter Japanese Word"
              className="input input-bordered w-full"
              defaultValue={vocabulary.word}
            />
            {errors.word && (
              <p role="alert" className="text-error">
                {errors.lessonName?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Pronunciation</span>
            </label>
            <input
              {...register("pronunciation", {
                required: "Word pronunciation is required",
              })}
              type="text"
              placeholder="Enter Word pronunciation"
              className="input input-bordered w-full"
              defaultValue={vocabulary.pronunciation}
            />
            {errors.pronunciation && (
              <p role="alert" className="text-error">
                {errors.pronunciation?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Meaning</span>
            </label>
            <input
              {...register("meaning", {
                required: "Word pronunciation is required",
              })}
              type="text"
              placeholder="Enter Word Meaning"
              className="input input-bordered w-full"
              defaultValue={vocabulary.meaning}
            />
            {errors.meaning && (
              <p role="alert" className="text-error">
                {errors.meaning?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">When To Say</span>
            </label>
            <input
              {...register("whenToSay", {
                required: "Word description is required",
              })}
              type="text"
              placeholder="Enter Word Meaning"
              className="input input-bordered w-full"
              defaultValue={vocabulary.whenToSay}
            />
            {errors.whenToSay && (
              <p role="alert" className="text-error">
                {errors.whenToSay?.message}
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
              defaultValue={vocabulary.lessonNumber}
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

export default UpdateVocabulary;
