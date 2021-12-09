import * as cdk from 'aws-cdk-lib';
import { BucketNg } from '../src/index';
import '@aws-cdk/assert/jest';


test('test create S3 Bucket', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'testing-stack');
  new BucketNg(stack, 'Bucket');
  expect(stack).toHaveResource('AWS::S3::Bucket');
});

test('test can delete S3 Bucket have custom resource', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'testing-stack-delete');
  new BucketNg(stack, 'Bucket', {
    removalPolicy: cdk.RemovalPolicy.DESTROY,
    bucketName: 'neil2020',
  });
  expect(stack).toHaveResource('AWS::S3::Bucket', {
    BucketName: 'neil2020',
  });
  expect(stack).toHaveResource('Custom::DeleteS3ObjectProvider', {
    Bucket: {
      Ref: 'Bucket83908E77',
    },
  });
});

test('test can delete S3 Bucket not have custom resource', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'testing-stack-no-delete');
  new BucketNg(stack, 'Bucket', {
    removalPolicy: cdk.RemovalPolicy.RETAIN,
    bucketName: 'neil2020',
  });
  expect(stack).toHaveResource('AWS::S3::Bucket', {
    BucketName: 'neil2020',
  });
});