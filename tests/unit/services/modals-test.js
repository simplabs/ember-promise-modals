import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Service | modals', function (hooks) {
  setupTest(hooks);

  test('basics', function (assert) {
    let modals = this.owner.lookup('service:modals');
    assert.equal(modals.count, 0, '#count');
    assert.strictEqual(modals.top, undefined, '#top');

    let modal1 = modals.open('modal1', { foo: 'bar' });
    assert.equal(modals.count, 1, '#count');
    assert.strictEqual(modals.top, modal1, '#top');

    let modal2 = modals.open('modal2');
    assert.equal(modals.count, 2, '#count');
    assert.strictEqual(modals.top, modal2, '#top');

    modal2.close();
    assert.equal(modals.count, 1, '#count');
    assert.strictEqual(modals.top, modal1, '#top');

    modal1.close();
    assert.equal(modals.count, 0, '#count');
    assert.strictEqual(modals.top, undefined, '#top');
  });

  test('modals can have results', function (assert) {
    let modals = this.owner.lookup('service:modals');

    let modal = modals.open('modal');
    assert.strictEqual(modal.result, undefined);

    modal.close('foo');
    assert.strictEqual(modal.result, 'foo');
  });

  test('modals are promises', async function (assert) {
    let modals = this.owner.lookup('service:modals');

    let modal = modals.open('modal');

    // eslint-disable-next-line promise/catch-or-return
    modal.then(() => {
      assert.step('then');
    });

    assert.verifySteps([]);

    modal.close('foo');

    let result = await modal;
    assert.verifySteps(['then']);
    assert.equal(result, 'foo');
  });
});
