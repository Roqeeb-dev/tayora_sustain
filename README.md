# Tayora Sustain — Frontend

A three-sided platform connecting textile waste donors, material requesters, and an admin coordination layer to close the loop on fashion waste — from collection through redistribution and upcycling.

> **Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · Zustand

---

## Platform Overview

| Portal        | Users                                     | Purpose                                               |
| ------------- | ----------------------------------------- | ----------------------------------------------------- |
| **Donor**     | Individuals, tailors, brands              | Submit textile waste, track pickup status             |
| **Requester** | Fashion students, small brands, creatives | Browse and request available materials                |
| **Admin**     | Tayora Sustain team                       | Review, match, coordinate logistics, manage upcycling |

The admin sits at the center — approving listings, matching supply to demand, scheduling pickups/deliveries, and routing unmatched waste into an in-house upcycling pipeline.

---

## Getting Started

```bash
git clone https://github.com/your-org/tayora-sustain-frontend.git
cd tayora-sustain-frontend
npm install
cp .env.example .env.local
npm run dev
```

### Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
```

### Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run lint         # ESLint
npm run type-check   # TypeScript check
```

---

## Project Structure

```
src/
├── app/
│   ├── (public)/page.tsx           # Landing page
│   ├── auth/                       # login, register, forgot-password
│   ├── donor/                   # dashboard, upload, listings/[id], pickups
│   ├── requester/                  # dashboard, browse/[id], requests/[id], saved
│   └── admin/                      # dashboard, listings/[id], requests, matching,
│                                   # logistics, upcycling
├── components/
│   ├── ui/                         # Button, Input, Badge, Modal, Skeleton, etc.
│   ├── shared/                     # Sidebar, TopBar, StatusTimeline, FileUpload, etc.
│   ├── supplier/                   # WasteUploadForm, ListingCard, PickupCard
│   ├── requester/                  # MaterialCard, MaterialFilters, RequestForm
│   ├── admin/                      # MatchingPanel, LogisticsTable, ImpactMetricsGrid
│   └── landing/                    # Hero, HowItWorks, RoleCards, ImpactCounter
├── store/                          # authStore, supplierStore, requesterStore, adminStore
├── services/                       # api.ts (axios base) + per-portal service files
├── hooks/                          # useAuth, useListings, useRequests, useNotifications
├── types/                          # auth, listing, request, admin types
├── lib/                            # constants, utils (cn, formatDate), zod validators
└── middleware.ts                   # Role-based route protection
```

---

## Routes (21 pages)

| Portal    | Routes                                                                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Public    | `/` · `/auth/login` · `/auth/register` · `/auth/forgot-password`                                                                                  |
| Donor     | `/donor/dashboard` · `/donor/upload` · `/donor/listings` · `/donor/listings/[id]` · `/donor/pickups`                                              |
| Requester | `/requester/dashboard` · `/requester/browse` · `/requester/browse/[id]` · `/requester/requests` · `/requester/requests/[id]` · `/requester/saved` |
| Admin     | `/admin/dashboard` · `/admin/listings` · `/admin/listings/[id]` · `/admin/requests` · `/admin/matching` · `/admin/logistics` · `/admin/upcycling` |

Each portal has its own `layout.tsx` with a role-specific sidebar/shell. `middleware.ts` guards all routes and redirects based on authenticated role.

---

## Status Lifecycles

```
Supplier listing:  Pending Review → Approved → Matched / Sent to Upcycling → Collected
Requester request: Pending → Approved → Matched → In Transit → Delivered
```

---

## API Integration

This is a frontend-only repository. It communicates with a Python REST API backend over HTTP.

- All requests go through a configured Axios instance (`src/services/api.ts`) with JWT attachment and 401 handling
- Expected response envelope: `{ success, data, message, errors }`
- For development without a live backend, populate `src/lib/mockData.ts` and swap in mock responses at the service layer

---

## State Management

Zustand stores are kept lean — UI state and session context only. Server data is owned by the hooks/services layer.

| Store            | Holds                                         |
| ---------------- | --------------------------------------------- |
| `authStore`      | Authenticated user, role, token               |
| `donorStore`     | Upload form draft                             |
| `requesterStore` | Active browse filters, saved listing IDs      |
| `adminStore`     | Bulk selection state, in-progress match draft |

---

## Contributing

- Branch convention: `feature/[portal]-[description]` (e.g. `feature/supplier-upload-form`)
- No `any` types — strict TypeScript throughout
- Pages stay thin; logic lives in hooks; hooks consume services
- Zod schemas in `src/lib/validators.ts`, shared constants in `src/lib/constants.ts`

---

## License

Proprietary — © Tayora Sustain. All rights reserved.
