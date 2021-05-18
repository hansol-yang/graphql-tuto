exports.links = (parent, args, ctx) => {
    return ctx.prisma.user.findUnique({ where: { id: parent.id } }).links();
};
