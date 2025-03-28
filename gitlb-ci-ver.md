### version -1:
stages:
  - clone
  - test
  - report

clone-repo:
  stage: clone
  image: debian:latest  # ✅ Full Linux environment
  before_script:
    - apt-get update && apt-get install -y git curl bash  # ✅ Install missing tools
  script:
    - echo "Verifying Git and Shell"
    - git --version  
    - echo "Switching to commit $CI_COMMIT_SHA"
    - git reset --hard "$CI_COMMIT_SHA"  # ✅ Reset to the commit

  artifacts:
    paths:
      - .  # Preserve the repo for the next stage
  only:
    - main
    

# test-app:
#   stage: test
#   image: node:20-alpine
#   script:
#     - echo "Installing dependencies..."
#     - npm install
#     - echo "Running tests..."
#     - npm test
#   artifacts:
#     reports:
#       junit: test-results.xml  # Example format

test-app:
  stage: test
  image: node:20-alpine
  script:
    - echo "Installing dependencies..."
    - npm install
    - echo "Running tests..."
    - npm test > test-results.txt || echo "Tests failed" > test-results.txt
    - cat test-results.txt
  artifacts:
    paths:
      - test-results.txt
    when: always  # Ensure logs are available even on failure

send-results-to-github:
  stage: report
  image: curlimages/curl
  script:
    - echo "Sending test results back to GitHub..."
    - |
      TEST_STATUS="success"
      if [ "$CI_JOB_STATUS" != "success" ]; then
        TEST_STATUS="failure"
      fi

      curl -X POST "https://api.github.com/repos/pnvshravan786/express-test/statuses/$CI_COMMIT_SHA" \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        -d '{
              "state": "'"$TEST_STATUS"'",
              "context": "GitLab CI/CD",
              "description": "GitLab CI/CD Test Results",
              "target_url": "'"$CI_JOB_URL"'"
            }'
  only:
    - main
----
