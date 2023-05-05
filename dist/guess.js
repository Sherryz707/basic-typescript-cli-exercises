import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";
let compNum = Math.floor(Math.random() * 10) + 1;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function Welcome() {
    let title = chalkAnimation.karaoke("Welcome to the Number Guessing Game!!!");
    await sleep();
    title.stop();
    chalk.bgBlue("Here are the rules of the game: ");
    console.log(`The computer will generate a random number between 1 and 10. You have to correctly guess which number was generates. You have ${chalk.bgYellow("5 lives")} after which the game will end and you will ${chalk.bgRed("lose...:(")}`);
}
async function input() {
    let guess;
    return (guess = await inquirer.prompt({
        name: "guess",
        type: "input",
        message: "Enter your guess: ",
        default: 1,
    }));
}
function processAnswer({ guess }) {
    let win = false;
    const spinner = createSpinner("Checking Your Answer....");
    sleep();
    if (guess > compNum) {
        spinner.error({ text: `Your guess is too ${chalk.bgRedBright("high")} 😒` });
    }
    else if (guess < compNum) {
        spinner.error({ text: `Your guess is too ${chalk.bgRedBright("low")} 😢` });
    }
    else if (guess == compNum) {
        spinner.success({
            text: "You guessed correctly! Give yourself a pat on the back. 🙌🎉🎉",
        });
        win = true;
    }
    return win;
}
async function again() {
    let againAns;
    againAns = await inquirer.prompt({
        name: "again",
        type: "list",
        message: "Do you want to play Another round ?",
        choices: ["Yes", "No"],
        default: "Yes",
    });
    return againAns;
}
async function game() {
    let win = true;
    let lives = 5;
    let againPl = { again: "Yes" };
    console.log(`Starting the game!
    ${chalk.bgRed("Ready")}
    ${chalk.bgYellow("Steady")}
    ${chalk.bgGreen("Go!")}`);
    do {
        win = await processAnswer(await input());
        if (!win && lives > -1) {
            lives--;
            console.log(`You have ${lives} (life/lives) left out of 5\n`);
        }
        if (lives == 0) {
            console.log(`You lost the game 😭😡 \nThe ${chalk.bgGreenBright("secret number")} was ${compNum}.
      `);
            againPl = await again();
            lives = 5;
        }
        if (win) {
            againPl = await again();
        }
    } while (againPl.again != "No");
}
game();
