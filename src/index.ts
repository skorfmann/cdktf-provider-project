import { JsiiProject, JsiiProjectOptions, Semver } from 'projen';
import { CdktfConfig } from './cdktf-config'

const PROJEN_VERSION = '@0.3.23'

interface CdktfProviderProjectOptions extends JsiiProjectOptions {
  terraformProvider: string;
}

const authorName = 'Sebastian Korfmann'
const authorEmail = 'sebastian@korfmann.net'
const namespace = 'skorfmann'
const githubNamespace = 'skorfmann'

export class CdktfProviderProject extends JsiiProject {

  constructor(options: CdktfProviderProjectOptions) {
    const  { terraformProvider, workflowContainerImage = 'hashicorp/jsii-terraform' } = options;
    const [providerName, providerVersion] = terraformProvider.split('@')

    super({
      ...options,
      workflowContainerImage,
      license: 'MPL-2.0',
      releaseToNpm: true,
      minNodeVersion: '10.17.0',
      devDependencies: {
        'cdktf-provider': Semver.caret('0.0.14'),
        'dot-prop': Semver.caret('5.2.0'),
      },
      workflowBootstrapSteps: [{ run: 'npm install cdktf-provider@latest' }, { run: `npx projen${PROJEN_VERSION}` }, { run: 'yarn install --frozen-lockfile' }],
      name: `@${namespace}/cdktf-provider-${providerName}`,
      description: `Prebuilt ${providerName} Provider for Terraform CDK (cdktf)`,
      keywords: ['cdktf', 'terraform', 'cdk', 'provider', providerName],
      authorName,
      authorEmail,
      repository: `https://github.com/${githubNamespace}/cdktf-provider-${providerName}.git`,
      python: {
        distName: `${namespace}-cdktf-provider-aws`,
        module: `${namespace}_cdktf_provider_aws`,
      },
    });

    new CdktfConfig(this, { terraformProvider, providerName, providerVersion })
  }
}