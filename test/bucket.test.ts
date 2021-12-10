import * as cdk from 'aws-cdk-lib';
import * as assertions from 'aws-cdk-lib/assertions';
import { BucketNg } from '../src/index';


test('test create S3 Bucket', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'testing-stack');
  new BucketNg(stack, 'Bucket');
  assertions.Template.fromStack(stack).findResources('AWS::S3::Bucket');
});

test('test can delete S3 Bucket have custom resource', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'testing-stack-delete');
  new BucketNg(stack, 'Bucket', {
    removalPolicy: cdk.RemovalPolicy.DESTROY,
    bucketName: 'neil2020',
  });
  assertions.Template.fromStack(stack).hasResourceProperties('AWS::S3::Bucket', {
    BucketName: 'neil2020',
  });
  assertions.Template.fromStack(stack).hasResourceProperties('Custom::DeleteS3ObjectProvider', {
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
  assertions.Template.fromStack(stack).hasResourceProperties('AWS::S3::Bucket', {
    BucketName: 'neil2020',
  });
});