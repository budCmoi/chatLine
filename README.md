# ChatLine

ChatLine is a monochrome multi-IA mobile MVP with an Expo client and a NestJS API.

## Stack

- Expo Router + React Native + NativeWind + Zustand
- NestJS + REST + WebSocket orchestration
- PostgreSQL + Prisma schema

## Workspace

- apps/mobile: mobile assistant UI, strict black and white, monospace only
- apps/api: modular API for health, providers, chat, conversations and generation

## Commands

- npm install
- npm run dev:mobile
- npm run dev:api
- npm run typecheck:mobile
- npm run build:api

## Environment

- apps/mobile/.env.example
- apps/api/.env.example

## API routes

- GET /api/health
- GET /api/v1/providers
- GET /api/v1/conversations
- GET /api/v1/generation/library
- POST /api/v1/chat/respond
- POST /api/v1/generation/jobs

## Realtime

- WebSocket namespace: /assistant
- Event in: chat.request
- Events out: assistant.ready, chat.delta, chat.completed