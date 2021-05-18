exports.feed = async (parent, args, ctx) => {
    const where = args.filter
        ? {
              OR: [
                  { description: { contains: args.filter } },
                  { url: { contains: args.filter } },
              ],
          }
        : {};
    const links = await ctx.prisma.link.findMany({
        where,
        skip: args.skip,
        take: args.take,
        orderBy: args.orderBy,
    });

    const count = await ctx.prisma.link.count({ where });
    
    return {
        links,
        count,
    };
};
