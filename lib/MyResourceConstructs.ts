// import CDK library
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';



// Interface to define property and ensure type safety
export interface lambdaProps {
  functionName: string;
  tags?: Record<string, string>;
  roleName: string;
  tableName: string;
  readCapacity: number;
  writeCapacity: number;
  restApiName: string;
  description?: string;

}

// A construct that defines the resources of AWS such as Dynamodb, Iam role, Lambda function, API Gateway
export class AWSResourcesConstructt extends Construct {
  constructor(scope: Construct, id: string, props: lambdaProps) {
    super(scope, id);
    // DynamoDB Table
    const table = new dynamodb.Table(this, 'MyTableConstruct', {
      tableName: props.tableName,
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      readCapacity: props.readCapacity,
      writeCapacity: props.writeCapacity,
    });

    // Iam Role
    const role = new iam.Role(this, 'RoleConstruct', {
      roleName: props.roleName,
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      path: '/'
    });
    const policyDocument = {
      "Version": "2012-10-17",
      "Statement": [
          {
              "Effect": "Allow",
              "Action": [
                  "dynamodb:DescribeStream",
                  "dynamodb:GetRecords",
                  "dynamodb:GetShardIterator",
                  "dynamodb:ListStreams",
                  "dynamodb:BatchGetItem",
                  "dynamodb:GetItem",
                  "dynamodb:Scan",
                  "dynamodb:Query",
                  "dynamodb:BatchWriteItem",
                  "dynamodb:PutItem",
                  "dynamodb:UpdateItem",
                  "dynamodb:DeleteItem"
              ],
              "Resource": `${table.tableArn}`
          }
      ]
    }
    const customPolicyDocument = iam.PolicyDocument.fromJson(policyDocument);
    const newPolicy = new iam.Policy(this, 'MyNewPolicy', {document: customPolicyDocument});
    newPolicy.attachToRole(role);
    const ManagedPolicy1 = iam.ManagedPolicy.fromManagedPolicyArn(this, "my-managed-policy",'arn:aws:iam::aws:policy/service-role/AWSLambdaRole');
    const ManagedPolicy2 = iam.ManagedPolicy.fromManagedPolicyArn(this, "my-managed-policy2",'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole');
    role.addManagedPolicy(ManagedPolicy1)
    role.addManagedPolicy(ManagedPolicy2)

    // Lamdba Function 
    const lambdaFunction = new lambda.Function(
        this,
        'MyLambda',
        {
          functionName: props.functionName,
          runtime: lambda.Runtime.PYTHON_3_10,
          handler: 'index.handler',
          code: lambda.Code.fromAsset('lambda'),
          environment: {
            TABLE_NAME: "DBTestTable",
          },
          role: role,
        }
      );
    table.grantReadWriteData(lambdaFunction);

    // API Gateway
    const api = new apigateway.RestApi(this, 'MyApiconstruct', {
      restApiName: props.restApiName,
      description: props.description
    });

    const rootResource = api.root.addResource('hello');

    // Adding Methods to Rest API
    const GETmethod = rootResource.addMethod(
      'GET',
      new apigateway.LambdaIntegration(lambdaFunction), 
      { apiKeyRequired: true }
    );
    const POSTmethod = rootResource.addMethod(
      'POST',
      new apigateway.LambdaIntegration(lambdaFunction),
      { apiKeyRequired: true }
    );

    // Creating an API key
    const apiKey = new apigateway.ApiKey(this, 'RestApi-Key');

    const deployment = new apigateway.Deployment(this, 'ApiDeployment', {
      api,
    });

    // Adding a usageplan to secure API
    const usagePlan = api.addUsagePlan('UsagePlan', {
      name: `MyUsagePlan`,
      throttle: {
        rateLimit: 10,
        burstLimit: 2
      },
      apiStages: [
        {
          stage: api.deploymentStage,
        },
      ],
    });

    usagePlan.addApiKey(apiKey);      

}
}