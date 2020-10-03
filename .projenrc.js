const { ConstructLibraryAws } = require('projen');

const PROJECT_NAME = 'cdk-s3bucket-ng';
const PROJECT_DESCRIPTION = 'cdk-s3bucket-ng is an AWS CDK construct library that provides a drop-in replacement for the Bucket construct with the capability to remove non-empty S3 buckets.';

const project = new ConstructLibraryAws({
  name: PROJECT_NAME,
  description: PROJECT_DESCRIPTION,
  repository: 'https://github.com/guan840912/cdk-s3bucket.git',
  authorName: 'Neil Kuan',
  authorEmail: 'guan840912@gmail.com',
  keywords: ['aws', 'cdk', 's3'],
  catalog: {
    twitter: 'neil_kuan',
    announce: false,
  },
  projenUpgradeSecret: 'AUTOMATION_GITHUB_TOKEN',
  stability: 'experimental',
  autoReleaseSchedule: 'never',
  cdkVersion: '1.66.0',
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

project.mergify.addRule({
  name: 'Merge approved pull requests with auto-merge label if CI passes',
  conditions: [
    '#approved-reviews-by>=1',
    'status-success=build',
    'label=auto-merge',
    'label!=do-not-merge',
    'label!=work-in-progress',
  ],
  actions: {
    merge: {
      method: 'merge',
      commit_message: 'title+body',
    },
  },
});

const common_exclude = ['cdk.out', 'cdk.context.json', 'image', 'yarn-error.log','coverage'];
project.gitignore.exclude(...common_exclude);

project.npmignore.exclude(...common_exclude);
project.synth();