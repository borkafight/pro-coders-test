<template>
  <el-card shadow="hover" class="project-item">
    <div class="project-column">
      <span class="project-title">Project name:</span>
      <span class="project-subtitle">
        <el-input
          v-if="editing"
          v-model.lazy="some.name"
          placeholder="Please input"
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
        <el-input v-if="editing" v-model.lazy="some.hours" placeholder="0" />
        <template v-else>{{ project.hours }}</template>
      </span>
    </div>
    <div class="project-column">
      <div class="project-buttons">
        <el-button
          v-if="editing"
          type="success"
          icon="el-icon-check"
          circle
          @click="editing = false"
        ></el-button>
        <el-button
          v-else
          type="primary"
          icon="el-icon-edit"
          circle
          @click="edit"
        ></el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          @click="$emit('remove', project.id)"
        ></el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'AppProjectsElement',
  data: () => ({
    editing: false,
    some: {
      name: '',
      hours: 0
    }
  }),
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  methods: {
    edit() {
      this.editing = true
    }
  }
}
</script>

<style lang="scss" scoped>
.project-item {
  background: rgba($white, 0.8);
  border-color: rgba($white, 0.3);

  + .project-item {
    margin: 15px 0 0;
  }
}

::v-deep .el-card {
  &__body {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
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
    max-width: 56px;
    padding: 0 20px;

    &:before {
      content: '';
      position: absolute;
      top: -20px;
      right: 0;
      bottom: -20px;
      left: 0;
      background: rgba($white, 0.3);
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
  @include ellipsis;

  max-width: 220px;
  font-size: 26px;
  font-weight: bold;

  a {
    color: $steelblue;
    transition: color $base-transition-speed $base-transition-type;

    &:hover {
      color: $royalblue;
      text-decoration: none;
    }
  }
}
</style>
