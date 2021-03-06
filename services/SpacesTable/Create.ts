import { DynamoDB } from "aws-sdk";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { v4 } from "uuid";

const dbClient = new DynamoDB.DocumentClient();

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  const result: APIGatewayProxyResult = {
    statusCode: 200,
    body: "Hello from DטnamoDb",
  };

  const item =
    typeof event.body == "object" ? event.body : JSON.parse(event.body);
  item.spaceId = v4();

  try {
    await dbClient
      .put({
        TableName: "SpacesTable",
        Item: item,
      })
      .promise();
  } catch (error) {
    result.body = "error";
  }

  result.body = "Item created with ID: " + JSON.stringify(item.spaceId);

  return result;
}

export { handler };
