import { Octokit, type RestEndpointMethodTypes } from "@octokit/rest";

export class GitHubService {
  private readonly octokit: Octokit;
  private readonly DEFAULT_PER_PAGE = 100;

  constructor() {
    this.octokit = new Octokit({});
  }

  /**
   * Fetches gists for a specific user
   * @param username GitHub username
   * @returns Promise<RestEndpointMethodTypes["gists"]["listForUser"]["response"]["data"]>
   * @throws {Error} If the API request fails
   */
  async getGists(
    username: string
  ): Promise<
    RestEndpointMethodTypes["gists"]["listForUser"]["response"]["data"]
  > {
    try {
      const response = await this.octokit.rest.gists.listForUser({
        username,
        per_page: this.DEFAULT_PER_PAGE,
      });

      return response.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      throw new Error(`Failed to fetch gists: ${errorMessage}`);
    }
  }

  /**
   * Fetches content of a specific gist
   * @param gistId ID of the gist to fetch
   * @returns Promise<RestEndpointMethodTypes["gists"]["get"]["response"]["data"]>
   */
  async fetchGistContent(
    gistId: string
  ): Promise<
    RestEndpointMethodTypes["gists"]["get"]["response"]["data"] | null
  > {
    try {
      const response = await this.octokit.rest.gists.get({
        gist_id: gistId,
      });

      return response.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      throw new Error(`Failed to fetch gist content: ${errorMessage}`);
    }
  }
}

const githubService = new GitHubService();

export default githubService;
