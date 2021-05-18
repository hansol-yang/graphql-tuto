exports.postedBy = (parent, args, ctx) => {
    return ctx.prisma.link.findUnique({ where: { id: parent.id } }).postedBy();
};

exports.votes = (parent, args, ctx) => {
    return ctx.prisma.link.findUnique({ where: { id: parent.id } }).votes();
};
