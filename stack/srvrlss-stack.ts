
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AWSResourcesConstructt } from '../lib/MyResourceConstructs'

// creating a stack using MyResourceConstructs construct  
export class MyServerLessStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);

      new AWSResourcesConstructt(this, 'AWSResourcesConstructt', {
        functionName: "MyLambdaFucntion",
        roleName: "LambdaRole",
        tableName: "DBTestTable",
        readCapacity: 20,
        writeCapacity: 20,
        restApiName: "MyRestAPI"
      });


    }
  }