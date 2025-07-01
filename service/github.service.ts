import { Octokit, type RestEndpointMethodTypes } from "@octokit/rest";

export type GistListResponse =
  RestEndpointMethodTypes["gists"]["listForUser"]["response"]["data"];
export type GistResponse =
  RestEndpointMethodTypes["gists"]["get"]["response"]["data"];
export type RepositoryContentResponse =
  RestEndpointMethodTypes["repos"]["getContent"]["response"]["data"];

const octokit = new Octokit({
  auth: "not so easy bro",
});

const DEFAULT_PER_PAGE = 100;

/**
 * Fetches public gists for a specific user
 * @param username GitHub username
 * @returns Promise<GistListResponse> Only public gists
 * @throws {Error} If the API request fails
 */
export async function getGists(username: string): Promise<GistListResponse> {
  try {
    const response = await octokit.rest.gists.listForUser({
      username,
      per_page: DEFAULT_PER_PAGE,
    });

    // Filter to only include public gists
    const publicGists = response.data.filter((gist) => gist.public === true);

    return publicGists;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Failed to fetch gists: ${errorMessage}`);
  }
}

/**
 * Fetches content of a specific gist
 * @param gistId ID of the gist to fetch
 * @returns Promise<GistResponse | null>
 */
export async function fetchGistContent(
  gistId: string
): Promise<GistResponse | null> {
  try {
    const response = await octokit.rest.gists.get({
      gist_id: gistId,
    });

    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Failed to fetch gist content: ${errorMessage}`);
  }
}

/**
 * Fetches repository contents
 * @param owner Repository owner
 * @param repo Repository name
 * @param path Path within the repository (optional)
 * @returns Promise with repository contents
 */
export async function getRepositoryContents(
  owner: string,
  repo: string,
  path = ""
): Promise<RepositoryContentResponse> {
  try {
    const response = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
    });

    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Failed to fetch repository contents: ${errorMessage}`);
  }
}

/**
 * Fetches raw file content from a repository
 * @param owner Repository owner
 * @param repo Repository name
 * @param path File path
 * @returns Promise<string> File content as string
 */
export async function getFileContent(
  owner: string,
  repo: string,
  path: string
): Promise<string> {
  try {
    const response = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
      mediaType: {
        format: "raw",
      },
    });

    // When requesting raw format, the response.data is a string
    return response.data as unknown as string;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Failed to fetch file content: ${errorMessage}`);
  }
}

// Grouped export for convenience
export const githubService = {
  getGists,
  fetchGistContent,
  getRepositoryContents,
  getFileContent,
} as const;

// Default export for backward compatibility
export default githubService;
