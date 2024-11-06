
from logging.config import dictConfig
from fastapi import FastAPI, Security
from fastapi.middleware.cors import CORSMiddleware
from api.auth import azure_scheme

from api.students import students

app = app = FastAPI(
    swagger_ui_oauth2_redirect_url='/oauth2-redirect',
    swagger_ui_init_oauth={
        'usePkceWithAuthorizationCodeGrant': True,
        'clientId': '5d31bed7-2372-4e43-9365-1706ff6601de',
        'scopes': 'api://edutaskhub-be/access_as_user',
    },
)

app.add_middleware(CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"])

app.include_router(students.router)