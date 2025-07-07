export class BearerTokenProvider {
  private readonly host: string;
  private readonly username: string;
  private readonly password: string;

  /**
   * Creates a new BearerTokenProvider.
   * @param host The host of the database.
   * @param username The username for the database.
   * @param password The password for the database.
   */
  constructor(host: string, username: string, password: string) {
    this.host = host;
    this.username = username;
    this.password = password;
  }

  async getToken(): Promise<string> {
    const response = await fetch(this.host, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' + Buffer.from(`${this.username}:${this.password}`).toString('base64')
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        scope: 'data:read'
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch token: ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
  }
}
