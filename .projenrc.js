const { AwsCdkConstructLibrary, DependenciesUpgradeMechanism } = require('projen');

const PROJECT_NAME = 'cdk-s3bucket-ng';
const PROJECT_DESCRIPTION = 'cdk-s3bucket-ng is an AWS CDK construct library that provides a drop-in replacement for the Bucket construct with the capability to remove non-empty S3 buckets.';
const CDK_VERSION = '1.121.0';

const project = new AwsCdkConstructLibrary({
  name: PROJECT_NAME,
  description: PROJECT_DESCRIPTION,
  repository: 'https://github.com/neilkuan/cdk-s3bucket.git',
  authorName: 'Neil Kuan',
  authorEmail: 'guan840912@gmail.com',
  keywords: ['aws', 'cdk', 's3'],
  catalog: {
    twitter: 'neil_kuan',
    announce: false,
  },
  defaultReleaseBranch: 'master',
  stability: 'experimental',
  cdkVersion: CDK_VERSION,
  compat: false,
  minNodeVersion: '12.19.0',
  cdkDependencies: [
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-s3',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-logs',
    '@aws-cdk/core',
    '@aws-cdk/custom-resources',
  ],
  autoDetectBin: false,
  depsUpgrade: DependenciesUpgradeMechanism.githubWorkflow({
    workflowOptions: {
      labels: ['auto-approve'],
      secret: 'AUTOMATION_GITHUB_TOKEN',
    },
  }),
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['neilkuan'],
  },
  python: {
    distName: 'cdk-s3bucket-ng',
    module: 'cdk_s3bucket_ng',
  },
  rebuildBot: false,
});

project.package.addField('resolutions', {
  'trim-newlines': '3.0.1',
});

const common_exclude = ['cdk.out', 'cdk.context.json', 'image', 'yarn-error.log', 'coverage'];
project.gitignore.exclude(...common_exclude);
project.npmignore.exclude(...common_exclude);
project.synth();