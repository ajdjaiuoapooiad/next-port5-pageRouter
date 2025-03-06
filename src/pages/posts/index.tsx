import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Post } from "@/utils/types";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";


type Props = {
  posts: Post[]
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3001/api/v1/posts");
  const posts = await res.json();
  console.log(posts);
  

  return {
    props: {
      posts,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
}

export default function PostsListPage({posts}: Props) {
  const router = useRouter();

  // Update function
  const handleUpdate = async (post: Post) => {
    router.push(`/edit-post/${post.id}`);
  };

  // Delete function
  const handleDelete = async (id: any) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/v1/posts/${id}`
      );

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Error deleting post");
    }
  };


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='grid grid-cols-5'>
        <div className='col-span-1'> 
          <Sidebar />
        </div>

        <div className='col-span-4'>
            {posts.map((post) => (
              <div key={post.id} className="p-5 border" >
                <Link href={`posts/${post.id}`} >
                  <h2>{post.title}</h2>
                </Link>
                <p>{post.content}</p>

                <Button
                  onClick={() => handleUpdate(post)}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>

    </>
  )
}