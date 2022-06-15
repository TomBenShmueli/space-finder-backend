import { v4 } from "uuid";
import { S3 } from "aws-sdk";

async function handler(event: any, context: any) {
  try {
    const s3Client = new S3();

    console.log("Incoming request...");
    const buckets = await s3Client.listBuckets().promise();
    return {
      statusCode: 200,
      body: "S3 Buckets" + JSON.stringify(buckets.Buckets),
    };
  } catch (error) {
    return {};
  }
}

export { handler };
