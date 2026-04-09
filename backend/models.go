package models

import "time"

// UUID is a string alias — replace with github.com/google/uuid when initialising the Go module.
type UUID = string

// ApplicationStage mirrors APPLICATION_STAGES in application/lib/types.ts
type ApplicationStage int

const (
	StagePreparation ApplicationStage = iota // "Подготовка"
	StageSent                                // "Документы отправлены"
	StageReview                              // "На рассмотрении"
	StageDecision                            // "Решение получено"
)

func (s ApplicationStage) Label() string {
	return [...]string{
		"Подготовка",
		"Документы отправлены",
		"На рассмотрении",
		"Решение получено",
	}[s]
}

// User mirrors the users table.
type User struct {
	ID        UUID      `json:"id"         db:"id"`
	Name      string    `json:"name"       db:"name"`
	City      string    `json:"city"       db:"city"`
	CreatedAt time.Time `json:"createdAt"  db:"created_at"`
	UpdatedAt time.Time `json:"updatedAt"  db:"updated_at"`
}

// RequiredFile mirrors lib/types.ts RequiredFile.
type RequiredFile struct {
	Icon string `json:"icon"`
	Name string `json:"name"`
}

// Scholarship mirrors the scholarships table.
type Scholarship struct {
	ID            int            `json:"id"            db:"id"`
	Type          string         `json:"type"          db:"type"`
	Title         string         `json:"title"         db:"title"`
	Description   string         `json:"desc"          db:"description"`
	Institution   string         `json:"institution"   db:"institution"`
	DeadlineAt    *time.Time     `json:"deadlineAt"    db:"deadline_at"`
	Documents     []string       `json:"documents"     db:"documents"`
	RequiredFiles []RequiredFile `json:"requiredFiles" db:"required_files"`
	CreatedAt     time.Time      `json:"createdAt"     db:"created_at"`
}

// Application mirrors the applications table.
type Application struct {
	ID            UUID             `json:"id"            db:"id"`
	UserID        UUID             `json:"userId"        db:"user_id"`
	ScholarshipID int              `json:"scholarshipId" db:"scholarship_id"`
	StageIndex    ApplicationStage `json:"stageIndex"    db:"stage_index"`
	CheckedDocs   []string         `json:"checkedDocs"   db:"checked_docs"`
	UploadedFiles []string         `json:"uploadedFiles" db:"uploaded_files"`
	AppliedAt     time.Time        `json:"appliedAt"     db:"applied_at"`
	UpdatedAt     time.Time        `json:"updatedAt"     db:"updated_at"`

	// Joined fields (not stored in DB)
	ScholarshipTitle string `json:"scholarshipTitle,omitempty" db:"-"`
	Institution      string `json:"institution,omitempty"      db:"-"`
}

// ── Request / Response DTOs ───────────────────────────────────

type UpsertUserRequest struct {
	Name string `json:"name" validate:"required,min=1,max=100"`
	City string `json:"city" validate:"max=100"`
}

type ApplyRequest struct {
	ScholarshipID int `json:"scholarshipId" validate:"required"`
}

type ToggleDocRequest struct {
	DocName string `json:"docName" validate:"required"`
}

type ToggleFileRequest struct {
	FileName string `json:"fileName" validate:"required"`
}

type AdvanceStageRequest struct {
	ScholarshipID int `json:"scholarshipId" validate:"required"`
}

type ApplicationResponse struct {
	Application
	Stage string `json:"stage"` // human-readable label
}

func (a *Application) ToResponse() ApplicationResponse {
	return ApplicationResponse{
		Application: *a,
		Stage:       a.StageIndex.Label(),
	}
}
