FROM python:3.11-slim

WORKDIR /app

RUN pip install --no-cache-dir poetry

COPY pyproject.toml poetry.lock* ./
RUN poetry config virtualenvs.create false && poetry install --no-root --no-interaction --no-ansi

COPY app ./app

EXPOSE 5000

CMD ["poetry", "run", "gunicorn", "-b", "0.0.0.0:5000", "app.app:app"]
