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
      <div class="extra content">
        <span class="left floated">
          <a class="ui basic icon button">
            <i
              class="icon"
              v-bind:class="volumeClass"
              v-on:click="$parent.app.sound = !$parent.app.sound"
            ></i>
          </a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-info",
  mounted() {
    const vm = this;
    console.log(["component mounted", this.$options.name, this.$data]);
  },
  computed: {
    volumeClass: function() {
      if (this.$parent.app.sound) {
        return "volume up green";
      } else {
        return "volume mute red";
      }
    },
    departmentName: function() {
      var departmentName = "";

      switch (this.$parent.user.department_id) {
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
