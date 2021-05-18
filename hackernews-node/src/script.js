const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const main = async () => {
    // const newLink = await prisma.link.create({
    //     data: {
    //         description: 'Fullstack tutorial for GraphQL',
    //         url: 'www.howtographql.com',
    //     },
    // });
    const allLinks = await prisma.link.findMany();
    console.log(allLinks);
    // const link = await prisma.link.findUnique({ where: { id: 1 },  });
    // console.log(link);
};

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
