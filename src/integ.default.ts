import * as cdk from '@aws-cdk/core';
import { BucketNg } from './';

const app = new cdk.App();
const env = {
  region: process.env.CDK_DEFAULT_REGION,
  account: process.env.CDK_DEFAULT_ACCOUNT,
};
const stack = new cdk.Stack(app, 'testing-stack', { env });
const bucket = new BucketNg(stack, 'Bucket', {
  removalPolicy: cdk.RemovalPolicy.DESTROY,
  bucketName: 'neil2020',
});
new cdk.CfnOutput(stack, 'BucketName', { value: bucket.bucketName });