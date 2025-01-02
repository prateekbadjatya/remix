export default function Post({post}){
  
  return (
    <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>
              {new Date(post.createdAt).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              })}
          </p>
      </div>
  )
}