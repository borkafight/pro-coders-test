<template>
  <el-card shadow="hover" class="project-item">
    <div class="project-column">
      <template>
        <span class="project-title">Project name:</span>
        <span class="project-subtitle">{{ project.name }}</span>
      </template>
      <input
        type="text"
        placeholder="Please input"
        class="el-input__inner hidden"
      />
    </div>
    <div class="project-column">
      <template>
        <span class="project-title">Daily hours:</span>
        <span class="project-subtitle">{{ project.hours }}</span>
      </template>
      <input
        type="text"
        placeholder="Please input"
        class="el-input__inner hidden"
      />
    </div>
    <el-button type="primary" icon="el-icon-edit" circle></el-button>
    <el-button type="success" icon="el-icon-check" circle></el-button>
  </el-card>
</template>

<script>
export default {
  name: 'AppProjectsElement',
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.project-item {
  + .project-item {
    margin: 25px 0 0;
  }
}

::v-deep .el-card__body {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.project-column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.project-title {
  font-size: 12px;
  color: grey;
  display: inline-block;
  margin-bottom: 10px;
}

.project-subtitle {
  font-weight: bold;
}
</style>
