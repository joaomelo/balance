/* 
  "start": "npm run dev:local",
    "dev:local": "concurrently -n \"firebs,server\" -c \"bgMagenta.bold,bgGreen.bold\" \"firebase emulators:start\" \"npm:dev:local:server\"",
      "dev:local:server": "rimraf dist/* && webpack serve --config webpack.config.js --env devLocal",
*/

const fireEmulators = {
  name: "emulators",
  styles: ["bgYellow", "whiteBright"],
  command: "firebase emulators:start",
};

const serverLocal = {
  name: "server-local",
  relay: [
    { name: "clean", command: "rimraf dist/*" },
    {
      name: "webpack",
      command: "webpack serve --config webpack.config.js --env devLocal",
    },
  ],
};

export const devLocal = {
  name: "dev-local",
  race: [fireEmulators, serverLocal],
};
