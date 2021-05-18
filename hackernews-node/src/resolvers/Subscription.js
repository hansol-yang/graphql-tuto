const newLinkSubscribe = (parent, args, ctx, info) => {
    return ctx.pubsub.asyncIterator('NEW_LINK');
};

const newVoteSubscribe = (parent, args, ctx, info) => {
    return ctx.pubsub.asyncIterator('NEW_VOTE');
};

exports.newLink = {
    subscribe: newLinkSubscribe,
    resolve: (payload) => payload,
};

exports.newVote = {
    subscribe: newVoteSubscribe,
    resolve: (payload) => payload,
};