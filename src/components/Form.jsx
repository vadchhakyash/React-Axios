import { useEffect, useState } from "react";
import { postData, updateData } from "../Api/PostApi";

export const Form = ({ data, setData, updateDataApi, setUpdateDataApi }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  let isEmpty = Object.keys(updateDataApi).length === 0;

  //   get the updated data and add into input field

  useEffect(() => {
    updateDataApi &&
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
  }, [updateDataApi]);

  const addPostData = async () => {
    const res = await postData(addData);
    console.log("res", res);

    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({ title: "", body: "" });
    }
  };

  //updatePostData
  const updatePostData = async () => {
    try {
      const res = await updateData(updateDataApi.id, addData);
      console.log(res);

      if (res.status === 200) {
        setData((prev) => {
          return prev.map((curElem) => {
            return curElem.id === res.data.id ? res.data : curElem;
          });
        });
        setAddData({ title: "", body: "" });
        setUpdateDataApi({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  // form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addPostData();
    } else if (action === "Edit") {
      updatePostData();
    }
  };

  return (
    <form
      className="
    flex flex-col gap-3           /* Default: vertical for mobile */
    sm:flex-row sm:items-center   /* Row & vertically-center for >=640px screens */
    w-full
    px-2 py-2
    bg-[#212f3d]
  "
      onSubmit={handleFormSubmit}
    >
      <div className="flex-1">
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          type="text"
          autoComplete="off"
          id="title"
          name="title"
          placeholder="Add Title"
          value={addData.title}
          onChange={handleInputChange}
          className="w-full text-white px-2 py-2 rounded-md border border-gray-400 bg-transparent placeholder-gray-400"
        />
      </div>
      <div className="flex-1">
        <label htmlFor="body" className="sr-only">
          Body
        </label>
        <input
          type="text"
          autoComplete="off"
          id="body"
          name="body"
          placeholder="Add Post"
          value={addData.body}
          onChange={handleInputChange}
          className="w-full text-white px-2 py-2 rounded-md border border-gray-400 bg-transparent placeholder-gray-400"
        />
      </div>
      <button
        className="
      cursor-pointer bg-[hsl(160,80%,48%)]
      tracking-[1px] uppercase
      text-[15px] sm:ml-2 mt-2 sm:mt-0
      px-4 py-2 rounded-md border-0
      w-full sm:w-auto
      transition-all
    "
        type="submit"
      >
        {isEmpty ? "Add" : "Edit"}
      </button>
    </form>
  );
};
