import { AuthError } from "firebase/auth";

const ERROR_MAP: Record<string, string> = {
    "auth/email-already-exists": "Email already in use.",
    "auth/invalid-credential": "Incorrect email or password",
    // Add more later
}

export function friendlyAuthError(e: AuthError) {
    return ERROR_MAP[e.code] || `Unknown error: ${e.code}`;
}