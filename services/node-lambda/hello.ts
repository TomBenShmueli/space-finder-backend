import {v4} from 'uuid'
import {S3} from 'aws-sdk'

const s3Client = new S3();

async function handler(event:any, context:any) {
    console.log('Incoming request...')
    const buckets = await s3Client.listBuckets().promise();
    return {
        statusCode: 200,
        body: 'Hyena Found!!! \n' + JSON.stringify(buckets.Buckets)
    }
}

export {handler}