export default function PostsList({posts}){
  
  return (
    <>
    {posts.map((post) => (
          <div key={post.id}>
          <h2>
              <a href={'/posts/'+post.slug}>{post.title}</a>
          </h2>
          <p>
              {post.content.split(' ').slice(0, 20).join(' ')}
              {post.content.split(' ').length > 20 && '...'}
          </p>
          <p>
              {new Date(post.createdAt).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              })}
          </p>
          </div>
      ))}

    </>
  )
}