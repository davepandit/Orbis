## Orbis — Event Management & Participation Platform

Orbis is a full‑stack platform for organizing, publishing, and participating in events (e.g., hackathons). It supports end‑to‑end flows for participants and organizers, including authentication (email/password and Google OAuth), event creation and editing, team formation, approvals, and automated event status updates via cron.

### Key Capabilities

- Authentication: Email/password and Google OAuth with secure HTTP‑only cookies.
- User Profiles: Basic + extended profile (education, skills, social links, avatar).
- Events: Create, edit, manage timeline/schedule/people/sponsors/prizes/FAQs; publish/draft.
- Teams: Create teams, join via invite code, enforce min/max team size and deadlines.
- Clubs & Admins: Club membership requests, approvals, and admin management.
- Results: Mark and list prize winners per event.
- Automation: Node‑cron updates event status between upcoming → ongoing → ended.

## Architecture Overview

- **Frontend (`frontend/`)**: React + Vite, React Router, Redux Toolkit + RTK Query, Flowbite for UI.

  - State slices in `src/slices/` handle auth, user, events, teams, and admin actions.
  - Pages in `src/pages/` implement user/admin flows and dashboards.

- **Backend (`backend/`)**: Node.js + Express + Mongoose (MongoDB), JWT, Passport Google OAuth, Multer, Cloudinary, node-cron.

  - Entry: `backend/index.js` initializes DB, cron jobs, CORS, cookie parser, Passport, and mounts routers.
  - Routes: `routes/*.routes.js` → Controllers in `controllers/*.controllers.js` → Models in `models/*.models.js`.
  - Services: `services/cronService.js` and `services/eventStatusService.js` for automation.
  - Middlewares: Auth (`middlewares/auth.middlewares.js`), Passport (`middlewares/passport.middlewares.js`), Multer for uploads.

- **Database**: MongoDB via Mongoose schemas for users, clubs, events, teams, timelines, schedules, sponsors, prizes, winners, etc.

- **Storage**: Cloudinary for images (`utils/cloudinary.js`).

## Technologies Used

- Frontend: React, Vite, React Router, Redux Toolkit, RTK Query, Flowbite, Tailwind CSS.
- Backend: Express, Mongoose, JWT, cookie‑parser, passport + passport‑google‑oauth20, multer, node‑cron, express‑async‑handler, dotenv, CORS.
- Database: MongoDB.
- Media: Cloudinary.

## Application Flow — Participant (User)

1. Onboarding & Auth

   - Sign up (`POST /api/users/register`) with email/password or Google OAuth via `GET /api/auth/google?intent=signup`.
   - Login (`POST /api/users/login`) or Google OAuth `?intent=login`.
   - On success, backend sets a JWT in an HTTP‑only cookie (`token`) for session auth. Frontend stores basic info in Redux (`authSlice`).
   - After login, the app loads extended profile via `useGetMyExtendedProfileQuery()` and stores `userProfileInfo`, `userEducationInfo`, `userSkills`, `userSocialLinks` in Redux/localStorage (`LoginRedirect.jsx`).

2. Discover Events

   - Browse all events: `GET /api/events` (with filters/sorting). Shown in `src/pages/Events.jsx` via `eventSlice.getUserEvents`/`getLatestEvents`.
   - Event overview page (`/overview/:eventId`) loads details: `GET /api/events/get-event-details/:eventId`.

3. Apply / Team Formation (`/apply/:eventId`)

   - Create a team: `POST /api/teams/create-team/:eventId`. Constraints enforced server‑side:
     - Event must exist and be open (before `EventTimeline.application_end`).
     - Unique team name per event; name length 3–50.
     - A user may belong to at most one team per event.
   - Join a team via invite code (team `_id`): `POST /api/teams/join-team` with `{ team_id }`.
     - Registration must still be open; team must not exceed `event.max_team_size`.
   - Current user’s team for an event: `GET /api/teams/get-user-team/:eventId`.

4. During Event

   - Event status is automatically maintained: `upcoming` → `ongoing` → `ended` based on `EventTimeline.event_start`/`event_end` (see Automation below).
   - Schedule, people, sponsors, FAQs, etc., are visible based on event setup.

5. Results & Winners
   - Organizers can mark prize winners per prize: winners are retrievable via `GET /api/events/get-prize-winners/:eventId` and displayed to users.

## Application Flow — Organizer/Admin

1. Club Admin & Membership Management

   - Users request membership to clubs; requests recorded in `MembershipRequest` (`models/approve_request.models.js`).
   - Club admins view pending requests (`getPendingMembershipRequests`) and approve/reject via `POST /api/users/:admin/approve-request/:requestId` or `.../reject-request/:requestId`.
   - Upon approval, the user is added to the club within `UserProfile.clubs` and the membership request is updated/removed.

2. Event Lifecycle

   - Create event (draft): `POST /api/events/create-event/:admin` creates a “dummy” event with minimal fields and registers the creator as `event-admin` in `EventPeople`.
   - Edit details via dedicated endpoints:
     - Basic info: name, tagline, about, mode, visibility, team size, etc. (`/edit-basic-event-info/:eventId`).
     - Timeline: application window, event start/end (`/edit-event-timeline/:eventId`, `get-event-timeline`).
     - Schedule: day‑wise items (`/edit-event-schedule/:eventId`, `get-event-schedule`).
     - People: admins/judges/mentors (`/edit-event-people/:eventId`, `get-event-people`, `get-event-people-detailed-info`).
     - Sponsors: tiers/logos (`/edit-event-sponsors/:eventId`, `get-event-sponsors`).
     - Prizes & FAQs: (`/edit-event-prizes/:eventId`, `get-event-prizes`, `/edit-event-faqs/:eventId`, `get-event-faqs`).
   - Publish vs Draft: `Event.publication_status` controls visibility; default draft until published.
   - Delete event and all associated data: `DELETE /api/events/:admin/delete-event/:eventId` (implemented server‑side to cascade related collections like people, schedule, sponsors, prizes, timelines, etc.).

3. Prize Winners

   - Mark winners: `POST /api/events/mark-prize-winner/:eventId` with prize and winning team/user. Remove via `removePrizeWinner`. List via `getPrizeWinners`.

4. Admin Dashboards (Frontend)
   - `DashboardLayout` hosts pages:
     - Manage Users: `/dashboard/:admin/manage-users`
     - Manage Admins: `/dashboard/:admin/manage-admins`
     - Approve Requests: `/dashboard/:admin/approve-requests`
     - Manage Events: `/dashboard/:admin/manage-events` — create, edit, delete; navigates to edit flows like `/:admin/edit-basic-event-info/:eventId`.

## Authentication & Authorization

- JWT via HTTP‑only cookie `token`. Middleware `validateToken` loads `req.user` from JWT.
- Google OAuth (`/api/auth/google?intent=signup|login`) via `passportGoogle` strategy in `middlewares/passport.middlewares.js`. On callback, issues the same JWT cookie and redirects the SPA to `GoogleRedirect.jsx` with status.
- Role checks (selected examples):
  - `clubAdminCheck`, `eventAdminCheck` protect admin/organizer endpoints.
  - User must be authenticated for profile, team, and application actions.

## Data Model Overview (selected)

- `User`: email, username, password (bcrypt), role, status, provider.
- `UserProfile`, `UserEducation`, `UserSkills`, `UserSocialProfiles`: extended user info.
- `Club`: club meta; admins checked by `clubAdminCheck`.
- `MembershipRequest`: `{ user_id, clubs[] }` for club approvals.
- `Event`: core event, status (`upcoming|ongoing|ended`), `publication_status` (`draft|published`), `organised_by` clubs, team size constraints.
- `EventTimeline`: `application_start`, `application_end`, `event_start`, `event_end`.
- `EventScheduleItems`: day/time items per event.
- `EventPeople`: people associated with event (e.g., `event-admin`, mentors, judges) with bios.
- `EventSponsors`, `Prizes`, `PrizeWinners`, `Tracks`, `Theme`: event‑specific content.
- `Teams`, `TeamMembers`: teams per event; membership with `role: admin|member`.

## Automation — Node Cron & Status Service

- `initializeCronJobs()` in `services/cronService.js` schedules:

  - Hourly job (`0 * * * *`): calls `updateEventStatuses()` to transition events based on timeline.
  - Nightly placeholder (`0 0 * * *`): reserved for daily maintenance tasks.

- `updateEventStatuses()` in `services/eventStatusService.js`:

  - Loads all events and each event’s `EventTimeline`.
  - If `now >= event_start` and current status is `upcoming` → set to `ongoing`.
  - If `now >= event_end` and status is `upcoming|ongoing` → set to `ended`.
  - Writes updates back to `Event.status` and logs transitions.

- Manual/testing endpoints (wired in routes):
  - `POST /api/events/manual-status-update` triggers `updateEventStatuses()` on demand (admin only).
  - `GET /api/events/status-update` returns events that would change status, for visibility/testing.

## Frontend Routing & State

- Router in `src/App.jsx` defines public pages (`/`, `/signup`, `/login`, `/all-events`, `/overview/:eventId`, `/apply/:eventId`) and dashboards.
- Protected areas use `PrivatePage.jsx` or dashboard layout patterns with Redux `auth.userBasicInfo` to guard access.
- RTK Query slices:
  - `eventSlice`: get latest/club events, edit basic info, timeline, schedule, people, sponsors, prizes, FAQs, status checks.
  - `teamSlice`: create team, get user team, join team.
  - `userSlice`: login/register, profile CRUD, Google redirects.
  - `clubAdminSlice`: create events and admin actions.

## Local Development

1. Backend

   - `cd backend && npm install`
   - Create `.env` with `MONGODB_URI`, `JWT_SECRET`, Google OAuth creds, Cloudinary keys.
   - `npm run dev` (nodemon). Backend defaults to CORS origin `http://localhost:5173`.

2. Frontend
   - `cd frontend && npm install`
   - `npm run dev` (Vite at `http://localhost:5173`).

## How to Explain This to an Interviewer

- Problem: Streamline event hosting and participation, including structured editing, team formation, and automated state transitions.
- Approach: Clear separation of concerns—React SPA with RTK Query for data fetching and caching; Express API organized by feature; Mongoose for schema‑driven modeling; cron service for time‑driven lifecycle updates.
- Robustness: Server‑enforced constraints (deadlines, team size, single team per user per event). Admin approval flow for clubs; granular event editing endpoints.
- Security: HTTP‑only JWT cookies, role guards, OAuth provider integration.
- Extensibility: New event modules (e.g., tracks, themes) are added as independent models/controllers without impacting core flows.

## Notable Files (by responsibility)

- Backend entry and automation

  - `backend/index.js` — bootstraps server, connects DB, initializes cron, mounts routers.
  - `backend/services/cronService.js` — schedules jobs; manual trigger handler.
  - `backend/services/eventStatusService.js` — timeline‑driven status transitions.

- Auth and middleware

  - `backend/middlewares/passport.middlewares.js` — Google OAuth strategy with signup/login intents.
  - `backend/middlewares/auth.middlewares.js` — `validateToken`, role checks.

- Events and teams

  - `backend/controllers/event.controllers.js`, `backend/routes/event.routes.js` — all event CRUD and sub‑sections.
  - `backend/controllers/team.controllers.js`, `backend/routes/team.routes.js` — team create/join/membership guardrails.

- Frontend flows
  - `frontend/src/pages/Login.jsx`, `GoogleRedirect.jsx`, `LoginRedirect.jsx` — auth onboarding.
  - `frontend/src/pages/Events.jsx`, `EventOverview.jsx`, `Apply.jsx` — browse/apply/team creation.
  - `frontend/src/pages/ManageEvents.jsx` and edit pages — organizer workflows.

---

If you need a deeper dive into any flow (e.g., prize assignment rules or detailed edit endpoints), see the corresponding controller and slice files referenced above.
