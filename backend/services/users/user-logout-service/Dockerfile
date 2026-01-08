FROM python:3.11-slim

WORKDIR /app

COPY pyproject.toml poetry.lock ./

RUN pip install --no-cache-dir poetry \
    && poetry install --no-root --no-interaction --no-ansi

COPY . .

ENV PYTHONPATH=/app

CMD ["python", "app/app.py"]
