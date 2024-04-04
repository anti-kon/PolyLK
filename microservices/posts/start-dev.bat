cd ../..

for /F "delims== tokens=1,* eol=#" %%i in (.env.development) do set %%i=%%~j

python %POLYLK_POSTS_PATH%manage.py runserver %POLYLK_POSTS_HOSTNAME%:%POLYLK_POSTS_PORT%