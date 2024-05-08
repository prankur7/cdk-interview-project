
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AWSResourcesConstructt } from '../lib/MyResourceConstructs'

export interface StackProps{
  FunctionName: string;
  RoleName: string;
  TableName: string;
  ReadCapacity: number;
  WriteCapacity: number;
  RestApiName: string
}


// creating a stack using MyResourceConstructs construct  
export class MyServerLessStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
      super(scope, id);

      new AWSResourcesConstructt(this, 'AWSResourcesConstructt', {
        functionName: props.FunctionName,
        roleName: props.RoleName,
        tableName: props.TableName,
        readCapacity: props.ReadCapacity,
        writeCapacity: props.WriteCapacity,
        restApiName: props.RestApiName
      });


    }
  }