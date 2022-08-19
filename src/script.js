const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const newLink = await prisma.link.create({
    data : {
      description: 'its google, you know what it is',
      url: 'www.google.ca'
    }
  })
  
  const allLinks = await prisma.link.findMany()
  console.log(allLinks);
};

main()
.catch(e => {
  throw e
})
.finally(async () => {
  await prisma.$disconnect()
})