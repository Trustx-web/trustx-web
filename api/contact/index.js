const crypto = require('node:crypto');
const nodemailer = require('nodemailer');

const RECIPIENT_EMAIL =
  (process.env.CONTACT_RECIPIENT_EMAIL || '').trim() || 'krishnakamireddy@trustx.world';

const ALLOWED_INQUIRY_TYPES = new Set([
  'Request a Product Demo',
  'Merchant Partnership',
  'Investor Inquiry',
  'Technical Integration',
  'Security & Privacy',
  'General Inquiry',
]);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const rateLimitStore = new Map();
const recentSubmissionHashes = new Map();

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const DUPLICATE_WINDOW_MS = 2 * 60 * 1000;

function sanitizeText(value, maxLen) {
  if (typeof value !== 'string') return '';
  return value.replace(/[\r\n\t]+/g, ' ').replace(/[<>]/g, '').trim().slice(0, maxLen);
}

function sanitizeMultiline(value, maxLen) {
  if (typeof value !== 'string') return '';
  return value.replace(/\r\n/g, '\n').replace(/[<>]/g, '').trim().slice(0, maxLen);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  entry.count += 1;
  return true;
}

async function deliverInquiryEmail(payload, requestMeta = {}) {
  const subject = `[TrustX Website Inquiry] — ${payload.inquiryType} — ${payload.company}`;
  const replyToHeader = `${payload.fullName.replace(/["<>]/g, '')} <${payload.workEmail}>`;

  const textBody = [
    'New inquiry received via the TrustX website.',
    '',
    `Full Name: ${payload.fullName}`,
    `Work Email: ${payload.workEmail}`,
    `Company / Storefront: ${payload.company}`,
    `Inquiry Type: ${payload.inquiryType}`,
    `Monthly Order Volume: ${payload.monthlyOrderVolume || 'Not specified'}`,
    `Integration Stack: ${payload.integrationStack || 'Not specified'}`,
    `Submission Timestamp (UTC): ${payload.submittedAt}`,
    '',
    'Message:',
    payload.message,
  ].join('\n');

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a; max-width: 640px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(90deg, #1d4ed8, #059669); padding: 20px 24px; color: #ffffff;">
        <h2 style="margin: 0; font-size: 18px; font-weight: 700;">TrustX Website Inquiry</h2>
        <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.92;">${escapeHtml(payload.inquiryType)} — ${escapeHtml(payload.company)}</p>
      </div>
      <div style="padding: 24px; background: #ffffff;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #475569; width: 180px;"><strong>Full Name</strong></td><td style="padding: 8px 0; color: #0f172a;">${escapeHtml(payload.fullName)}</td></tr>
          <tr><td style="padding: 8px 0; color: #475569;"><strong>Work Email</strong></td><td style="padding: 8px 0; color: #1d4ed8;">${escapeHtml(payload.workEmail)}</td></tr>
          <tr><td style="padding: 8px 0; color: #475569;"><strong>Company / Storefront</strong></td><td style="padding: 8px 0; color: #0f172a;">${escapeHtml(payload.company)}</td></tr>
          <tr><td style="padding: 8px 0; color: #475569;"><strong>Inquiry Type</strong></td><td style="padding: 8px 0; color: #0f172a;">${escapeHtml(payload.inquiryType)}</td></tr>
          <tr><td style="padding: 8px 0; color: #475569;"><strong>Monthly Order Volume</strong></td><td style="padding: 8px 0; color: #0f172a;">${escapeHtml(payload.monthlyOrderVolume || 'Not specified')}</td></tr>
          <tr><td style="padding: 8px 0; color: #475569;"><strong>Integration Stack</strong></td><td style="padding: 8px 0; color: #0f172a;">${escapeHtml(payload.integrationStack || 'Not specified')}</td></tr>
          <tr><td style="padding: 8px 0; color: #475569;"><strong>Submitted (UTC)</strong></td><td style="padding: 8px 0; color: #475569; font-family: monospace;">${escapeHtml(payload.submittedAt)}</td></tr>
        </table>
        <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
          <div style="font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; margin-bottom: 8px;">Message</div>
          <div style="font-size: 14px; color: #0f172a; white-space: pre-wrap; line-height: 1.55;">${escapeHtml(payload.message)}</div>
        </div>
      </div>
    </div>
  `;

  const resendApiKey = (process.env.RESEND_API_KEY || '').trim();
  if (resendApiKey) {
    const fromAddress =
      (process.env.EMAIL_FROM || '').trim() || 'TrustX Inquiries <inquiries@trustx.world>';
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [RECIPIENT_EMAIL],
        reply_to: payload.workEmail,
        subject,
        text: textBody,
        html: htmlBody,
      }),
    });
    const bodyText = await res.text();
    if (!res.ok) {
      throw new Error(`Resend API rejected delivery (${res.status}): ${bodyText}`);
    }
    const parsed = JSON.parse(bodyText);
    if (!parsed.id) {
      throw new Error('Resend API did not return a delivery confirmation ID.');
    }
    return { provider: 'resend', id: parsed.id };
  }

  const smtpHost = (process.env.SMTP_HOST || '').trim();
  const smtpUser = (process.env.SMTP_USER || '').trim();
  const smtpPass = (process.env.SMTP_PASS || '').trim();

  if (smtpHost && smtpUser && smtpPass) {
    const port = Number(process.env.SMTP_PORT || 587);
    const secure = process.env.SMTP_SECURE === 'true' || port === 465;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port,
      secure,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const fromAddress = (process.env.EMAIL_FROM || '').trim() || `"TrustX Website" <${smtpUser}>`;

    const info = await transporter.sendMail({
      from: fromAddress,
      to: RECIPIENT_EMAIL,
      replyTo: replyToHeader,
      subject,
      text: textBody,
      html: htmlBody,
    });

    if (!info.accepted || info.accepted.length === 0) {
      throw new Error('SMTP server did not accept recipient address.');
    }
    return { provider: 'smtp', id: info.messageId || 'accepted' };
  }

  const formSubmitEndpoint =
    (process.env.FORMSUBMIT_ENDPOINT || '').trim() ||
    `https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`;

  const originHeader =
    requestMeta.origin && requestMeta.origin.startsWith('https://')
      ? requestMeta.origin
      : 'https://trustx.world';
  const refererHeader =
    requestMeta.referer && requestMeta.referer.startsWith('https://')
      ? requestMeta.referer
      : `${originHeader}/`;

  const fsRes = await fetch(formSubmitEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Origin: originHeader,
      Referer: refererHeader,
      'User-Agent': requestMeta.userAgent || 'Mozilla/5.0 (compatible; TrustX-Web/1.0)',
    },
    body: JSON.stringify({
      name: payload.fullName,
      email: payload.workEmail,
      _subject: subject,
      _replyto: payload.workEmail,
      _template: 'table',
      _captcha: 'false',
      'Full Name': payload.fullName,
      'Work Email': payload.workEmail,
      'Company / Storefront': payload.company,
      'Inquiry Type': payload.inquiryType,
      'Monthly Order Volume': payload.monthlyOrderVolume || 'Not specified',
      'Integration Stack': payload.integrationStack || 'Not specified',
      'Submission Timestamp (UTC)': payload.submittedAt,
      Message: payload.message,
    }),
  });

  const fsBodyText = await fsRes.text();
  let fsParsed = {};
  try {
    fsParsed = JSON.parse(fsBodyText);
  } catch {
    throw new Error(`FormSubmit returned non-JSON response (${fsRes.status}): ${fsBodyText.slice(0, 200)}`);
  }

  const fsSucceeded =
    fsRes.ok &&
    (fsParsed.success === true || String(fsParsed.success).toLowerCase() === 'true');

  if (!fsSucceeded) {
    throw new Error(
      `FormSubmit rejected delivery (${fsRes.status}): ${fsParsed.message || fsBodyText.slice(0, 200)}`
    );
  }

  return { provider: 'formsubmit', id: 'accepted' };
}

module.exports = async function (context, req) {
  const fallbackError =
    'We couldn’t submit your inquiry right now. Please try again or email krishnakamireddy@trustx.world directly.';

  try {
    const ip =
      (req.headers && (req.headers['x-forwarded-for'] || req.headers['client-ip'])) || 'unknown';
    if (!checkRateLimit(String(ip).split(',')[0].trim())) {
      context.res = {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
        body: {
          ok: false,
          error:
            'Too many inquiries submitted recently. Please wait a few minutes or email krishnakamireddy@trustx.world directly.',
        },
      };
      return;
    }

    const body = req.body || {};

    if (typeof body.website === 'string' && body.website.trim().length > 0) {
      context.res = {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: { ok: false, error: fallbackError },
      };
      return;
    }

    if (typeof body.formLoadedAt === 'number') {
      const elapsed = Date.now() - body.formLoadedAt;
      if (elapsed >= 0 && elapsed < 1200) {
        context.res = {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
          body: { ok: false, error: fallbackError },
        };
        return;
      }
    }

    const fullName = sanitizeText(body.fullName, 120);
    const workEmail = sanitizeText(body.workEmail, 160).toLowerCase();
    const company = sanitizeText(body.company, 140);
    const inquiryType = sanitizeText(body.inquiryType, 80);
    const message = sanitizeMultiline(body.message, 4000);
    const monthlyOrderVolume = sanitizeText(body.monthlyOrderVolume, 80);
    const integrationStack = sanitizeText(body.integrationStack, 160);

    if (!fullName || !workEmail || !company || !inquiryType || !message) {
      context.res = {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: {
          ok: false,
          error: 'Please complete all required fields before submitting your inquiry.',
        },
      };
      return;
    }

    if (!EMAIL_REGEX.test(workEmail)) {
      context.res = {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: { ok: false, error: 'Please enter a valid work email address.' },
      };
      return;
    }

    if (!ALLOWED_INQUIRY_TYPES.has(inquiryType)) {
      context.res = {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: { ok: false, error: 'Please select a valid inquiry type.' },
      };
      return;
    }

    if (message.length < 10) {
      context.res = {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: { ok: false, error: 'Please provide a brief message (at least 10 characters).' },
      };
      return;
    }

    const submissionHash = crypto
      .createHash('sha256')
      .update(`${workEmail}|${inquiryType}|${message}`)
      .digest('hex');

    const now = Date.now();
    const prev = recentSubmissionHashes.get(submissionHash);
    if (prev && now - prev < DUPLICATE_WINDOW_MS) {
      context.res = {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
        body: {
          ok: false,
          error:
            'This inquiry was already submitted moments ago. Please wait a couple of minutes before resending.',
        },
      };
      return;
    }

    const payload = {
      fullName,
      workEmail,
      company,
      inquiryType,
      message,
      monthlyOrderVolume,
      integrationStack,
      submittedAt: new Date().toISOString(),
    };

    const headers = req.headers || {};
    const delivery = await deliverInquiryEmail(payload, {
      origin: typeof headers.origin === 'string' ? headers.origin : undefined,
      referer: typeof headers.referer === 'string' ? headers.referer : undefined,
      userAgent: typeof headers['user-agent'] === 'string' ? headers['user-agent'] : undefined,
    });
    recentSubmissionHashes.set(submissionHash, now);
    context.log(`[TrustX Contact] Delivered via ${delivery.provider} (${delivery.id})`);

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: {
        ok: true,
        message:
          'Thank you for contacting TrustX. Your inquiry has been submitted successfully. We’ll get back to you soon.',
      },
    };
  } catch (err) {
    context.log.error('[TrustX Contact] Delivery failure:', err && err.message ? err.message : err);
    context.res = {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
      body: { ok: false, error: fallbackError },
    };
  }
};
