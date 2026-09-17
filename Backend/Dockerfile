FROM python:3.11-slim

WORKDIR /app

# Install dependencies first so this layer is cached unless requirements.txt changes
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV FLASK_ENV=production
EXPOSE 5000

# gunicorn instead of `flask run` / app.run(debug=True) — a production WSGI server,
# not the Flask dev server. "app:app" = the `app` object inside app.py.
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "1", "app:app"]
