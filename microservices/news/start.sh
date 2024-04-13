python manage.py makemigrations --noinput
python manage.py migrate --noinput

gunicorn news.wsgi:application --bind 0.0.0.0:8000 --daemon