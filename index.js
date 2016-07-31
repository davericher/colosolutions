'use strict';
const nQuery = require('najax');
const chalk = require('chalk');
const helpers = require('./helpers');

// Hold on to the inputs (used for numbering the index)
let inputs = [];

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
                let message = `${helpers.getTime()} ${chalk.green('[')}${chalk.blue(data.user)}${chalk.green(']')} ${chalk.white(data.success)}`;
                console.log(message);
            }
            helpers.prompt();
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log('Something has gone wrong....')
        });
};

// main
const repl = () => {
    helpers.prompt();
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

helpers.start(repl);
