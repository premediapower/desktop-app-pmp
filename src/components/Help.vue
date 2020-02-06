<style lang="scss" scoped>
.segment {
  ul {
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 20px;

    li {
      pre {
        display: inline-block;
        border-radius: 3px;
        background-color: rgba(27, 31, 35, 0.05);
        padding: 0.2em 0.4em;
        margin-top: 2px;
        margin-bottom: 2px;
      }
    }
  }
}
</style>
<template>
  <div class="ui segment">
    <div class="ui segment">
      <div class="ui ribbon blue label">
        <i class="icon keyboard"></i> Shortcuts
      </div>
      <br />
      <br />
      <strong>Global</strong><br />
      <ul>
        <li>
          Bring app in focus
          <pre>CMD or Ctrl + P</pre>
        </li>
      </ul>
      <br />
      <strong>App</strong><br />
      <ul>
        <li>
          Start project search
          <pre>Space</pre>
        </li>
        <li>
          Open or mount disk
          <pre>Alt+1 / Alt+2 / Alt+3</pre>
        </li>
      </ul>
    </div>
    <div class="ui segment">
      <div class="ui ribbon red label">
        <i class="envelope outline icon"></i> Contact
      </div>
      <br />
      <br />
      <strong>Do you need help with the application?</strong><br />
      <ul>
        <li>
          <a
            href="mailto:robert.fridzema@zdsgn.com?cc=fabian.de.vos@zdsgn.com&subject=Premediapower Desktop App"
            >Send a mail</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "help",
  mounted() {
    const vm = this;

    console.log(["component mounted", this.$options.name, this.$data]);
  }
};
</script>
