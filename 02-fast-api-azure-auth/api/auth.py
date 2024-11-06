from fastapi_azure_auth import SingleTenantAzureAuthorizationCodeBearer


azure_scheme = SingleTenantAzureAuthorizationCodeBearer(
    app_client_id='b295d89d-31ac-4741-95ce-2e9bcd58ddda',
    tenant_id='3f63b506-db59-465e-8d23-78c6cd72c13b',
    scopes={'api://edutaskhub-be/access_as_user':'access_as_user'},
    allow_guest_users=True
)