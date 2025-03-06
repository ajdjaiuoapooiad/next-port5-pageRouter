import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function CreatePost() {
  const [ title,setTitle ] = useState('')
  const [ content,setContent ] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(title, content);

    try{
      await axios.post('http://localhost:3001/api/v1/posts', {
        title: title,
        content: content,
      })
      router.push('/posts')
    }catch(error){
      alert('投稿に失敗しました')
    }
    
  }
  

  return (
    <div className="p-5 m-5 border w-1/2">
      <h1 >ブログ新規登録</h1>
      <form  onSubmit={handleSubmit}>
        <label>Title:</label>
        <Input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label >Content:</label>
        <Input
          type="text"
          name="content"
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}