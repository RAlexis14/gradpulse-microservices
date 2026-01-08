FROM python:3.12-slim

WORKDIR /app

# Make /app visible for Python imports
ENV PYTHONPATH=/app

COPY pyproject.toml ./

RUN pip install poetry \
    && poetry config virtualenvs.create false \
    && poetry install --no-root --no-interaction --no-ansi

COPY app ./app

EXPOSE 5000

CMD ["python", "app/main.py"]


