---
title: "remix-flags | REST API"
description: "REST API docs for remix-flags"
---

# REST API

## Authentication

Go to your [dashboard](/dashboard), select a project, then `API Tokens` to create a new API token.

You can use this token in two ways:

Via a query parameter:

```bash
curl -X GET https://remix-flags.com/api/v1/flags/<project-id>?token=<token>
```

Or the `Authorization` header:

```bash
curl -X GET https://remix-flags.com/api/v1/flags/<project-id> \
  -H "Authorization: <token>"
```

## Endpoints

### `/api/v1/flags/<project-id>`

Returns a list of all flags for the given project.

Request:

```bash
curl -X GET https://remix-flags.com/api/v1/flags/<project-id>?token=<token>
```

Response:

```json
{
  "data": {
    "firstFlag": true,
    "secondFlag": false
  }
}
```
