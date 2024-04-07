cd ../..

for /F "delims== tokens=1,* eol=#" %%i in (.env.development) do set %%i=%%~j

python %POLYLK_INFO_PERSON_PATH%manage.py runserver %POLYLK_INFO_PERSON_HOSTNAME%:%POLYLK_INFO_PERSON_PORT%