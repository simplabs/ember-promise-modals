import { visit, click, triggerKeyEvent } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

import { setupPromiseModals } from 'ember-promise-modals/test-support';

module('Application | basics', function (hooks) {
  setupApplicationTest(hooks);
  setupPromiseModals(hooks);

  test('clicking the backdrop closes the modal', async function (assert) {
    await visit('/');

    assert.dom('.epm-backdrop').exists();
    assert.dom('.epm-modal').doesNotExist();

    await click('[data-test-show-modal]');

    assert.dom('.epm-modal').exists();

    await click('.epm-backdrop');

    assert.dom('.epm-modal').doesNotExist();
  });

  test('clicking the backdrop does not close the modal if `clickOutsideDeactivates` is `false`', async function (assert) {
    this.owner.lookup('service:modals').focusTrapOptions = {
      clickOutsideDeactivates: false,
    };

    await visit('/');

    assert.dom('.epm-backdrop').exists();
    assert.dom('.epm-modal').doesNotExist();

    await click('[data-test-show-modal]');

    assert.dom('.epm-backdrop').exists();
    assert.dom('.epm-modal').exists();

    await click('.epm-backdrop');

    assert.dom('.epm-backdrop').exists();
    assert.dom('.epm-modal').exists();
  });

  test('opening a modal disables scrolling on the <body> element', async function (assert) {
    await visit('/');

    assert.dom('body', document).hasStyle({ overflow: 'visible' });

    await click('[data-test-show-modal]');

    assert.dom('body', document).hasStyle({ overflow: 'hidden' });

    await click('.epm-backdrop');

    assert.dom('body', document).hasStyle({ overflow: 'visible' });
  });

  test('pressing the Escape keyboard button closes the modal', async function (assert) {
    await visit('/');

    assert.dom('.epm-modal').doesNotExist();

    await click('[data-test-show-modal]');

    assert.dom('.epm-modal').exists();

    await triggerKeyEvent(document, 'keydown', 'Escape');

    assert.dom('.epm-modal').doesNotExist();
  });
});
