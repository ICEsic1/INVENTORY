# ThreadCount — Clothing Inventory System

A Django-powered inventory management system with Kanban task board and calendar.

## Quick Start

```bash
cd threadcount
pip install django
python run.sh        # or: python manage.py runserver 0.0.0.0:8000
```
Then open http://localhost:8000

## Default Accounts
| Username | Password | Role |
|----------|----------|------|
| admin    | admin123 | Admin |
| staff    | staff123 | Staff |

## Features
- **Inventory** — Add/edit/delete items with color tags, stock tracking, low-stock alerts
- **Audit History** — Every action is logged with timestamp and user
- **Tasks & Calendar** — Asana-style Kanban board + monthly calendar view
- **Account Management** — Admin can create/delete staff accounts (Staff cannot delete)
- **Excel Export** — One-click .xlsx export with inventory + audit sheets

## Structure
```
threadcount/
├── accounts/     # User model, auth (login/logout/create/delete)
├── inventory/    # Items, AuditLog, Task models + all views
├── templates/    # HTML templates
├── db.sqlite3    # SQLite database (auto-created)
└── run.sh        # Start script
```

## Roles
- **Admin**: Full access — create/delete accounts, delete items/tasks, view all
- **Staff**: Can add/edit items and tasks, adjust stock, but cannot delete accounts or items
