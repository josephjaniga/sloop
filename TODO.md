# TODOS

2 - Dealing with the `aws-sdk` dependency
  - Options:
    - remove the credential passing to AWS in the sloop SDK? and assume this library will be used from within an AWS Lambda function
    - which will not need to pass or know credentials, as they will be assumed to be available and sourced from the lambda function
    - alternatively move this up with dependency injection?
      - allows the SDK users to pass a mock for testing
      - allows scripting with the SDK because users could pass their own credentials 
      - should it default in the Sloop constructor to the AWS SDK and reading credentials with `fromINI` from the process env `AWS_PROFILE`
      - for AWS Lambda no credentials are necessary?

3 - Hardcoded "ID" and "GUID"
  - I need to remove all references to the uniqueId
  - instead, every record and collection will be required to have an integer ID

4 - Testing for Update
  - need to test for update

5 - Bug with the `readline` api
  - it is preventing the CLI from closing the process after it is complete
  - the problem exists (readline) only in the teardown.js file
  - but the issues occurs even when calling other methods
  - the issue persists so long as the `teardown.js` is imported anywhere in the application

## DONE 

1 - Move the logic into helpers... and then source that helper logic into the actions for the CLI and the SDK
- meaning share the logic used in both the CLI and the SDK so they behave similarly
- start with the Create Logic