import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  modals: service(),

  flip: false,

  actions: {
    showModal(options) {
      this.modals.open('modal1', undefined, options);
      this.toggleProperty('flip');
    },
  },
});
