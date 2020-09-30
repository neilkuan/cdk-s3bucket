import { App, Stack, CfnOutput, RemovalPolicy }  from '@aws-cdk/core';
import { Bucket } from './';

const app = new App();
const env = {
  region: process.env.CDK_DEFAULT_REGION,
  account: process.env.CDK_DEFAULT_ACCOUNT,
};
const stack = new Stack(app, 'testing-stack', { env });
const bucket = new Bucket(stack, 'Bucket',{
  removalPolicy: RemovalPolicy.DESTROY,
  bucketName: 'neil2020',
});
new CfnOutput(stack, 'BucketName', { value: bucket.s3Bucket.bucketName }); 