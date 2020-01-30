<template>
  <div class="ui segment">
    <div
      class="ui ribbon label"
      v-bind:class="task.type.color.name"
    >{{task.block.project.project_code}} - {{task.type.code}} | {{task.type.name}}</div>

    <table class="ui table celled">
      <thead></thead>
      <tbody>
        <tr>
          <td>Project</td>
          <td>
            <a
              class="ui fluid mini button"
            >Show {{task.block.project.project_code}} | {{task.block.project.description}}</a>
          </td>
        </tr>
        <tr v-if="task.briefing">
          <td>briefing</td>
          <td>
            <a class="ui fluid mini button">Show briefing</a>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="ui segment" v-if="task.remarks">
      <h5>Remarks:</h5>
      <div v-html="task.remarks"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  methods: {},
  created() {
    const vm = this;
  }
};
</script>
