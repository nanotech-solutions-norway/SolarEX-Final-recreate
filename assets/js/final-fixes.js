(() => {
  const init = () => {
    const removeBoxButtonsAndIcons = () => {
      document.querySelectorAll('.box-header-icon,.auto-card-link,.visual-label-hotspots,.visual-chip-row').forEach((el) => el.remove());
      document.querySelectorAll('.strategy-card .btn,.strategy-card a.btn,.workflow-card .auto-card-link,.visual-card .auto-card-link,.card .auto-card-link').forEach((el) => el.remove());
      document.querySelectorAll('.card,.stat,.step,.form-tab-card,.visual-card,.workflow-card,.chart-card,.strategy-card').forEach((card) => {
        const active = Boolean(card.closest('a[href]') || card.querySelector('a[href],button,input,select,textarea') || card.classList.contains('has-modal-action'));
        card.classList.toggle('has-action-card', active);
      });
    };
    removeBoxButtonsAndIcons();
    new MutationObserver(removeBoxButtonsAndIcons).observe(document.body, { childList: true, subtree: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
