cd ../..

for /F "delims== tokens=1,* eol=#" %%i in (.env.development) do set %%i=%%~j

python %POLYLK_AUTHORIZATION_PATH%manage.py runserver %POLYLK_AUTHORIZATION_HOSTNAME%:%POLYLK_AUTHORIZATION_PORT%