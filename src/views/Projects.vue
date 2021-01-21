<template>
  <form class="projects">
    <el-card shadow="hover" class="project-item">
      <div class="project-column">
        <span class="project-title">Имя проекта:</span>
        <span class="project-subtitle">project 1</span>
        <input
          type="text"
          placeholder="Please input"
          class="el-input__inner hidden"
        />
      </div>
      <div class="project-column">
        <span class="project-title">часов/день:</span>
        <span class="project-subtitle">8</span>
        <!----><input
          type="text"
          placeholder="Please input"
          class="el-input__inner"
        />
      </div>
      <button type="button" class="el-button el-button--primary is-circle">
        <!----><i class="el-icon-edit"></i
        ><!----></button
      ><button
        type="button"
        class="el-button el-button--success is-circle"
        style="display: none;"
      >
        <!----><i class="el-icon-check"></i
        ><!---->
      </button>
    </el-card>
    <button class="el-button el-button--default is-round">
      Добавить проект
    </button>
  </form>
</template>

<script>
export default {
  name: 'Projects'
}
</script>

<style lang="scss" scoped>
.projects {
  max-width: 500px;
  margin: 0 auto;
  padding: 5vw;

  .project-item {
    margin: 0 0 25px;
  }

  .el-card__body {
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
}
</style>
