<template>
  <div class="projects">
    <div class="projects-list">
      <template v-if="projectsLength">
        <app-projects-element
          v-for="project in projects"
          :key="project.name"
          :project="project"
          @remove="removeProject"
        />
      </template>
      <el-card v-else shadow="never" class="project-item">
        There are no projects yet. Try to add one!
      </el-card>
    </div>
    <el-button round @click="addProject">Add project</el-button>
  </div>
</template>

<script>
import AppProjectsElement from '@/views/ProjectsElement'

export default {
  name: 'AppProjectsList',
  data: () => ({
    projects: []
  }),
  components: {
    AppProjectsElement
  },
  computed: {
    projectsLength() {
      return this.projects.length
    },
    nextNumber() {
      return (
        this.projectsLength && this.projects[this.projects.length - 1].id + 1
      )
    }
  },
  methods: {
    addProject() {
      this.projects.push({
        id: this.nextNumber,
        name: `Project ${this.nextNumber}`,
        hours: '8'
      })
    },
    removeProject(value) {
      this.projects = this.projects.filter(item => item.id !== value)
    }
  },
  beforeDestroy() {}
}
</script>

<style lang="scss" scoped>
.projects {
  max-width: 500px;
  margin: 0 auto;

  .projects-list {
    margin: 0 0 25px;
  }
}
</style>
