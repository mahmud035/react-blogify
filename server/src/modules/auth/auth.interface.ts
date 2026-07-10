export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResult {
  user: unknown;
  tokens: AuthTokens;
}
