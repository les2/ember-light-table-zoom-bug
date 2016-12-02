import Ember from 'ember';
import faker from 'faker';

export default Ember.Controller.extend({
  queryParams: [
    'perPage',
  ],

  perPage: 50,

  isLoading: false,

  idSequence: 0,

  actions: {
    loadMoreData() {
      Ember.assert('should not call loadMoreData while loading', !this.get('isLoading'));
      let startAt = this.get('idSequence');
      let currentId = startAt;
      let perPage = this.get('perPage');
      this.set('idSequence', startAt + perPage);
      this.set('isLoading', true);
      return new Ember.RSVP.Promise(resolve => {
        Ember.run.later(this, () => {
          this.set('isLoading', false);
          let items = [];
          for (let i = 0; i < perPage; i++) {
            let object = Ember.Object.create({
              id: currentId + 1,
              firstName: faker.name.firstName(),
              lastName: faker.name.lastName(),
              address: faker.address.streetAddress(),
              email: faker.internet.email(),
            });
            currentId++;
            items.push(object);
          }
          resolve(items);
        }, 0);
      });
    },
  },
});
