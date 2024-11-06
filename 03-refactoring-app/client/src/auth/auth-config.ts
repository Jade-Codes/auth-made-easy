import { LogLevel } from '@azure/msal-browser';

export const msalConfig = {
    auth: {
        clientId: '5d31bed7-2372-4e43-9365-1706ff6601de', 
        authority: 'https://login.microsoftonline.com/3f63b506-db59-465e-8d23-78c6cd72c13b/', 
        redirectUri: '/', 
        postLogoutRedirectUri: '/', 
        navigateToLoginRequestUrl: false, 
    },
    cache: {
        cacheLocation: 'sessionStorage', 
        storeAuthStateInCookie: false, 
    },
    system: {
        loggerOptions: {
            loggerCallback: (level: any, message: any, containsPii: any) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};


export const loginRequest = {
    scopes: [],
};