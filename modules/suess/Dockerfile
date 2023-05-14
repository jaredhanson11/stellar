FROM jaredhanson11/serverbase

# Pickup security patches
RUN apt-get update && apt-get upgrade -y

# Install required packages
COPY requirements.txt ./requirements.txt
RUN apt-get install -y libpq-dev python3-dev gcc \
    && pip install --no-cache -r requirements.txt \
    && rm requirements.txt

# Copy server code to the /app/ dir
COPY ./config.py ./
COPY ./server ./server

ENV APP_CONFIG /app/config.py
