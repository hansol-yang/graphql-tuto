const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { APP_SECRET, getUserId } = require('../utils');

exports.signup = async (parent, args, ctx) => {
    const { password, ...restArgs } = args;

    const hash = await bcrypt.hash(password, 10);

    const user = await ctx.prisma.user.create({
        data: { password: hash, ...restArgs },
    });

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token,
        user,
    };
};

exports.login = async (parent, args, ctx) => {
    const { email, password } = args;

    const user = await ctx.prisma.user.findUnique({ where: { email } });

    if (!user) {
        throw new Error('No such user found');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token,
        user,
    };
};

exports.post = async (parent, args, ctx) => {
    const { userId } = ctx;
    const { url, description } = args;

    const link = await ctx.prisma.link.create({
        data: {
            url,
            description,
            postedBy: { connect: { id: userId } },
        },
    });
    ctx.pubsub.publish('NEW_LINK', link);
    return link;
};

exports.vote = async (parent, args, ctx) => {
    const userId = getUserId(ctx);

    const vote = await ctx.prisma.vote.findUnique({
        where: {
            linkId_userId: { linkId: Number(args.linkId), userId: userId },
        },
    });

    if (Boolean(vote)) {
        throw new Error(`Already voted for link: ${args.linkId}`);
    }

    const newVote = ctx.prisma.vote.create({
        data: {
            user: { connect: { id: userId } },
            link: { connect: { id: Number(args.linkId) } },
        },
    });

    ctx.pubsub.publish('NEW_VOTE', newVote);
    return newVote;
};
