import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cr from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
/**
 * cdk-s3bucket-ng is an AWS CDK construct library that provides a drop-in replacement for the Bucket construct with the capability to remove non-empty S3 buckets.
 */
export class BucketNg extends s3.Bucket {
  constructor(scope: Construct, id: string, props: s3.BucketProps={} ) {
    super(scope, id, props);

    // Delete S3 Object CustomResource
    if (props.removalPolicy === cdk.RemovalPolicy.DESTROY) {
      const onEvent = new lambda.Function(this, 'onEventHandler', {
        runtime: lambda.Runtime.PYTHON_3_8,
        code: lambda.Code.fromAsset(path.join(__dirname, '../custom-resource-handler')),
        handler: 'index.on_event',
      });

      const deleteS3ObjectProvider = new cr.Provider(this, 'deleteS3ObjectProvider', {
        onEventHandler: onEvent,
        logRetention: logs.RetentionDays.ONE_DAY,
      });

      const CRdeleteS3ObjectProvider = new cdk.CustomResource(this, 'CRdeleteS3ObjectProvider', {
        resourceType: 'Custom::DeleteS3ObjectProvider',
        serviceToken: deleteS3ObjectProvider.serviceToken,
        properties: {
          Bucket: this.bucketName,
        },
      });

      CRdeleteS3ObjectProvider.node.addDependency(this);

      this.grantDelete(onEvent);
      this.grantReadWrite(onEvent);
    }
  }
}