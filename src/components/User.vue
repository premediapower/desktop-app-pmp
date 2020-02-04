<template>
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
        {{ departmentName }}
      </div>
      <div class="description">
        Desc...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-info",
  computed: {
    departmentName: function() {
      var departmentName = "";

      switch(this.$parent.user.department_id) {
        case 1:
          departmentName = "Studio";
          break;
        case 2:
          departmentName = "Account";
          break;
        case 3:
          departmentName = "Creatie";
          break;
      }

      return departmentName;
    }
  }
};
</script>