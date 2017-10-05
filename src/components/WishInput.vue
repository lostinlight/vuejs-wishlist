
<template>
   <div class="wl-new-wish dropdown">
    <button class="wl-new-wish__toggle dropdown-toggle wl-btn" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" @click="toggleDropdown">
      <span class="wl-toggle-icon"><i class="icon-plus"></i></span>
      ADD NEW WISH
    </button>

    <div class="wl-new-wish__menu dropdown-menu dropdown-menu-animated" :class="{open : adding}" id="wl-new-wish__menu" aria-labelledby="dropdownMenu1">
      <form>
        <div class="form-group">
          <label for="name">Name</label> <small>{{formErrors.name}}</small>
          <input type="text" class="form-control" id="new-wishName" placeholder="wish something" maxlength="15" required v-model="newWish.name">
        </div>
        <div class="form-group">
          <label for="category">Category</label> <small>{{formErrors.category}}</small>
          <select class="form-control" id="new-wishType" required v-model="newWish.category">
            <option disabled value="">Select category</option>
            <option v-for="category in categories" :value="category">{{category}}</option>
          </select>
        </div>
        <button type="submit" v-on:click.prevent="onSubmit" class="btn btn-default">Submit</button>
      </form>
    </div>
  </div>

</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      adding: false,
      formErrors: {},
      newWish: {
        _id: '',
        name: '',
        date: '',
        category: '',
        isUnlocked: false,
        isAlpha: false,
        image: 'wish-default'
      },
      categories: ['goods', 'trips', 'mates', 'bonus']
    }
  },
  methods: {
    toggleDropdown() {
      this.adding = !this.adding;
    },
    validateForm() {
      const errors = {};
      if (this.newWish.name === '') {
        errors.name = 'name is required';
      }

      if (this.newWish.category === '') {
        errors.category = 'choose category';
      }

      this.formErrors = errors;
      return Object.keys(errors).length === 0;
    },
    onSubmit() {
      if (this.validateForm()) {
        this.newWish.date = moment().format('YYYY-MM-DD');
        this.$store.commit('ADD_WISH', this.newWish);
        this.newWish = {_id: '', name: '', date: '', category: '', isUnlocked: false, isAlpha: false, image: 'image-default'};
        this.adding = false;
      }
    }
  }
}
</script>
