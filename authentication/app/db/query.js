import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();

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

export async function createUser(email, password, name){
  try {

    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    })
    if(existingUser){
      return {error: true, errorMessage: "User with same email exists. Please login."}
    }else{
      const newUser = await prisma.user.create({
        data: {
          email,
          password,
          name
        }
      })

      return {error: false, errorMessage:"", user: newUser}
    }
    
  } catch (error) {
    console.log(`Unexpected error ${error}`)
    return {error: true, errorMessage:`Unexpected error ${error.message}`}
  }
}

export async function login(input_email, input_password){
  
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: input_email,
        password: input_password
      },
    })

    if(existingUser){
      return {error:false, user: existingUser}
    }else{
      return { error: true, errorMessage: 'User not found. email or password is wrong' }
    }
  } catch (error) {
    console.error('Error creating user:', error);
    return { error: true, errorMessage: `Unexpected error${error}` };
  }
}
