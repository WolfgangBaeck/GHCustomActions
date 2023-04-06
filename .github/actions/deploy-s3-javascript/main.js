const core = require('@actions/core');
//const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {

    // get input values
    const bucket = core.getInput('bucket', { required: true});
    const bucketRegion = core.getInput('bucket-region', { required: true});
    const distFolder = core.getInput('dist-filder', { required: true});

    // upload files
    const s3Uri = `s3://${bucket}`;
    // provide AWS environment variables for security via the env variable on the step

    exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

    const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
    core.setOutput('website-url', websiteUrl); 
}

run();