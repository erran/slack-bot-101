const { App } = require('@slack/bolt');

// Use `. .env` before running node to export the appropriate environment variables.
const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

const mooseFacts = [
  'Moose are huge.',
  'Moose eat a lot.',
  'Their antlers are used for fighting.',
  'Moose shed their antlers every year.',
  'The plural of Moose is still Moose!',
  'One Moose!',
  'Antlers are heavy. ',
  'Moose babies need help from their mom.',
  'Moose are great swimmers.',
];

// Listen for slack commands.
app.command('/moosefacts', async ({ command, ack, say }) => {
  // acknowledge we received the message from slack
  await ack();

  if (command.text) {
    if (command.text === "help") {
      await say(`/moosefacts help \`Display this message.\`\n/moosefacts \`Display some dope facts about Moose!\`.`);
      return
    } else {
      await say(`You said ${command.text}.`);
      return
    }
  }

  const mooseFact = mooseFacts[Math.floor(Math.random() * mooseFacts.length)];
  await say(mooseFact);
});

(async () => {
  // Start the app
  const appPort = process.env.PORT || 3000;
  await app.start(appPort);

  console.log(`⚡️ Bolt app is running on ${appPort}!`);
})();
