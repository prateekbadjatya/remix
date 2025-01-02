import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();

//https://www.fullstackfish.com/posts/2021-12-31-remix-prisma-sqlite/
export async function getAllPosts(){
  try {

    return await prisma.post.findMany({

      include: {
        user: true,
        comments: true
      },
      orderBy: {
        createdAt: "desc"
      }

    }
  )
    
  } catch (error) {
    console.log("unexpected error", error)
    return []
  }
}

export const getCommentsByPostSlug = async (postSlug) => {
  try {
    return await prisma.comment.findMany({
      where: {
        postSlug,
      },
      include: {
        user: true,
      },
    });
  } catch (error) {
    // Handle any errors
    console.error("Error fetching posts:", error);
    return []
  }
  
};

export async function createPost(userId, slug, title, content){
  try {

    return await prisma.post.create({
      data: {
        userId,
        slug,
        title,
        content,
      }
    })
    
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []
  }

}

export async function createComment(userId, postId, postSlug, body){
  try {
    const newComment =  await prisma.comment.create({
      data: {
        userId,
        postId,
        postSlug,
        body,
      }
    })

    return{error:false}
    
  } catch (error) {
    console.error("Error fetching posts:", error);
    return{error:true, errorMessage: error.message}
  }

}

export async function getPostById(id){

  try {

    const post = await prisma.post.findUnique({
      where: {
        id,
      }
    })

    return {error: false, post: post}
    
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {error: true, errorMessage: error.message}
  }

}

export async function updatePost(id, title, content){
  try {

    return await prisma.post.update({
      where: {
        id
      },
      data: {
        title,
        content,
      }
    })
    
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []
  }
}

export async function getPostsByUser(userId){
  try {
    const posts = await prisma.post.findMany({
      where: {
        userId,
      }
    })
    return {
      error: false,
      posts: posts,
    };

  } catch (error) {
    console.log('db operation error:',error)
    return {
      error: true,
      errorMessage: error.message,
    };
  }
}

export async function deletePostById(postId){
  console.log("postid to delete:", postId)
  try {

    // const deleteComments = await prisma.comment.deleteMany({
    //   where: {
    //     postId
    //   }
    // })

    const deletePost = await prisma.post.delete({
      where: {
        id: postId
      }
    })
    return{error: false, errorMessage:""}
    
  } catch (error) {
    console.log('db operation error:',error)
    return {error: true,errorMessage: error.message};
  }
}
