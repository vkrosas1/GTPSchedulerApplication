# Tutor Scheduler

A scheduling system that will facilitate matching tutors with school classes based on availability, subject expertise, and "priority" rules.

## Architecture

- **Backend**: C# ASP.NET Core Web API
- **Frontend**: React with TypeScript
- **Database**: SQL Server / PostgreSQL
- **Matching Algorithm**: Constraint satisfaction with priority scoring

## Getting Started

### Prerequisites

- .NET 8.0 SDK
- Node.js 18+
- SQL Server or PostgreSQL

### Backend Setup

```bash
cd backend
dotnet restore
dotnet ef database update --project src/TutorScheduler.Infrastructure --startup-project src/TutorScheduler.API
dotnet run --project src/TutorScheduler.API
```
