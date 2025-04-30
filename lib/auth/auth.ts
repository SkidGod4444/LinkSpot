import { betterAuth } from "better-auth";
import { expo } from "@better-auth/expo";
 
export const auth = betterAuth({
    plugins: [expo()],
    trustedOrigins: ["myapp://"]
});