# WHRB CM

## Documentation

### Setting up Google Cloud PostgresSQL

After setting up the PostgresSQL instance on the Console, I wanted to connect to it via Postico, a Mac GUI for Postgres. I found documentation [here](https://cloud.google.com/sql/docs/postgres/connect-external-app). Specifically, I did the following:

1. Enable the Cloud SQL Admin API (same as docs)
2. Download `cloud_sql_proxy`. I put it in `google-cloud-sdk/bin` so it ended up in my PATH.
3. Used `gcloud auth application-default login` to get credentials for the proxy.
4. Ran `cloud_sql_proxy -instances=<INSTANCE_CONNECTION_NAME>=tcp:5432` where `INSTANCE_CONNECTION_NAME` was found under the IP address on the Cloud SQL dashboard
5. Created a new Postgres user under Instance Details > Users
6. Connected on Postico to localhost:5432 using the credentials from step 5. No SSL / proxy configuration required in Postico.
