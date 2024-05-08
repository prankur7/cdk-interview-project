#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MyServerLessStack } from '../stack/srvrlss-stack'

// cdk app encapuslating a stack  
const app = new cdk.App();
new MyServerLessStack(app, 'MyServerLessStack', {
    FunctionName: "MyLambdaFucntion",
    RoleName: "LambdaRole",
    TableName: "DBTestTable",
    ReadCapacity: 20,
    WriteCapacity: 20,
    RestApiName: "MyRestAPI"
}
);

app.synth()