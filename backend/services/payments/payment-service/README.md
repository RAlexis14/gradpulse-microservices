# Payment Service 💳

Processes academic payments using PayPal Sandbox simulation.

## Architecture
- Hexagonal Architecture
- Low Coupling
- REST + Webhooks (stub)

## Endpoint
POST /payments

## Example Payload
{
  "student_id": 1,
  "amount": 50.0
}
