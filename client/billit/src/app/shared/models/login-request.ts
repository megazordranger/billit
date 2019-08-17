/**
 * Type defintion for login request
 */
export interface LoginRequest {
    /**
     * Username or email of user
     */
    login: string;
    /**
     * User password
     */
    password: string;
}