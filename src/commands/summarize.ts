import { program } from 'commander';
import { GeminiAPI } from '../gemini-api';
import { GitLabAPI } from '../gitlab-api';

export function setupSummarizeCommand() {
  program
    .command('summarize <mrIid>')
    .description('Generate and update merge request summary')
    .action(async (mrIid) => {
      try {
        const gitlabApi = new GitLabAPI();
        const geminiApi = new GeminiAPI();

        console.log('Fetching merge request changes...');
        // Fetch merge request changes
        const changes = await gitlabApi.getMergeRequestChanges(parseInt(mrIid));

        console.log('Generating summary...');
        // Generate summary using Gemini
        const summary = await geminiApi.generateSummary(changes);

        const summaryJson = JSON.parse(summary);

        console.log('Updating merge request description...');

        // Update merge request description
        await gitlabApi.updateMergeRequestDescription(parseInt(mrIid), summaryJson.description, summaryJson.title);

        console.log(`Summary generated and updated for Merge Request #${mrIid}`);
      } catch (error) {
        console.error('Error in summarize command:', error);
        process.exit(1);
      }
    });
}
