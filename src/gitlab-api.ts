import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export class GitLabAPI {
  private token: string;
  private apiUrl: string;
  private projectId: string;

  constructor() {
    this.token = process.env.GITLAB_TOKEN || '';
    this.apiUrl = process.env.GITLAB_API_URL || 'https://gitlab.com/api/v4';
    this.projectId = process.env.GITLAB_PROJECT_ID || '';

    if (!this.token) {
      throw new Error('GITLAB_TOKEN is not set');
    }

    if (!this.projectId) {
      throw new Error('GITLAB_PROJECT_ID is not set');
    }
  }

  async getMergeRequestChanges(mrIid: number) {
    try {
      const response = await axios.get(`${this.apiUrl}/projects/${this.projectId}/merge_requests/${mrIid}/changes`, {
        headers: { 'PRIVATE-TOKEN': this.token },
      });
      return response.data.changes;
    } catch (error) {
      console.error('Error fetching merge request changes:', error);
      throw error;
    }
  }

  async updateMergeRequestDescription(mrIid: number, newDescription: string, newTitle: string) {
    try {
      await axios.put(
        `${this.apiUrl}/projects/${this.projectId}/merge_requests/${mrIid}`,
        { description: newDescription, title: newTitle },
        { headers: { 'PRIVATE-TOKEN': this.token } },
      );
    } catch (error) {
      console.error('Error updating merge request description:', error);
      throw error;
    }
  }

  async addMergeRequestComment(mrIid: number, comment: string) {
    try {
      await axios.post(
        `${this.apiUrl}/projects/${this.projectId}/merge_requests/${mrIid}/discussions`,
        { body: comment },
        { headers: { 'PRIVATE-TOKEN': this.token } },
      );
    } catch (error) {
      console.error('Error adding merge request comment:', error);
      throw error;
    }
  }
}
