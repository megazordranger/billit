/**
 * Type defintion for register request
 */
export interface RegisterRequest {
    /**
     * The username of user
     */
    username: string;
    /**
     * The email of user
     */
    email: string;
    /**
     * The password of user
     */
    password: string;
    /**
     * The confirmation password of user
     */
    confirmPassword: string;
}
  