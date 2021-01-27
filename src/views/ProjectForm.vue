<template>
  <form class="project-col form" @submit.prevent="addTask">
    <el-input v-model="task.name" placeholder="Task name" />
    <el-input v-model="task.hours" type="number" placeholder="Hours quantity" />
    <el-date-picker
      v-model="task.date"
      format="dd-MM-yyyy"
      type="date"
      placeholder="Pick a day"
    />
    <div class="color-picker-wrapper">
      <span class="color-picker-title">
        <span>{{ currentColor }}</span>
      </span>
      <app-color-picker
        :key="isRerender"
        :radio-elements="radioElements"
        :value="task.color"
        @color-changed="onColorPickerChange($event)"
      />
    </div>
    <el-button native-type="submit" type="primary">Add task</el-button>
  </form>
</template>

<script>
import {mapGetters} from 'vuex'
import {Notification} from 'element-ui'
import AppColorPicker from '@/components/ColorPicker'

export default {
  name: 'AppProjectForm',
  data: () => ({
    isRerender: false,
    task: {},
    radioElements: ['non-urgent', 'common', 'tolerable', 'urgent', 'bugfix']
  }),
  components: {
    AppColorPicker
  },
  computed: {
    ...mapGetters(['getTasks']),
    isValid() {
      return (
        this.task.name &&
        this.task.name.length &&
        this.task.hours &&
        this.task.hours.length &&
        this.task.date &&
        this.task.date.length
      )
    },
    currentColor() {
      return this.task.color ? this.task.color : 'no type'
    }
  },
  methods: {
    addTask(event) {
      if (!this.isValid) {
        Notification.error({
          title: 'Error',
          message: 'Please, fill all the required fields.'
        })
        return
      }

      this.$emit('addTask', this.task)
      event.target.reset()
      this.isRerender = !this.isRerender

      Notification.success({
        title: 'Success',
        message: 'Ticket has been added successfully.'
      })
    },
    onColorPickerChange(value) {
      this.$set(this.task, 'color', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.color-picker-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 15px;

  .color-picker {
    margin-left: 15px;
    white-space: nowrap;
  }

  .color-picker-title {
    text-align: left;
    white-space: nowrap;

    > span {
      background: $white;
      padding: 1px 5px;
      font-size: 13px;
      color: $black;
      border-radius: $base-border-radius;
    }
  }
}
</style>
