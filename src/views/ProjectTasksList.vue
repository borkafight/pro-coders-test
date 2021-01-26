<template>
  <ul class="tasks list-reset">
    <template v-if="tasks && tasks.length">
      <li
        v-for="task in tasks"
        :key="`task-${task.id}`"
        class="task-item"
        :class="task.color"
      >
        <span>{{ task.name }}</span>
        <span>{{ task.hours }} h.</span>
      </li>
    </template>
    <li v-else>There're no tasks yet.</li>
  </ul>
</template>

<script>
export default {
  name: 'AppProjectTasksList',
  props: {
    tasks: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.tasks {
  .task-item {
    @include task_color(rgba($white, 0.5), hover);
    display: flex;
    justify-content: space-between;
    color: $task-text-color;
    font-weight: bold;
    text-shadow: $task-text-shadow;
    border-radius: $base-border-radius;
    overflow: hidden;
    cursor: pointer;
    transition: background $base-transition;

    + .task-item {
      margin-top: 15px;
    }

    > span {
      text-align: left;
      padding: 10px;

      + span {
        margin-left: 15px;
      }

      &:last-child {
        min-width: 40px;
        background: rgba($white, 0.2);
        box-shadow: 0 0 100px rgba($black, 0.3);
        text-align: center;
      }
    }

    &.non-urgent {
      @include task_color($task-type-non-urgent-color, hover);
    }

    &.common {
      @include task_color($task-type-common-color, hover);
    }

    &.tolerable {
      @include task_color($task-type-tolerable-color, hover);
    }

    &.urgent {
      @include task_color($task-type-urgent-color, hover);
    }

    &.bugfix {
      @include task_color($task-type-bugfix-color, hover);
    }
  }
}
</style>
