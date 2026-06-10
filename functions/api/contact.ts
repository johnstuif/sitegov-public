interface Env {
  MAILGUN_API_KEY: string;
  MAILGUN_DOMAIN: string;
  TURNSTILE_SECRET_KEY: string;
}

async function verifyTurnstile(token: string, secretKey: string, ip: string): Promise<boolean> {
  const form = new FormData();
  form.append('secret', secretKey);
  form.append('response', token);
  form.append('remoteip', ip);

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: form,
  });

  const data = await res.json() as { success: boolean };
  return data.success === true;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const { MAILGUN_API_KEY: apiKey, MAILGUN_DOMAIN: domain, TURNSTILE_SECRET_KEY: turnstileSecret } = env;

  let body: { name?: string; email?: string; message?: string; _hp?: string; turnstileToken?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (body._hp) {
    return Response.json({ success: true });
  }

  const { name, email, message, turnstileToken } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return Response.json({ error: 'All fields are required' }, { status: 400 });
  }

  if (!email.includes('@')) {
    return Response.json({ error: 'Invalid email address' }, { status: 400 });
  }

  if (turnstileSecret) {
    if (!turnstileToken) {
      return Response.json({ error: 'Please complete the security check.' }, { status: 400 });
    }
    const ip = request.headers.get('CF-Connecting-IP') ?? request.headers.get('X-Forwarded-For') ?? '';
    const valid = await verifyTurnstile(turnstileToken, turnstileSecret, ip);
    if (!valid) {
      return Response.json({ error: 'Security check failed. Please try again.' }, { status: 400 });
    }
  }

  if (!apiKey || !domain) {
    console.error('Missing MAILGUN_API_KEY or MAILGUN_DOMAIN env vars');
    return Response.json({ error: 'Mail service not configured' }, { status: 503 });
  }

  const form = new FormData();
  form.append('from', `SiteGov <mailgun@${domain}>`);
  form.append('to', 'hello@sitegov.io');
  form.append('subject', `SiteGov contact from ${name.trim()}`);
  form.append('h:Reply-To', email.trim());
  form.append('text', `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`);

  const mg = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`api:${apiKey}`)}`,
    },
    body: form,
  });

  if (!mg.ok) {
    console.error('Mailgun error', mg.status, await mg.text());
    return Response.json({ error: 'Failed to send message' }, { status: 502 });
  }

  return Response.json({ success: true });
};
