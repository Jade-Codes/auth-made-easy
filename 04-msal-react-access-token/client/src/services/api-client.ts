import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../auth/auth-config";
import axios from "axios";

const msalInstance = new PublicClientApplication(msalConfig);

const API_URL = "http://localhost:8000/api";

const apiClient = axios.create({
    baseURL: API_URL,
});

msalInstance.initialize().then(() => {
    apiClient.interceptors.request.use(async (config) => {
        const account = msalInstance.getActiveAccount();
        if (account) {
            const tokenResponse = await msalInstance.acquireTokenSilent({
                account: account,
                scopes: ["api://edutaskhub-be/access_as_user"],
            });
            config.headers.Authorization = `Bearer ${tokenResponse.accessToken}`;
        }
        return config;
    });
});

export default apiClient;