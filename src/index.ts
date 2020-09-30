import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as lambda from '@aws-cdk/aws-lambda';
import * as logs from '@aws-cdk/aws-logs';
import * as cr from '@aws-cdk/custom-resources';
import * as path from 'path';

export class Bucket extends cdk.Construct {
  /**
   * reture S3 bucket self
   */
  readonly s3Bucket: s3.IBucket;

  constructor(scope: cdk.Construct, id: string, props?: s3.BucketProps ) {
    super(scope, id);

    let BucketNextGenerationProps = props;
    // S3 Bucket 
    this.s3Bucket = new s3.Bucket(this, 'Bucket', BucketNextGenerationProps);

    // Delete S3 Object CustomResource
    if(props?.removalPolicy === cdk.RemovalPolicy.DESTROY){
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
        serviceToken: deleteS3ObjectProvider.serviceToken,
        properties: {
          Bucket: this.s3Bucket.bucketName,
        },
      });
  
      CRdeleteS3ObjectProvider.node.addDependency(this.s3Bucket)
  
      this.s3Bucket.grantDelete(onEvent);
      this.s3Bucket.grantReadWrite(onEvent);
    }
  }
}