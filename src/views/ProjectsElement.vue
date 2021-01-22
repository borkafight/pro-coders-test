<template>
  <el-card shadow="hover" class="project-item">
    <div class="project-column">
      <span class="project-title">Project name:</span>
      <span class="project-subtitle">
        <el-input
          v-if="editing"
          size="mini"
          placeholder="Please input"
          :value="project.name"
        />
        <template v-else>
          <router-link :to="{name: 'project', params: {id: project.id}}">{{
            project.name
          }}</router-link>
        </template>
      </span>
    </div>
    <div class="project-column">
      <span class="project-title">Daily hours:</span>
      <span class="project-subtitle">
        <el-input
          v-if="editing"
          size="mini"
          placeholder="0"
          :value="project.hours"
        />
        <template v-else>{{ project.hours }}</template>
      </span>
    </div>
    <div class="project-column">
      <div class="project-buttons">
        <el-button
          v-if="editing"
          type="success"
          icon="el-icon-check"
          size="mini"
          circle
          @click="save"
        ></el-button>
        <el-button
          v-else
          type="primary"
          icon="el-icon-edit"
          size="mini"
          circle
          @click="edit"
        ></el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          circle
          @click="removeProject(project.id)"
        ></el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'AppProjectsElement',
  data: () => ({
    editing: false
  }),
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions(['removeProject']),
    edit() {
      this.editing = true
    },
    save() {
      if (this.project.name.length && this.project.hours > 0) {
        this.editing = false
      }
    }
  }
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
  justify-content: flex-start;
  align-items: center;
}

.project-column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  + .project-column {
    margin-left: 20px;
  }

  &:first-child {
    flex: 1;
  }

  &:nth-child(even) {
    align-items: center;
    position: relative;
    max-width: 63px;
    padding: 0 20px;

    &:before {
      content: '';
      position: absolute;
      top: -20px;
      right: 0;
      bottom: -20px;
      left: 0;
      background: #f5f5f5;
    }

    > * {
      position: relative;
    }
  }
}

.project-title {
  display: inline-block;
  margin-bottom: 10px;
  font-size: 12px;
  color: grey;
}

.project-subtitle {
  font-size: 26px;
  font-weight: bold;
}
</style>
