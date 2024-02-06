const { greet } = require('./greet');
const { spam } = require('./spam');
const { lyrics } = require('./lyrics');
const { getTitle, contextParser } = require('./helpers');
const { kick } = require('./kick');
const { add } = require('./add');
const { promoteOrDemote } = require('./promoteAndDemote');
const { muteUnmute } = require('./muteUnmute');
const { tag } = require('./tag');
const { img } = require('./img');



module.exports = {
    getTitle,
    greet,
    spam,
    lyrics,
    contextParser,
    kick,
    add,
    promoteOrDemote,
    muteUnmute,
    tag,
    img
};

