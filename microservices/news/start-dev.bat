cd ../..

for /F "delims== tokens=1,* eol=#" %%i in (.env.development) do set %%i=%%~j

python %POLYLK_NEWS_PATH%manage.py runserver %POLYLK_NEWS_HOSTNAME%:%POLYLK_NEWS_PORT%