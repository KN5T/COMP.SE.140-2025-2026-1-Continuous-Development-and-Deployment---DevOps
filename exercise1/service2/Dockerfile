FROM python:3.9-slim
WORKDIR /app/service2
COPY requirements.txt /app/service2
RUN pip install -r requirements.txt
COPY . /app/service2
EXPOSE 5000
CMD ["python", "app.py"]