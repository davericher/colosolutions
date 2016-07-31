const messages = require('./messages');
const chalk = require('chalk');

// Get Time
const getTime = module.exports.getTime = () => {
    var time = new Date(),
        hrs = time.getHours(),
        mins = time.getMinutes();
    if (hrs < 10) hrs = '0' + hrs;
    if (mins < 10) mins = '0' + mins;
    var fTime = '[' + hrs + ":" + mins + ']';
    return fTime;
};

// Print line
const printLine = module.exports.printLine = text => {
    console.log(`${getTime()} ${text}`);
};

// User Prompt
const prompt = module.exports.prompt = () => {
        process.stdout.write(`${getTime()} ${chalk.green('[')}${chalk.red('D0loresH4ze')}${chalk.green(']')} `);
}

// Chat Start
const motd = module.exports.motd = cb => {
    messages.chatIntro.forEach((value, key) => {
        setTimeout(() => {
            printLine(value.replace('==', chalk.yellow('==')).replace('***', chalk.red('***')));
            if (key == messages.chatIntro.length - 1) {
                cb();
            }
        }, key * 300);
    });
};

const start = module.exports.start = (cb) => {
    console.log(chalk.bgWhite.black('H3ll0 F413nd. use /exit to escape.'));
    motd(cb);
};
