'use strict';
const nQuery = require('najax');
const chalk = require('chalk');
const messages = require('./messages');

// Hold on to the inputs (used for numbering the index)
let inputs = [];

// Chat Start
const chatIntro = () => {
    messages.chatIntro.forEach((value, key) => {
        setTimeout(() => {
            console.log(value.replace('==',chalk.yellow('==')).replace('***', chalk.red('***')));
            if(key == messages.chatIntro.length - 1) {
                main();
            }
        }, key * 300);
    });
};

// Get Time
const getTime = () => {
    var time = new Date(),
        hrs = time.getHours(),
        mins = time.getMinutes();
    if (hrs < 10) hrs = '0' + hrs;
    if (mins < 10) mins = '0' + mins;
    var fTime = '[' + hrs + ":" + mins + ']';
    return fTime;
};

// Get Input
const getInputs = () => {
    var data = {},
        key = 1,
        inputsLen = inputs.length;
    if (inputsLen > 0 && inputsLen >= 6) {
        for (var i = (inputsLen - 6); i < inputsLen; i++) {
            data['i' + key] = inputs[i];
            key++;
        }
    } else {
        for (key in inputs) {
            data['i' + key] = inputs[key];
        }
    }
    return data;
};

// Send inputs
const sendInputs = () => {
    nQuery({
            type: 'POST',
            url: 'http://irc.colo-solutions.net/php/ajax.php',
            dataType: 'json',
            data: getInputs()
        })
        .done(function(data, textStatus, jqXHR) {
            if (data.success != '') {
                let message = `${getTime()} ${chalk.green('[')}${chalk.blue(data.user)}${chalk.green(']')} ${chalk.white(data.success)}`;
                console.log(message);
            }
            setTimeout(prompt,3);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log('Something has gone wrong....')
        });
};

// User Prompt
const prompt = () => {
    process.stdout.write(`${getTime()} ${chalk.green('[')}${chalk.red('D0loresH4ze')}${chalk.green(']')} `);
};

// main
const main = () => {
    // Begin
    console.log(chalk.bgWhite.black('H3ll0 F413nd. use /exit to escape.'));
    prompt();

    // Listen for keyboard input
    const stdin = process.openStdin();
    stdin.addListener("data", function(input) {
        // Trim line endings from input
        let text = input.toString().trim();
        // Check for repl termination comand
        if (text === '/exit') {
            console.log('Good Bye Friend.');
            stdin.destroy();
            return;
        }
        inputs.push(text);
        sendInputs();
    });
};

chatIntro();
