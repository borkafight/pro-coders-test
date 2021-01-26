<template>
  <div class="project">
    <div class="container">
      <h1 class="title">
        <router-link class="arrow-back-wrapper" :to="{name: 'projects'}">
          <span class="arrow-back" />
        </router-link>
        {{ project.name }}
        <span class="text-outline">{{ project.hours }} hrs/day</span>
      </h1>
      <div class="project-holder">
        <div class="project-col">
          <app-project-tasks-list :tasks="project.tasks" />
        </div>
        <app-project-form
          @addTask="addProjectTask({id: projectId, task: $event})"
        />
      </div>
      <div class="project-col grantt-chart">
        There's no grantt chart yet
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import AppProjectTasksList from '@/views/ProjectTasksList'
import AppProjectForm from '@/views/ProjectForm'

export default {
  name: 'AppProject',
  components: {
    AppProjectTasksList,
    AppProjectForm
  },
  computed: {
    ...mapGetters(['getProjects', 'getCurrentProject']),
    projectId() {
      return Number(this.$route.params.id)
    },
    project() {
      return this.getCurrentProject(this.projectId)
    }
  },
  methods: {
    ...mapActions(['addProjectTask'])
  }
}
</script>

<style lang="scss" scoped>
.title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .arrow-back-wrapper {
    position: absolute;
    left: 0;
    display: flex;
  }
}
.project {
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
}
</style>
