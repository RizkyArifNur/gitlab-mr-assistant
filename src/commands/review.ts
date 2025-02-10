import { program } from 'commander';

export function setupReviewCommand() {
  program
    .command('review <mrIid>')
    .description('Generate AI-powered code review for merge request')
    .action(async (mrIid) => {
      return console.log('This feature is still under development');
    });
}
