<template>
  <div class="project">
    <h1 class="title">
      {{ project.name }} <span>{{ project.hours }} hrs/day</span>
    </h1>
    <div class="project-holder">
      <div class="project-col">
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
      </div>
      <form class="project-col form" @submit.prevent="addTask">
        <el-input v-model="task.name" placeholder="Task name" />
        <el-input
          v-model="task.hours"
          type="number"
          placeholder="Hours quantity"
        />
        <el-date-picker
          v-model="task.date"
          type="date"
          placeholder="Pick a day"
        />
        <div class="color-picker-wrapper">
          Pick a task type:
          <app-color-picker
            :key="isRerender"
            :radio-elements="radioElements"
            :value="task.color"
            @color-changed="onColorPickerChange($event)"
          />
        </div>
        <el-button native-type="submit" type="primary">Add task</el-button>
      </form>
    </div>
    <div class="project-col grantt-chart">
      There's no chart yet
    </div>
  </div>
</template>

<script>
import {getItem, setItem, generateId} from '@/helpers/index'
import {Notification} from 'element-ui'
import AppColorPicker from '@/components/ColorPicker'

export default {
  name: 'AppProject',
  data: () => ({
    isRerender: false,
    projectsList: null,
    project: null,
    task: {},
    tasks: [],
    radioElements: ['non-urgent', 'common', 'tolerable', 'urgent', 'bugfix']
  }),
  created() {
    this.projectsList = getItem('projects')
    this.projectsList = this.projectsList.map(item => ({
      ...item,
      tasks: item.tasks || []
    }))
    this.project = this.projectsList.find(item => item.id === this.projectId)
    this.tasks = this.project.tasks
  },
  components: {
    AppColorPicker
  },
  computed: {
    projectId() {
      return Number(this.$route.params.id)
    },
    taskId() {
      return generateId(this.tasks)
    },
    projectIndex() {
      return this.projectsList.findIndex(item => item.id === this.projectId)
    },
    isValid() {
      return (
        this.task.name &&
        this.task.name.length &&
        this.task.hours &&
        this.task.hours &&
        this.task.date &&
        this.task.date.getTime()
      )
    }
  },
  methods: {
    onColorPickerChange(value) {
      this.task.color = value
    },
    addTask(event) {
      if (!this.isValid) {
        Notification.error({
          title: 'Error',
          message: 'Please, fill all the required fields.'
        })
        return
      }

      this.task.id = this.taskId
      this.tasks.push(this.task)
      this.projectsList[this.projectIndex].tasks = this.tasks

      setItem('projects', this.projectsList)
      event.target.reset()
      this.task = {}
      this.isRerender = !this.isRerender
    }
  }
}
</script>

<style lang="scss" scoped>
.title > span {
  background: $white;
  margin-left: 10px;
  padding: 3px 6px;
  color: $black;
  font-size: 28px;
  white-space: nowrap;
  border-radius: $base-border-radius;
}

.project {
  max-width: 700px;
  margin: 0 auto 40px;
}

.project-holder {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
  align-items: start;
}

.project-col {
  background: rgba($white, 0.2);
  margin: 0 0 20px;
  padding: 15px;
  border-radius: 7px;
  color: $white;

  &.form {
    position: sticky;
    top: 15px;
  }

  ::v-deep .el-input,
  .el-button {
    display: block;
    width: 100%;
  }

  ::v-deep .el-input,
  .color-picker-wrapper {
    margin: 0 0 15px;
  }
}

.tasks {
  .task-item {
    display: flex;
    justify-content: space-between;
    background: rgba($white, 0.5);
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

.color-picker-wrapper {
  display: flex;
  align-items: center;
  margin: 0 0 15px;

  .color-picker {
    margin-left: 15px;
  }
}

.grantt-chart {
}
</style>
