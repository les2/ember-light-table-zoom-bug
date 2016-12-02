import Ember from 'ember';
import Table from 'ember-light-table';

export default Ember.Component.extend({
  table: Ember.computed(function () {
    return new Table([
      {
        label: 'ID',
        valuePath: 'id',
      },
      {
        label: 'First name',
        valuePath: 'firstName',
      },
      {
        label: 'Last name',
        valuePath: 'lastName',
      },
      {
        label: 'Address',
        valuePath: 'address',
      },
      {
        label: 'Email',
        valuePath: 'email',
      },
    ]);
  }),
  actions: {
    fetchData() {
      this.get('loadMoreData')().then((items) => {
        this.get('table').addRows(items);
      });
    },
  },
});
