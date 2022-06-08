import {DynamoDB, TemporaryCredentials} from 'aws-sdk'
import {APIGatewayProxyEvent,APIGatewayProxyResult,Context} from 'aws-lambda'
import { v4 } from 'uuid';

const dbClient = new DynamoDB.DocumentClient(); 

async function handler(event : APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> {

    const result : APIGatewayProxyResult = {
        statusCode : 200,
        body : "DynamoDB promise result."
    }

    const item = {
        spaceId : v4(),
    }

    // const item = typeof event.body == 'object' ? event.body : JSON.parse(event.body); // generate body
    // item.spaceId = v4(); // add UUID 

    try {
        await dbClient.put({
            TableName : 'SpacesTable',
            Item: item
        }).promise()
    } catch (err) {
        result.body = 'Internal Server Error! Save failed.'        
    }
    result.body = JSON.stringify('New item created, ID:' + item.spaceId)
    return result;

}

export { handler }