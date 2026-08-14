# MemFile EDMS v2

### Modernizing a Digital Records & File Management System with TypeScript and React

MemFile EDMS v2 is a modernization of the frontend of **MemFile**, a digital records and file-management system originally developed in 2021 to automate administrative and registry workflows.

The original MemFile frontend was developed with React.js and supported by an Express.js/Node.js API. As the original frontend codebase became outdated, I initiated this v2 implementation to modernize the client application using **TypeScript and React.js**.

---

## Background

MemFile was conceived to automate manual administrative and registry processes within the State Information Technology Agency (SITA).

The system was designed around common registry and correspondence workflows, including:

- Receiving and filing incoming mails and memos
- Managing outgoing correspondence
- Filing incoming and outgoing correspondence for retrieval
- Requesting files
- Charging files from one office to another
- Recording comments and actions required on files
- Improving the traceability and retrieval of administrative records

The original frontend was developed in **2021 using React.js**, while the backend API was developed separately using **Express.js and Node.js**.

This repository represents the next stage of that project: a **TypeScript/React modernization of the frontend**.

---

## Why V2?

The original frontend codebase had become outdated, creating a need to modernize the application rather than continue extending the older implementation.

The v2 project provides an opportunity to:

- Move the frontend to TypeScript
- Improve code maintainability
- Establish stronger type safety
- Modernize the React application structure
- Create a cleaner foundation for continued development
- Preserve and evolve the original MemFile product concept

This project is therefore not simply a new application; it is an exercise in **modernizing an existing software product and addressing technical debt**.

---

## Project Evolution

```text
2021
  │
  ├── Original MemFile Frontend
  │     React.js
  │
  ├── MemFile Backend API
  │     Node.js + Express.js
  │
  ▼
Original frontend becomes outdated
  │
  ▼
MemFile EDMS v2
  │
  └── React + TypeScript modernization
