import { Bucket } from '../src/index';
import { App, Stack, RemovalPolicy } from '@aws-cdk/core';
import '@aws-cdk/assert/jest';


test('test create S3 Bucket', () => {
  const app = new App();
  const stack = new Stack(app, 'testing-stack');
  new Bucket(stack, 'Bucket');
  expect(stack).toHaveResource('AWS::S3::Bucket')
});

test('test can delete S3 Bucket have custom resource', () => {
  const app = new App();
  const stack = new Stack(app, 'testing-stack-delete');
  new Bucket(stack, 'Bucket',{
    removalPolicy: RemovalPolicy.DESTROY,
    bucketName: 'neil2020',
  });
  expect(stack).toHaveResource('AWS::S3::Bucket',{
    BucketName: 'neil2020',
  })
  expect(stack).toHaveResource('AWS::CloudFormation::CustomResource',{
    Bucket: {
      Ref: 'BucketD7FEB781',
    },
  })
});