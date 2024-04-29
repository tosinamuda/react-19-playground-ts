import { useFormStatus } from 'react-dom';
import { useState } from 'react';

type Post = {
  title: string;
  body: string;
}
type PostItemProps = {
  post: Post
}

// PostItem component
const PostItem:React.FC<PostItemProps> = ({ post }) => {
  return (
    <div className='bg-blue-50 shadow-md p-4 my-6 rounded-lg'>
      <h2 className='text-xl font-bold'>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
};

// SubmitButton component
const SubmitButton = () => {
  const { pending } = useFormStatus();
  console.log(pending);

  return (
    <button
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
      type='submit'
      disabled={pending}
    >
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
};

type PostFormProps = {
  addPost: (post: Post) => void
}
// PostForm component
const PostForm:React.FC<PostFormProps> = ({ addPost }) => {
  const formAction = async (formData: FormData) => {
    // Simulate a delay of 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // We have direct access to the form data
    const newPost = {
      title: formData.get('title') as string,
      body: formData.get('body') as string,
    };

    addPost(newPost);
  };

  return (
    <form
      action={formAction}
      className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
    >
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='title'
        >
          Title
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='title'
          type='text'
          placeholder='Enter title'
          name='title'
        />
      </div>
      <div className='mb-6'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='body'
        >
          Body
        </label>
        <textarea
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='body'
          rows={5}
          placeholder='Enter body'
          name='body'
        ></textarea>
      </div>
      <div className='flex items-center justify-between'>
        <SubmitButton />
      </div>
    </form>
  );
};

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (newPost: Post) => {
    setPosts((posts) => [...posts, newPost]);
  };

  return (
    <>
      <PostForm addPost={addPost} />
      {posts.map((post, index) => (
        <PostItem key={index} post={post} />
      ))}
    </>
  );
};
export { Posts as UseFormStatusExample };
