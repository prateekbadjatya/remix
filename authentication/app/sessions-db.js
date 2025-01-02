import { createSessionStorage } from "@remix-run/node"; // or cloudflare/deno
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function createDatabaseSessionStorage({cookie}) {
  

  return createSessionStorage({
    cookie,
    
    async createData(data, expires) {
  
      const {userId} = data;
      const session = await prisma.session.create({
        data:{
          userId: userId,
          expiresAt: expires,
        }
      })
      return session.id
    },
    async readData(id) {
      const session = await prisma.session.findUnique({
        where: {
          id
        },
        include: {
          user: true
        }
      })
      if(!session) return null;

      return {userId: session.user.id, userName: session.user.name}
    },
    async updateData(id, data, expires) {
      return await prisma.session.update({
        where: {
          id
        },
        data: {
          expiresAt: expires
        }
      })
    },
    async deleteData(id) {
      return await prisma.session.delete({
        where:{
          id
        }
      })
    },
  });
}

export const { getSession, commitSession, destroySession } =
  createDatabaseSessionStorage({

    cookie: {
      name: "__session",
      domain: "localhost",
      httpOnly: true,
      sameSite: "lax",
      secrets: ["12345"],
      secure: true
    },
  });

