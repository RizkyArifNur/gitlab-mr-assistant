# GitLab Merge Request Assistant

## Prerequisites

- Node.js (v16+)
- GitLab Personal Access Token
- Gemini API Key

## Installation

### Global Installation (Recommended for CI/CD)

```bash
npm install -g gitlab-mr-assistant
```

## Local Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your configurations:
   ```env
   GITLAB_TOKEN=your_gitlab_token
   GITLAB_API_URL=https://gitlab.com/api/v4
   GITLAB_PROJECT_ID=your_project_id
   GOOGLE_API_KEY=your_google_api_key
   ```

## Usage

### Command Line

After global installation:

```bash
gitlab-mr-assistant summarize <merge_request_iid>
```

### In GitLab CI/CD Pipeline

Add to `.gitlab-ci.yml`:

```yaml
image: node:18
stages:
  - review

summarize-mr:
  stage: review
  before_script:
    - npm install -g gitlab-mr-assistant
  script:
    - export GITLAB_TOKEN=${GITLAB_TOKEN}
    - export GEMINI_API_KEY=${GEMINI_API_KEY}
    - export GITLAB_PROJECT_ID=${CI_PROJECT_ID}
    - gitlab-mr-assistant summarize $CI_MERGE_REQUEST_IID
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
  when: manual
```

Make sure to set `GITLAB_TOKEN` and `GEMINI_API_KEY` as CI/CD variables in your GitLab project settings.

## Commands

- `summarize <merge_request_iid>`: Generate AI summary of merge request changes
