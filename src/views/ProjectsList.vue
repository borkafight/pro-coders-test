<template>
  <div class="projects">
    <div class="container">
      <h1 class="title">Space Projects Manager</h1>
      <div class="projects-list">
        <template v-if="projectsLength">
          <app-projects-element
            v-for="project in projects"
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
      <el-button round type="primary" @click="addProject">
        Add project
      </el-button>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {generateId} from '@/helpers/index'
import AppProjectsElement from '@/views/ProjectsElement'

export default {
  name: 'AppProjectsList',
  created() {
    this.initProjects()
  },
  components: {
    AppProjectsElement
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
    ...mapActions(['initProjects', 'pushProject']),
    addProject() {
      this.pushProject({
        id: this.projectId,
        name: `Project ${this.projectId}`,
        hours: '8'
      })
    },
    editProject() {
      // const index = this.projectsList.findIndex(item => item.id === props.id)
      // this.$set(this.projectsList, index, props)
      // setItem('projects', this.projectsList)
      return true
    },
    removeProject() {
      // this.projectsList = this.projectsList.filter(item => item.id !== id)
      // setItem('projects', this.projectsList)
      return true
    }
  },
  beforeDestroy() {}
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
