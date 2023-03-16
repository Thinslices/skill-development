# Use an official PostgreSQL runtime as a parent image
FROM postgres

# Set the environment variables for the PostgreSQL database
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_DB skill-development

# Expose the default PostgreSQL port
EXPOSE 5432

