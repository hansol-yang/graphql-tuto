exports.link = (parent, args, ctx) => {
    return ctx.prisma.vote.findUnique({ where: { id: parent.id } }).link();
};
exports.user = () => {
    return ctx.prisma.vote.findUnique({ where: { id: parent.id } }).user();
};
