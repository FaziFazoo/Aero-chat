# Aero-Chatbox: AI-Powered Aerospace Assistant

## Overview
Aero-Chatbox is a web application designed to assist users with aerospace-related queries, specializing in CFD (Computational Fluid Dynamics), CAD (Computer-Aided Design), and aerospace technologies. The application features an AI-powered chatbox that exclusively handles aerospace-related questions.

## Core Features

### Chat Interface
- AI-powered responses for aerospace queries
- Specialized knowledge in CFD, CAD, and aerospace technologies
- Auto-filtering of non-aerospace questions
- Real-time conversation interface

### User Management
- Secure authentication system
- Personal dashboard
- Saved conversations
- Custom preferences

### Technical Capabilities
- CFD/CAD error interpretation
- Resource recommendations
- Step-by-step problem solving
- Progress tracking

## Application Structure

### 1. User Interface
#### Welcome Screen
- Clean, minimal design
- Authentication options
- Brand identity elements

#### Main Dashboard
- Chat interface
- Suggested topics
- Recent conversations
- Quick access to resources

#### Profile Section
- User settings
- Conversation history
- Saved responses
- Preference management

### 2. AI Integration
- LLM-powered responses (Gemini/similar)
- Aerospace-specific knowledge base
- Error interpretation system
- Resource linking capability

## Technical Implementation

### Frontend
- Framework: React.js
- Features:
  - Responsive design
  - Real-time chat updates
  - Aerospace-themed UI
  - Smooth transitions

### Backend
- Supabase for backend services
- Components:
  - AI service integration
  - User authentication
  - Data persistence
  - API management

## Database Schema (Supabase)

### Tables

#### users
- id: uuid (primary key)
- email: string (unique)
- created_at: timestamp
- last_login: timestamp
- full_name: string
- avatar_url: string
- preferences: jsonb

#### conversations
- id: uuid (primary key)
- user_id: uuid (foreign key -> users.id)
- title: string
- created_at: timestamp
- updated_at: timestamp
- is_archived: boolean

#### messages
- id: uuid (primary key)
- conversation_id: uuid (foreign key -> conversations.id)
- content: text
- role: string (enum: 'user', 'assistant')
- created_at: timestamp
- metadata: jsonb

#### saved_responses
- id: uuid (primary key)
- user_id: uuid (foreign key -> users.id)
- message_id: uuid (foreign key -> messages.id)
- title: string
- created_at: timestamp
- tags: array

#### user_preferences
- user_id: uuid (foreign key -> users.id)
- theme: string
- notification_settings: jsonb
- aerospace_interests: array
- created_at: timestamp
- updated_at: timestamp

## Project Structure

### API Structure
