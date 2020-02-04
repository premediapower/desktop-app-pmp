<template>
  <div>
    <div class="ui fluid card">
      <div class="content">
        <img
          class="right floated mini ui image"
          src="/images/avatar/large/elliot.jpg"
        />
        <div class="header">
          {{ $parent.user.name }}
        </div>
        <div class="meta">
          {{ departmentName($parent.user.department_id) }}
        </div>
        <div class="description">
          Desc...
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-info",
  methods: {
    departmentName: function(department_id) {
      var departmentName = null;

      if (department_id == 1) {
        departmentName = "Studio";
      }

      if (department_id == 2) {
        departmentName = "Account";
      }

      if (department_id == 2) {
        departmentName = "Creatie";
      }

      return departmentName;
    }
  }
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css");
</style>
