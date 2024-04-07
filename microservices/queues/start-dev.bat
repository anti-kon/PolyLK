cd ../..

for /F "delims== tokens=1,* eol=#" %%i in (.env.development) do set %%i=%%~j

python %POLYLK_QUEUES_PATH%manage.py runserver %POLYLK_QUEUES_HOSTNAME%:%POLYLK_QUEUES_PORT%