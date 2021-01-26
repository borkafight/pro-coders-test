<template>
  <div class="projects">
    <div class="container">
      <h1 class="title">Space Projects Manager</h1>
      <div class="projects-list">
        <template v-if="projectsLength">
          <app-projects-item
            v-for="project in projects"
            :key="`project-${project.id}`"
            :project="project"
          />
        </template>
        <el-card v-else shadow="never" class="project-item">
          There are no projects yet. Try to add one!
        </el-card>
      </div>
      <el-button round type="primary" @click="addProject">
        Add project
      </el-button>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {generateId} from '@/helpers/index'
import {Notification} from 'element-ui'
import AppProjectsItem from '@/views/ProjectsItem'

export default {
  name: 'AppProjectsList',
  components: {
    AppProjectsItem
  },
  computed: {
    ...mapGetters(['getProjects']),
    projects() {
      return this.getProjects
    },
    projectsLength() {
      return this.getProjects.length
    },
    projectId() {
      return generateId(this.getProjects)
    }
  },
  methods: {
    ...mapActions(['pushProject']),
    addProject() {
      this.pushProject({
        id: this.projectId,
        name: `Project ${this.projectId}`,
        hours: '8',
        tasks: []
      })

      Notification.success({
        title: 'Success',
        message: 'New project has been added.'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.projects {
  padding: 0 0 30px;

  .projects-list {
    margin: 0 0 30px;
  }
}
</style>
