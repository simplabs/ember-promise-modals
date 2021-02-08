export default function setupPromiseModals(hooks) {
  let originalValue;

  hooks.beforeEach(function () {
    document.documentElement.style.setProperty('--epm-animation-in-duration', `0.0001s`);
    document.documentElement.style.setProperty('--epm-animation-out-duration', `0.0001s`);

    this.modals = this.owner.lookup('service:modals');

    originalValue = this.modals.outAnimationTimeout;

    this.modals.set('outAnimationTimeout', 0);
  });

  hooks.afterEach(function () {
    document.documentElement.style.removeProperty('--epm-animation-in-duration', `0.0001s`);
    document.documentElement.style.removeProperty('--epm-animation-out-duration', `0.0001s`);

    this.modals.set('outAnimationTimeout', originalValue);
  });
}
