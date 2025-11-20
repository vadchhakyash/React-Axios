import { useEffect, useState } from "react";
import { deletePost, getPost } from "../Api/PostApi";
import { Form } from "./Form";

export const Posts = () => {
  const [data, setData] = useState([]);
  const [updateDataApi, setUpdateDataApi] = useState({});

  const getPostData = async () => {
    const res = await getPost();
    console.log(res.data);
    setData(res.data);
  };

  useEffect(() => {
    getPostData();
  }, []);

  //   function to delete post
  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const newUpdatedPosts = data.filter((curPost) => {
          return curPost.id !== id;
        });
        setData(newUpdatedPosts);
      } else {
        console.log("Failed to delete the post:", res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   function to update post
  const handleUpdatePost = (curElem) => {
    return setUpdateDataApi(curElem);
  };

  return (
    <>
      <section className="flex justify-center mt-10 mb-5 bg-[#212f3d]">
        <Form
          data={data}
          setData={setData}
          updateDataApi={updateDataApi}
          setUpdateDataApi={setUpdateDataApi}
        />
      </section>
      <section className="flex justify-center">
        <ol className="list-decimal list-inside grid grid-cols-1 gap-5 p-4 sm:grid-cols-2 md:grid-cols-3">
          {data &&
            data.map((curElem) => {
              const { id, body, title } = curElem;
              return (
                <li
                  key={id}
                  className="bg-[#212f3c] p-4 rounded-xl text-white space-y-2"
                >
                  <p>Title: {title}</p>
                  <p>Body: {body}</p>
                  <button
                    onClick={() => handleUpdatePost(curElem)}
                    className="cursor-pointer bg-[hsl(160,80%,48%)]  tracking-[1px] uppercase text-[15px]  ml-2 px-4 py-2 rounded-[0.3rem] border-0"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePost(id)}
                    className="cursor-pointer bg-[hsl(2,80%,48%)]  tracking-[1px] uppercase text-[15px]  ml-2 px-4 py-2 rounded-[0.3rem] border-0"
                  >
                    Delete
                  </button>
                </li>
              );
            })}
        </ol>
      </section>
    </>
  );
};
