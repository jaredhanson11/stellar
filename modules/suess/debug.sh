# Run this from the root of the repo and ensure your .env file exists
FLASK_APP=$PWD/modules/suess/server/ APP_CONFIG=$PWD/modules/suess/config.py env $(cat $PWD/modules/suess/.env) flask run --host 0.0.0.0
