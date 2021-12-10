# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### BucketNg <a name="cdk-s3bucket-ng.BucketNg"></a>

cdk-s3bucket-ng is an AWS CDK construct library that provides a drop-in replacement for the Bucket construct with the capability to remove non-empty S3 buckets.

#### Initializers <a name="cdk-s3bucket-ng.BucketNg.Initializer"></a>

```typescript
import { BucketNg } from 'cdk-s3bucket-ng'

new BucketNg(scope: Construct, id: string, props?: BucketProps)
```

##### `scope`<sup>Required</sup> <a name="cdk-s3bucket-ng.BucketNg.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-s3bucket-ng.BucketNg.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="cdk-s3bucket-ng.BucketNg.parameter.props"></a>

- *Type:* [`@aws-cdk/aws-s3.BucketProps`](#@aws-cdk/aws-s3.BucketProps)

---








