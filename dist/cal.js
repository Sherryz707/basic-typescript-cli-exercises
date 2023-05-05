#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function CalMsg(msg) {
    const CalTitle = chalkAnimation.rainbow(msg);
    await sleep();
    CalTitle.stop();
}
async function calculator() {
    let MyAnswer = await inquirer.prompt([
        {
            name: "operations",
            type: "list",
            message: "Which operation would you like to perform ?",
            choices: ["Addition", "Subtraction", "Multiplication", "Division"],
            default: "Addition",
        },
        {
            name: "operand_1",
            type: "input",
            message: "Enter number 1: ",
            default: 0,
        },
        {
            name: "operand_2",
            type: "number",
            message: "Enter number 2: ",
            default: 1,
        },
    ]);
    return MyAnswer;
}
function Operation(answer) {
    if (answer.operand_2 == 0 && answer.operations == "Division") {
        throw "Divison By Zero is not allowed...";
    }
    let answerOp;
    switch (answer.operations) {
        case "Addition": {
            answerOp = +answer.operand_1 + +answer.operand_2;
            break;
        }
        case "Subtraction": {
            answerOp = +answer.operand_1 - +answer.operand_2;
            break;
        }
        case "Multiplication": {
            answerOp = +answer.operand_1 * +answer.operand_2;
            break;
        }
        case "Division": {
            answerOp = +answer.operand_1 / +answer.operand_2;
        }
    }
    return answerOp;
}
async function again() {
    let again = inquirer.prompt({
        name: "again",
        type: "list",
        message: "Do you want to do another calculation ?",
        choices: ["Yes", "No"],
        default: "Yes",
    });
    return again;
}
async function CalMenu() {
    let againAns;
    let answer;
    let first = true;
    const spinner = createSpinner("Performing Operation....");
    do {
        try {
            if (first) {
                await CalMsg("Hello there! Its your friendly neighbourhood calculator Cal!");
                first = false;
            }
            else {
                await CalMsg("Glad to see you back! Let's do some math.");
            }
            answer = Operation(await calculator());
            spinner.start();
            await sleep();
            spinner.success({
                text: `The result of your operation is: ${chalk.bgGreenBright(answer)}`,
            });
        }
        catch (err) {
            spinner.error({ text: err });
        }
        againAns = await again();
    } while (againAns.again != "No");
    await CalMsg("Its sad to see you go....but i'm sure we'll meet again because how long can you go without Maths :)");
}
CalMenu();
