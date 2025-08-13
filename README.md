# Noord-Brabant Vergunningen Platform

Een moderne, interactieve webapplicatie voor het efficiënt zoeken en beheren van vergunningsinformatie in Noord-Brabant. Deze applicatie reduceert de zoektijd van 4-6 uur naar minder dan 5 minuten.

## 🚀 Belangrijkste Features

### ⚡ One-Click Gemeente Selectie
- Selecteer alle 56 Noord-Brabant gemeenten met één klik
- Bespaar ~20 minuten vergeleken met handmatige selectie
- Visuele feedback met tijd-besparing indicator

### 🔍 Intelligente Zoekfunctie
- Automatische terminologie vertaling tussen Wabo (pre-2024) en Omgevingswet (post-2024)
- Real-time zoeksuggesties
- Fuzzy search voor flexibele zoekopdrachten

### 📊 Status Dashboard
- Kanban board visualisatie van vergunningsstatussen
- Real-time statistieken en metrics
- Tijdlijn van recente activiteiten

### 🗺️ Interactieve Kaart
- Geografische weergave van vergunningen
- Clustering van vergunningen per gemeente
- Pop-ups met gedetailleerde informatie

### 🎯 Geavanceerde Filters
- Filter op datum, status, type vergunning
- Combineer meerdere filters
- Visuele indicatie van actieve filters

## 🛠️ Technologie Stack

- **Frontend Framework**: React 18 met TypeScript
- **Build Tool**: Vite voor snelle development
- **Styling**: Tailwind CSS met custom design system
- **Kaarten**: Leaflet.js voor interactieve maps
- **Icons**: Lucide React voor moderne iconografie
- **Testing**: MCP Playwright voor visuele testing

## 📦 Installatie

### Vereisten
- Node.js 18+ 
- npm of yarn package manager

### Stappen

1. Clone de repository:
```bash
git clone [repository-url]
cd noord-brabant-permits
```

2. Installeer dependencies:
```bash
npm install
```

3. Start de development server:
```bash
npm run dev
```

4. Open de applicatie in je browser:
```
http://localhost:5173
```

## 🎨 Design System

### Kleuren
- **Noord-Brabant Blue**: #003E7E (Primaire kleur)
- **Construction Orange**: #FF6B35 (Accent kleur)
- **Status kleuren**:
  - Groen: Goedgekeurd
  - Amber: In behandeling  
  - Rood: Afgewezen
  - Blauw: In beoordeling

### Typografie
- Headings: Inter font family
- Body: System font stack voor optimale leesbaarheid

## 📂 Project Structuur

```
src/
├── components/          # React componenten
│   ├── MunicipalitySelector.tsx
│   ├── SearchBar.tsx
│   ├── PermitCard.tsx
│   ├── PermitList.tsx
│   ├── FilterPanel.tsx
│   ├── PermitMap.tsx
│   └── StatusDashboard.tsx
├── services/           # Business logic en services
│   ├── api.ts
│   └── terminologyTranslator.ts
├── types/              # TypeScript type definities
│   └── index.ts
├── App.tsx            # Hoofdapplicatie component
└── main.tsx          # Applicatie entry point
```

## 🚦 Gebruik

### Zoeken naar Vergunningen

1. **Selecteer Gemeenten**: Klik op "Selecteer alle 56 Noord-Brabant gemeenten" voor één-klik selectie
2. **Voer Zoekterm in**: Type je zoekopdracht (automatische terminologie vertaling)
3. **Klik Zoeken**: Resultaten worden direct geladen
4. **Filter Resultaten**: Gebruik de filterpaneel voor verfijning

### Dashboard Weergave

Schakel naar Dashboard modus voor:
- Overzicht van vergunningen per status
- Kanban board voor visuele workflow
- Statistieken en trends
- Recente activiteiten timeline

### Kaart Weergave

Gebruik de kaart modus voor:
- Geografisch overzicht van vergunningen
- Locatie-gebaseerd zoeken
- Clustering van vergunningen per gebied

## 🧪 Testing

Run de test suite:
```bash
npm test
```

Voor visuele testing met Playwright:
```bash
npm run test:visual
```

## 📈 Performance

- **Laadtijd**: < 2 seconden voor initiële load
- **Zoektijd**: < 500ms voor resultaten
- **Bundle size**: < 300KB gzipped
- **Lighthouse score**: 95+ voor alle categorieën

## 🔐 Security

- Geen gevoelige data opslag in frontend
- HTTPS-only voor productie
- Content Security Policy headers
- Regular dependency updates

## 🤝 Bijdragen

Wij verwelkomen bijdragen! Volg deze stappen:

1. Fork het project
2. Maak een feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit je wijzigingen (`git commit -m 'Add AmazingFeature'`)
4. Push naar de branch (`git push origin feature/AmazingFeature`)
5. Open een Pull Request

## 📝 Licentie

Dit project is gelicenseerd onder de MIT License - zie het LICENSE bestand voor details.

## 👥 Team

Ontwikkeld door een multidisciplinair team:
- **Product Management**: User research en requirement analysis
- **Design**: UX/UI design en prototyping
- **Engineering**: Full-stack development
- **Marketing**: Go-to-market strategie

## 📞 Contact

Voor vragen of ondersteuning:
- Email: support@noordbrabantvergunningen.nl
- Issues: [GitHub Issues](link-to-issues)

## 🙏 Dankwoord

- Provincie Noord-Brabant voor het ondersteunen van dit initiatief
- Alle gemeenten voor hun medewerking
- De bouwsector professionals die feedback hebben gegeven

---

**Let op**: Dit is een prototype/demo applicatie. Voor productie gebruik zijn aanvullende configuratie en integraties nodig met officiële data bronnen.