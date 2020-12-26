const { AwsCdkConstructLibrary } = require('projen');

const PROJECT_NAME = 'cdk-s3bucket-ng';
const PROJECT_DESCRIPTION = 'cdk-s3bucket-ng is an AWS CDK construct library that provides a drop-in replacement for the Bucket construct with the capability to remove non-empty S3 buckets.';
const AUTOMATION_TOKEN = 'AUTOMATION_GITHUB_TOKEN';
const CDK_VERSION = '1.80.0';

const project = new AwsCdkConstructLibrary({
  name: PROJECT_NAME,
  description: PROJECT_DESCRIPTION,
  repository: 'https://github.com/guan840912/cdk-s3bucket.git',
  authorName: 'Neil Kuan',
  authorEmail: 'guan840912@gmail.com',
  keywords: ['aws', 'cdk', 's3'],
  dependabot: false,
  catalog: {
    twitter: 'neil_kuan',
    announce: false,
  },
  projenUpgradeSecret: 'AUTOMATION_GITHUB_TOKEN',
  stability: 'experimental',
  autoReleaseSchedule: 'never',
  cdkVersion: CDK_VERSION,
  compat: false,
  cdkDependencies: [
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-s3',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-logs',
    '@aws-cdk/core',
    '@aws-cdk/custom-resources',
  ],
  python: {
    distName: 'cdk-s3bucket-ng',
    module: 'cdk_s3bucket_ng',
  },
});

// create a custom projen and yarn upgrade workflow
workflow = project.github.addWorkflow('ProjenYarnUpgrade');

workflow.on({
  schedule: [{
    cron: '11 0 * * *',
  }], // 0:11am every day
  workflow_dispatch: {}, // allow manual triggering
});

workflow.addJobs({
  upgrade: {
    'runs-on': 'ubuntu-latest',
    'steps': [
      { uses: 'actions/checkout@v2' },
      {
        uses: 'actions/setup-node@v1',
        with: {
          'node-version': '10.17.0',
        },
      },
      { run: 'yarn upgrade' },
      { run: 'yarn projen:upgrade' },
      // submit a PR
      {
        name: 'Create Pull Request',
        uses: 'peter-evans/create-pull-request@v3',
        with: {
          'token': '${{ secrets.' + AUTOMATION_TOKEN + ' }}',
          'commit-message': 'chore: upgrade projen',
          'branch': 'auto/projen-upgrade',
          'title': 'chore: upgrade projen and yarn',
          'body': 'This PR upgrades projen and yarn upgrade to the latest version',
          'labels': 'auto-merge',
        },
      },
    ],
  },
});

const common_exclude = ['cdk.out', 'cdk.context.json', 'image', 'yarn-error.log', 'coverage'];
project.gitignore.exclude(...common_exclude);

project.npmignore.exclude(...common_exclude);
project.synth();