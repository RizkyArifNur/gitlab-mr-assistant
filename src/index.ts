#!/usr/bin/env node
import { program } from 'commander';
import { setupReviewCommand } from './commands/review';
import { setupSummarizeCommand } from './commands/summarize';

// Setup CLI commands
setupSummarizeCommand();
setupReviewCommand();

// Parse CLI arguments
program.parse(process.argv);
