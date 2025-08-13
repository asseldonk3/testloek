# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev          # Start development server on http://localhost:5173
npm run build        # TypeScript check + production build
npm run preview      # Preview production build locally
npm run lint         # Run ESLint checks
```

### Testing & Quality
```bash
npm run lint         # Check code quality with ESLint
npm run build        # Validates TypeScript and builds for production
```

## Architecture Overview

### Problem Domain
This application solves permit information discovery for Noord-Brabant province construction professionals. Key pain points addressed:
- Manual selection of 56 municipalities takes 20-30 minutes → solved with one-click selection
- Terminology confusion between Wabo (pre-2024) and Omgevingswet (post-2024) → automatic translation
- Permit status buried in unstructured text → visual Kanban board
- Search time of 4-6 hours → reduced to 5 minutes

### Core State Management
The application uses React's useState at the App.tsx level with these key state pieces:
- `selectedMunicipalities`: Array of selected municipality names
- `permits`: Array of Permit objects (currently using mock data)
- `viewMode`: Controls which view is active (search/map/dashboard)
- `filters`: SearchFilters object for advanced filtering

### Data Flow
1. **Municipality Selection** → MunicipalitySelector component manages the 56 Noord-Brabant municipalities list
2. **Search Execution** → SearchBar triggers search with terminology translation via TerminologyTranslator service
3. **Results Display** → PermitList/PermitCard show results, PermitMap visualizes geographically, StatusDashboard shows Kanban
4. **Filtering** → FilterPanel updates filters state which flows down to display components

### Key Services

**TerminologyTranslator** (`src/services/terminologyTranslator.ts`)
- Maps old Wabo terminology to new Omgevingswet terms
- Provides bidirectional translation and suggestions
- Critical for bridging the 2024 regulatory change gap

### Component Responsibilities

**MunicipalitySelector**: Manages selection of all 56 municipalities with one-click option
**SearchBar**: Handles search input with terminology translation hints
**StatusDashboard**: Kanban board visualization of permit statuses (in-review/pending/approved/rejected)
**PermitMap**: Leaflet-based geographic visualization (coordinates currently simplified)

### Design System
- Primary: Noord-Brabant Blue (#003E7E)
- Accent: Construction Orange (#FF6B35)
- Status colors: Green (approved), Amber (pending), Red (rejected), Blue (in-review)
- Font: Inter with system fallbacks
- Tailwind CSS with custom color extensions

### Current Limitations & TODOs
- Mock data instead of real API integration (see getMockPermits in App.tsx)
- Map coordinates are simplified to major cities only
- Export functionality (CSV/Excel) not yet implemented
- Mobile responsive design needs improvement

### Development Patterns
- TypeScript strict mode enabled
- Components use named exports
- Types defined in `src/types/index.ts`
- Tailwind classes for styling (no CSS modules)
- Lucide React for all icons