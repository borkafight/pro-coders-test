<template>
  <div class="projects">
    <div class="projects-list">
      <template v-if="projectsLength">
        <app-projects-element
          v-for="project in getProjectsList"
          :key="project.name"
          :project="project"
        />
      </template>
      <el-card v-else shadow="never" class="project-item">
        There are no projects yet. Try to add one!
      </el-card>
    </div>
    <el-button round @click="addProject" :disabled="isSubmitting">
      Add project
    </el-button>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import {getItem} from '@/helpers/persistentStorage'
import AppProjectsElement from '@/views/ProjectsElement'
// import {getItem} from '@/helpers/persistentStorage'

export default {
  name: 'AppProjectsList',
  components: {
    AppProjectsElement
  },
  mounted() {
    this.initProjects(getItem('projects') || [])
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.projectsList.isSubmitting
    }),
    ...mapGetters(['getProjectsList']),
    projectsLength() {
      return this.getProjectsList.length
    },
    nextNumber() {
      return (
        this.projectsLength &&
        this.getProjectsList[this.getProjectsList.length - 1].id + 1
      )
    }
  },
  methods: {
    ...mapMutations(['initProjects']),
    ...mapActions(['pushProject']),
    addProject() {
      this.pushProject({
        id: this.nextNumber,
        name: `Project ${this.nextNumber}`,
        hours: '8'
      })
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
