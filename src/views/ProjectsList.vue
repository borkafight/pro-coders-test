<template>
  <div class="projects">
    <h1 class="title">Space Projects Manager</h1>
    <div class="projects-list">
      <template v-if="projectsListLength">
        <app-projects-element
          v-for="project in projectsList"
          :key="`project-${project.id}`"
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
import {getItem, setItem, generateId} from '@/helpers/index'
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
    projectId() {
      return generateId(this.projectsList)
    }
  },
  methods: {
    addProject() {
      const newProps = {
        id: this.projectId,
        name: `Project ${this.projectId}`,
        hours: '8'
      }

      this.projectsList = [...this.projectsList, newProps]
      setItem('projects', this.projectsList)
    },
    editProject(props) {
      const index = this.projectsList.findIndex(item => item.id === props.id)
      this.$set(this.projectsList, index, props)
      setItem('projects', this.projectsList)
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
