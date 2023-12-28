const readline = require('readline');
const axios = require('axios');
const client = require('discord.js-self-v22');





function centerText(text, width, height) {
  const lines = text.trim().split('\n');
  const maxWidth = lines.reduce((max, line) => Math.max(max, line.trim().length), 0);

  const paddingX = Math.max(0, Math.floor((width - maxWidth) / 2));
  const paddingY = Math.max(0, Math.floor((height - lines.length) / 6));

  return '\n'.repeat(paddingY) + lines.map(line => ' '.repeat(paddingX) + line.trim()).join('\n');
}




  
  function changeTerminalName(newName) {
    process.title = newName;
  }
  changeTerminalName("exarc SB † | made by trixo");
  
  
  async function clearAndShowLoadingAnimation(task, message = 'Updating to the latest API handlers...') {
    clearTerminal();

    // Show loading animation
    const simulateAndUpdate = showLoadingAnimation(async () => {
        // Simulate an asynchronous task (e.g., API request)
        await new Promise((resolve) => setTimeout(resolve, 30000));
    }, message);

    // Execute the loading animation
    await simulateAndUpdate();
}

  
  function clearTerminal() {
    // ANSI escape code to clear the terminal
    process.stdout.write('\x1B[2J\x1B[H'); 
  }
  
  function showLoadingAnimation(task, message = 'Updating to the latest API handlers dont close...') {
    let i = 0;
    const frames = ['-', '\\', '|', '/'];
  
    const loadingInterval = setInterval(() => {
      const frame = frames[i = ++i % frames.length];
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`${message}${frame}`);
    }, 100);
  
    const hideLoadingAnimation = () => {
      clearInterval(loadingInterval);
      readline.cursorTo(process.stdout, 0);
      process.stdout.clearLine();
    };
  
    const simulateAsyncTask = async () => {
      try {
        await task();
        hideLoadingAnimation();
        console.log('\nTask completed...');
      } catch (error) {
        console.error('Error:', error.message);
        hideLoadingAnimation();
      }
    };
  
    return simulateAsyncTask;
  }
  
  function askQuestions(question, callback) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    rl.question(question, function (userInput) {
      rl.close();
      callback(userInput);
    });
  }
  
  function displayMenu() {
    return (
      " \x1b[31mSelect an option:\n" +  // \x1b[31m sets the color to red
      " 1.   Self V1\n" +
      " 2.   Self V2\n" +
      " 3.   Vanity sniper\n" +
      " 4.   Server Nuker\n" +
      " 5.   Username checker and claimer \n" +
      " 6.   Mass DM Friends\n" +
      " 7.   Webhook Spammer\n" +
      " 8.   Credits\x1b[0m"  // Reset color to default
    );
  }
  
  const questions = [
    "Enter your token: ",
    "Enter your user ID: ",
    "Do you want to use a custom RPC? (Y/N): "
  ];
  
  async function runScript() {
    // First, show the loading animation
    await clearAndShowLoadingAnimation();

    // Get the size of the terminal
    const terminalWidth = process.stdout.columns || 80; // Default to 80 if columns is undefined
    const terminalHeight = process.stdout.rows || 20; // Default to 24 if rows is undefined
  
    // Updated ASCII art (ensure it fits within the terminal dimensions)
    const asciiArt = `
      ███████ ██   ██  █████  ██████   ██████ 
  ██       ██ ██  ██   ██ ██   ██ ██      
  █████     ███   ███████ ██████  ██      
  ██       ██ ██  ██   ██ ██   ██ ██      
  ███████ ██   ██ ██   ██ ██   ██  ██████ 
  `;
  
    clearTerminal();
    console.log('\x1b[31m%s\x1b[0m', centerText(asciiArt, terminalWidth, terminalHeight));
    console.log(displayMenu());

    // Keep the script running for 10 seconds (you can adjust the duration)
    setTimeout(() => {

        process.exit(100000); // Exit after 10 seconds
    }, 100000); // 10 seconds delay
}

// Start the script
runScript();


