/**
 * Type defintion for social login request
 */
export interface SocialLoginRequest {
    /**
     * The username of user from google
     */
    username: string;
    /**
     * The email of user from google
     */
    email: string;
}