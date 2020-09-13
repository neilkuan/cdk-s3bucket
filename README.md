[![NPM version](https://badge.fury.io/js/cdk-spot-one.svg)](https://badge.fury.io/js/cdk-s3bucket)
[![PyPI version](https://badge.fury.io/py/cdk-spot-one.svg)](https://badge.fury.io/py/cdk-s3bucket)
![Release](https://github.com/guan840912/cdk-s3bucket/workflows/Release/badge.svg)

# cdk-s3bucket
Create a S3 Bucket that can be deleted completely.

# Why

Sometime we just do some lab , create a S3 Bucket. 
Want to destroy resource , after Lab finished. 
But We forget delete Object in S3 Bucket first , so destroy will fail.

`cdk-s3bucket`  can help delete object when cdk destroy , just add `removalPolicy: RemovalPolicy.DESTROY`  property .

You never have to delete objects yourself, and the usage is almost the same as the native @aws-cdk/aws-s3.Bucket

## Now Try It !!!
# Sample

```ts
import { App, Stack, CfnOutput, RemovalPolicy }  from '@aws-cdk/core';
import { Bucket } from 'cdk-s3bucket';

// Create a S3 , add props "removalPolicy: RemovalPolicy.DESTROY".
const bucket = new Bucket(stack, 'Bucket',{
  removalPolicy: RemovalPolicy.DESTROY,
});

// Get S3 Resource via bucket.s3Bucket ...
new CfnOutput(stack, 'BucketName', { value: bucket.s3Bucket.bucketName }); 
```

### To deploy
```bash
cdk deploy --require-approval never
```
### To destroy
```bash
cdk destroy -f
```