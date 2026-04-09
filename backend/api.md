# Rakhnamo — Backend API Contract

Base URL: `https://api.rakhnamo.app/v1`  
Auth: Supabase JWT in `Authorization: Bearer <token>`

---

## Users

### `POST /users`
Create or update user profile.

**Body**: `{ name: string, city?: string }`  
**Response**: `User`

---

## Scholarships

### `GET /scholarships`
List all scholarships.

**Query**: `?type=Стипендия|Дедлайн`  
**Response**: `Scholarship[]`

### `GET /scholarships/:id`
Get single scholarship.

**Response**: `Scholarship`

---

## Applications

### `GET /applications`
Get current user's applications.

**Response**: `ApplicationResponse[]`

### `POST /applications`
Apply to a scholarship.

**Body**: `{ scholarshipId: number }`  
**Response**: `ApplicationResponse`

### `DELETE /applications/:scholarshipId`
Withdraw application.

**Response**: `204 No Content`

### `PATCH /applications/:scholarshipId/stage`
Advance to next stage.

**Response**: `ApplicationResponse`

### `PATCH /applications/:scholarshipId/docs`
Toggle document checked state.

**Body**: `{ docName: string }`  
**Response**: `ApplicationResponse`

### `PATCH /applications/:scholarshipId/files`
Toggle uploaded file state.

**Body**: `{ fileName: string }`  
**Response**: `ApplicationResponse`

---

## Saved

### `GET /saved`
Get saved scholarship IDs.

**Response**: `number[]`

### `POST /saved/:scholarshipId`
Save scholarship.

**Response**: `204 No Content`

### `DELETE /saved/:scholarshipId`
Unsave scholarship.

**Response**: `204 No Content`

---

## Error format

```json
{ "error": "message", "code": "ERROR_CODE" }
```

| Code | HTTP | Meaning |
|------|------|---------|
| `NOT_FOUND` | 404 | Resource not found |
| `ALREADY_EXISTS` | 409 | Duplicate application |
| `INVALID_INPUT` | 400 | Validation error |
| `UNAUTHORIZED` | 401 | Missing/invalid token |
| `STAGE_MAX` | 422 | Already at final stage |
