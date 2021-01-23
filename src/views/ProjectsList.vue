<template>
  <div class="projects">
    <div class="projects-list">
      <template v-if="projectsListLength">
        <app-projects-element
          v-for="project in projectsList"
          :key="project.name"
          :project="project"
          @remove="removeProject"
          @edit="editProject"
        />
      </template>
      <el-card v-else shadow="never" class="project-item">
        There are no projects yet. Try to add one!
      </el-card>
    </div>
    <el-button round @click="addProject">
      Add project
    </el-button>
  </div>
</template>

<script>
import {getItem, setItem} from '@/helpers/persistentStorage'
import AppProjectsElement from '@/views/ProjectsElement'

export default {
  name: 'AppProjectsList',
  data: () => ({
    projectsList: null
  }),
  components: {
    AppProjectsElement
  },
  created() {
    this.projectsList = getItem('projects') || []
  },
  computed: {
    projectsListLength() {
      return this.projectsList.length || 0
    },
    nextId() {
      return this.projectsList[this.projectsListLength - 1].id + 1
    },
    computedId() {
      return this.projectsListLength && this.nextId
    }
  },
  methods: {
    addProject() {
      const newProps = {
        id: this.computedId,
        name: `Project ${this.computedId}`,
        hours: '8'
      }

      this.projectsList = [...this.projectsList, newProps]
      setItem('projects', this.projectsList)
    },
    editProject() {
      return true
    },
    removeProject(id) {
      this.projectsList = this.projectsList.filter(item => item.id !== id)
      setItem('projects', this.projectsList)
    }
  },
  beforeDestroy() {}
}
</script>

<style lang="scss" scoped>
.projects {
  max-width: 500px;
  margin: 0 auto 30px;

  .projects-list {
    margin: 0 0 30px;
  }
}
</style>
