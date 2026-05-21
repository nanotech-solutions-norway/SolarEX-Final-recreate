document.addEventListener('DOMContentLoaded', () => {
  const email = 'info@solarex.no';

  document.querySelectorAll('form.contact-form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const button = form.querySelector('button[type="submit"]');
      const status = form.querySelector('.form-status');
      const subject = form.querySelector('input[name="_subject"]')?.value || 'SolarEX contact request';
      const formData = new FormData(form);
      const lines = [];

      for (const [key, value] of formData.entries()) {
        if (key.startsWith('_')) continue;
        if (!String(value || '').trim()) continue;
        lines.push(`${key}: ${value}`);
      }

      const body = [
        subject,
        '',
        ...lines,
        '',
        'Submitted from the SolarEX website contact form.'
      ].join('\n');

      if (button) {
        button.dataset.originalText = button.textContent;
        button.textContent = 'Opening email draft...';
      }

      if (status) {
        status.textContent = 'Opening a prepared email draft to info@solarex.no. Review and send the email to complete the request.';
        status.className = 'form-status ok';
      }

      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.setTimeout(() => {
        if (button) button.textContent = button.dataset.originalText || 'Submit request';
      }, 1800);
    });
  });
});
