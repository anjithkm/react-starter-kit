import React, { useState } from 'react'
import { useCreatePostMutation, useGetPostsQuery } from '@/services/api'

const Posts: React.FC = () => {
	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [ createPost, { isLoading } ] = useCreatePostMutation()
	const { data: getPostData, error: getPostError, isLoading: getPostLoading } = useGetPostsQuery();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		await createPost({ title, body })
		setTitle('')
		setBody('')
	}

	return (
		<div >
			<h1>Create Post</h1>
			<form style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}  onSubmit={handleSubmit}>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Title"
					required
				/>
				<textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Body" required />
				<button  type="submit" disabled={isLoading}>
					{isLoading ? 'Creating...' : 'Create'}
				</button>
			</form>
			<h1>Posts</h1>
			{
				getPostLoading ? <p>{"Loading..."}</p> : ""
			}
			{
				getPostError  ? <p> {"Error loading posts"}</p> : ""
			}
		  <ul>
            {getPostData?.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
		</div>
	)
}

export default Posts
