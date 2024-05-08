# cdk-interview-project
The AWS-CDK construct repository for serverless services, IAM, DynamoDB, Lambda, and Api Gateway.

# Welcome to CDK TypeScript project

This is a project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template


AWS CDK (Cloud Development Kit) is an open-source framework that enables you to define cloud infrastructure in code. It provides a consistent and repeatable way to build and deploy cloud applications.
# Step 1: Install AWS CDK
To get started with AWS CDK, you need to install it on your machine. You can do this by running the following command:

* `npm install -g aws-cdk` 

# Step 2: Create a new AWS CDK project
Create a new directory for your project and navigate to it in your terminal. Then, run the following command to create a new AWS CDK project:

* `cdk init --language=typescript`

This will create a new AWS CDK project with the basic structure and configuration files.

# Step 3: Define your infrastructure
In the lib directory, you'll find a file called stack.ts. This is where you define your infrastructure using AWS CDK constructs. For example:

* import * as cdk from 'aws-cdk-lib';
* import * as ec2 from 'aws-cdk-lib/aws-ec2';
*
* export class MyStack extends cdk.Stack {
*  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
*    super(scope, id, props);
*
*    const vpc = new ec2.Vpc(this, 'MyVpc');
*    const instance = new ec2.Instance(this, 'MyInstance', {
*      vpc,
*      instanceType: ec2.InstanceType.T2_MICRO,
*    });
*  }
* }


# Step 4: Synthesize your infrastructure
Run the following command to synthesize your infrastructure:

* `cdk synth`

# Step 5: Deploy your infrastructure
Run the following command to deploy your infrastructure:

* `cdk deploy`

# Step 6: Verify your infrastructure
Once the deployment is complete, you can verify that your resources have been created successfully by checking the AWS Management Console or using the AWS CLI.