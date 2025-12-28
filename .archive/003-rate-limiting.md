# PR: Security Hardening (Rate Limiting)

**Branch**: `feat/contact-form` (Update)
**Issue**: Security Hardening

## Description

Implements rate limiting for the contact form API to prevent abuse.

## Changes

- **Library**: Added `lib/rate-limit.ts` using `lru-cache`.
- **API**: Updated `app/api/send/route.ts` to check IP against a token bucket.
- **Limit**: 3 requests per hour per IP.

## Verification

- Validated that the 4th request from the same IP returns status `429` and a "Rate limit exceeded" error message.
