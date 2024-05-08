import { Construct } from 'constructs';
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
export declare class AWSResourcesConstructt extends Construct {
    constructor(scope: Construct, id: string, props: lambdaProps);
}
