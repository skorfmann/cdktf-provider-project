const { TypeScriptProject, Semver } = require('projen');

const project = new TypeScriptProject({
  name: "cdktf-provider",
  authorName: "Sebastian Korfmann",
  authorEmail: "sebastian@korfmann.net",
  repository: "https://github.com/skorfmann/cdktf-provider.git",
  peerDependencies: {
    projen: Semver.caret('0.3.23')
  },
  license: "MPL-2.0",
  releaseToNpm: true,
  minNodeVersion: '10.17.0',
  compileBeforeTest: true,
  scripts: {
    'eslint:fix': "eslint . --ext .ts --fix"
  }
});

project.synth();
