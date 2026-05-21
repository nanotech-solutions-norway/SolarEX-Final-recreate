document.addEventListener('DOMContentLoaded', () => {
  const ENDPOINT = 'https://forms.nanotech-solutions.com/submit.php';
  const THANKS_URL = '../contact/thanks/';
  const FALLBACK_EMAIL = 'info@solarex.no';
  const FORM_KEY_BY_SECTION_ID = {
    'technical-form': 'technical_review',
    'commercial-form': 'commercial_discussion',
    'documentation-form': 'documentation_pilot'
  };

  document.querySelectorAll('form.contact-form').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const button = form.querySelector('button[type="submit"]');
      const status = form.querySelector('.form-status');
      const formData = new FormData(form);
      const payload = {};

      for (const [key, value] of formData.entries()) {
        payload[key] = value;
      }

      const sectionId = form.closest('section[id]')?.id || '';
      payload.form_key = payload.form_key || FORM_KEY_BY_SECTION_ID[sectionId] || '';
      payload.source_url = window.location.href;

      const subject = form.querySelector('input[name="_subject"]')?.value || 'SolarEX website form';

      const setStatus = (message, className) => {
        if (!status) return;
        status.textContent = message;
        status.className = `form-status ${className || ''}`.trim();
      };

      const fallbackMailto = () => {
        const lines = Object.entries(payload)
          .filter(([key, value]) => !key.startsWith('_') && key !== 'website' && String(value || '').trim())
          .map(([key, value]) => `${key}: ${value}`);

        const body = [
          subject,
          '',
          ...lines,
          '',
          'Submitted from SolarEX website contact form.'
        ].join('\n');

        window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      };

      try {
        if (!payload.form_key) {
          throw new Error('missing_form_key');
        }

        if (button) {
          button.dataset.originalText = button.textContent;
          button.disabled = true;
          button.textContent = 'Submitting...';
        }

        setStatus('Submitting securely to SolarEX...', 'warn');

        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 12000);

        const response = await fetch(ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload),
          signal: controller.signal
        });

        window.clearTimeout(timeout);

        const result = await response.json().catch(() => null);

        if (!response.ok || !result || result.ok !== true) {
          throw new Error(result?.error || `HTTP ${response.status}`);
        }

        form.reset();
        setStatus('Submission received. Redirecting...', 'ok');
        window.location.href = THANKS_URL;
      } catch (error) {
        setStatus('Backend submission failed. Opening fallback email draft instead.', 'warn');
        fallbackMailto();
      } finally {
        if (button) {
          button.disabled = false;
          button.textContent = button.dataset.originalText || 'Submit request';
        }
      }
    });
  });
});
