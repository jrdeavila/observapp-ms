FROM python:3.11.7-slim


# Set the working directory in the container

WORKDIR /app


# Copy the current directory contents into the container at /app

COPY app /app


# Install any needed packages specified in requirements.txt

RUN pip install --no-cache-dir -r requirements.txt


# Make port 80 available to the world outside this container

CMD ["python", "main.py"]



EXPOSE 8000