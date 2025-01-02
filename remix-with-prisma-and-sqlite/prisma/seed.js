import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      password: 'password1',
      name: 'User 1',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      password: 'password2',
      name: 'User 2',
    },
  });

  // Create posts
  const post1 = await prisma.post.create({
    data: {
      userId: user1.id,
      slug: 'post-1',
      title: 'Post 1',
      content: 'This is the content of Post 1.',
    },
  });

  const post2 = await prisma.post.create({
    data: {
      userId: user2.id,
      slug: 'post-2',
      title: 'Post 2',
      content: 'This is the content of Post 2.',
    },
  });

  // Create comments
  await prisma.comment.create({
    data: {
      userId: user1.id,
      postId: post1.id,
      postSlug: post1.slug,
      body: 'This is a comment on Post 1.',
    },
  });

  await prisma.comment.create({
    data: {
      userId: user2.id,
      postId: post2.id,
      postSlug: post2.slug,
      body: 'This is a comment on Post 2.',
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });