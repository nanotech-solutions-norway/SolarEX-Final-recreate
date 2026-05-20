document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form.contact-form').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      const status = form.querySelector('.form-status');
      const email = 'info@solarex.no';
      const normalAction = form.getAttribute('action') || '';
      const ajaxAction = normalAction.includes('/ajax/') ? normalAction : normalAction.replace('https://formsubmit.co/', 'https://formsubmit.co/ajax/');
      const fallbackSubject = form.querySelector('input[name="_subject"]')?.value || 'SolarEX contact request';
      const formData = new FormData(form);

      const setStatus = (message, className) => {
        if (status) {
          status.textContent = message;
          status.className = `form-status ${className || ''}`.trim();
        }
      };

      const fallbackMailto = () => {
        const lines = [];
        for (const [key, value] of formData.entries()) {
          if (key.startsWith('_')) continue;
          lines.push(`${key}: ${value || '-'}`);
        }
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(fallbackSubject)}&body=${encodeURIComponent(lines.join('\n'))}`;
      };

      try {
        if (button) {
          button.disabled = true;
          button.dataset.originalText = button.textContent;
          button.textContent = 'Submitting...';
        }
        setStatus('Submitting through managed backend...', 'warn');

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 12000);
        const response = await fetch(ajaxAction, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' },
          signal: controller.signal
        });
        clearTimeout(timeout);

        if (!response.ok) throw new Error(`Form backend returned ${response.status}`);

        form.reset();
        window.location.href = 'thanks/';
      } catch (error) {
        setStatus('Managed form backend did not respond. Opening fallback email draft instead.', 'warn');
        fallbackMailto();
      } finally {
        if (button) {
          button.disabled = false;
          button.textContent = button.dataset.originalText || button.textContent;
        }
      }
    });
  });
});
