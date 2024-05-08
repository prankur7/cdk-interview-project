#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MyServerLessStack } from '../stack/srvrlss-stack'

// cdk app encapuslating a stack  
const app = new cdk.App();
new MyServerLessStack(app, 'MyServerLessStack', {}
);

app.synth()