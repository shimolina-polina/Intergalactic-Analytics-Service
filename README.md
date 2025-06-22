## Intergalactic Analytics Service

## Запуск проекта

### 1. Установка зависимостей

```bash
npm install
```

### 2. Запуск в dev-режиме

```bash
npm run dev
```

### 3. Сборка для продакшена

```bash
npm run build
```

---

## Архитектура проекта

```
src/
├── components/              // UI-компоненты
│   ├── AnalyticsComponents/ // Хайлайты и аналитика
│   ├── GeneratorComponents/ // Компоненты генератора данных
|   ├── HistoryComponents/   // История операций
|   ├── Layout/              // Обёртка и шапка сайта
│   └── UI/                  // Переиспользуемые UI-компоненты
│
├── pages/                   // Страницы приложения
│   ├── AnalyticsPage.tsx
│   ├── GeneratorPage.tsx
│   └── HistoryPage.tsx
│
├── api/                     // Взаимодействие с API (fetch-запросы)
│   ├── aggregationApi.ts
│   ├── generationApi.ts
│   └── historyApi.ts
|
├── services/                // Бизнес-логика
│   ├── aggregationService.ts
│   ├── generationService.ts
│   └── historyService.ts
│
├── store/                   // Zustand-хранилища для состояния
│   ├── useAggregationStore.ts
│   ├── useDownloadStore.ts
│   ├── useGenerationStore.ts
│   ├── useHistoryStore.ts
│   └── useUploadStore.ts
│
├── styles/                 // Общие стили - шрифты + переменные
│
└── utils/                  // Утилиты
    ├── daysToDate.ts
    └── normalizeMetrics.ts
```
