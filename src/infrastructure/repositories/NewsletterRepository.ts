import type { SubscribeResult } from '@models/SubscribeResult.type';

// Talks to stasher-api. Relative URL: vite proxies /api in dev, nginx in prod.
export class NewsletterRepository {
  public static async subscribe(email: string, honeypot = ''): Promise<SubscribeResult> {
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website: honeypot }),
      });

      // A 200 alone is not proof the API handled this. If nginx lacks the
      // /api proxy, the SPA fallback answers with index.html and 200 — so
      // require a JSON content type before treating it as success, or the
      // form would report a subscription that was never stored.
      const isJson = res.headers.get('content-type')?.includes('application/json') ?? false;

      if (res.ok && isJson) return { ok: true };

      if (res.ok) {
        return { ok: false, error: 'Could not reach the server. Please try again in a moment.' };
      }

      const body: unknown = await res.json().catch(() => null);
      const error =
        typeof body === 'object' && body !== null && 'error' in body && typeof body.error === 'string'
          ? body.error
          : 'Something went wrong. Please try again.';
      return { ok: false, error };
    } catch {
      return { ok: false, error: 'Could not reach the server. Please try again in a moment.' };
    }
  }
}
