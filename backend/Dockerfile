FROM python:3.11-slim

WORKDIR /app

# copy backend code
COPY . .

# install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# start server
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "10000"]