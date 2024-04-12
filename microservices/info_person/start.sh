python manage.py makemigrations --noinput
python manage.py migrate --noinput

gunicorn info_person.wsgi:application --bind 0.0.0.0:8000