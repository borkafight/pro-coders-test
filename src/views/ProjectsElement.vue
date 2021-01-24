<template>
  <el-card shadow="hover" class="project-item">
    <div class="project-column name">
      <span class="project-title"
        >Project name:
        <span class="tasks-number">
          <router-link :to="{name: 'project', params: {id: project.id}}">
            {{ projectTasksQuantity }} tasks
          </router-link>
        </span>
      </span>
      <span class="project-subtitle">
        <el-input
          v-if="editing"
          v-model.lazy="localProject.name"
          placeholder="Please input"
          @keyup.enter="save"
        />
        <template v-else>
          <router-link :to="{name: 'project', params: {id: project.id}}">
            {{ project.name }}
          </router-link>
        </template>
      </span>
    </div>
    <div class="project-column hours">
      <span class="project-title">Daily hours:</span>
      <span class="project-subtitle">
        <el-input
          v-if="editing"
          v-model.lazy="localProject.hours"
          placeholder="0"
          @keyup.enter="save"
        />
        <template v-else>{{ project.hours }}</template>
      </span>
    </div>
    <div class="project-column project-buttons">
      <el-button
        v-if="editing"
        type="success"
        icon="el-icon-check"
        circle
        @click="save"
      ></el-button>
      <el-button
        v-else
        type="primary"
        icon="el-icon-edit"
        circle
        @click="edit"
      ></el-button>
      <el-button
        type="danger"
        icon="el-icon-delete"
        circle
        @click="$emit('remove', project.id)"
      ></el-button>
    </div>
  </el-card>
</template>

<script>
import {Notification} from 'element-ui'

export default {
  name: 'AppProjectsElement',
  data: () => ({
    editing: false,
    localProject: {
      name: '',
      hours: ''
    }
  }),
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  computed: {
    isValid() {
      return this.localProject.name.length && this.localProject.hours.length
    },
    projectTasksQuantity() {
      return this.project.tasks && this.project.tasks.length
    }
  },
  methods: {
    edit() {
      this.localProject.name = this.project.name
      this.localProject.hours = this.project.hours
      this.editing = true
    },
    save() {
      if (!this.isValid) {
        Notification.error({
          title: 'Error',
          message: 'Please, fill all the required fields.'
        })
        return
      }

      this.$emit('edit', {
        id: this.project.id,
        ...this.localProject
      })
      this.editing = false
    }
  }
}
</script>

<style lang="scss" scoped>
.project-item {
  + .project-item {
    margin: 15px 0 0;
  }
}

::v-deep .el-card {
  &__body {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}

.project-column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  min-height: 63px;

  + .project-column {
    margin-left: 20px;
  }

  &.name {
    flex: 1;
    overflow: hidden;
  }

  &.hours {
    align-items: center;
    position: relative;
    width: 56px;
    padding: 0 20px;

    &:before {
      content: '';
      position: absolute;
      top: -20px;
      right: 0;
      bottom: -20px;
      left: 0;
      background: darken($white, 5%);
    }

    > * {
      position: relative;
      text-align: center;
    }
  }
}

.project-buttons {
  flex-direction: row;
  align-items: center;
}

.project-title {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  font-size: 12px;
  color: grey;

  .tasks-number {
    display: inline-block;
    background: $base-text-color;
    color: $white;
    padding: 3px 6px;
    border-radius: $base-border-radius;

    a {
      color: $white;
      text-decoration: none;
    }
  }
}

.project-subtitle {
  @include ellipsis;

  width: 100%;
  font-weight: bold;
  text-align: left;

  .name & {
    font-size: 24px;
  }

  .hours & {
    font-size: 30px;
  }

  a {
    color: $steelblue;
    transition: color $base-transition;

    &:hover {
      color: $royalblue;
      text-decoration: none;
    }
  }
}
</style>
