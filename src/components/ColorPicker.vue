<template>
  <div class="color-picker">
    <span class="close-btn" @click="dropColor" />
    <el-radio-group
      v-model="pickerValue"
      @change="$emit('color-changed', $event)"
    >
      <el-radio
        v-for="element in radioElements"
        :key="element"
        :label="element"
        :class="element"
      />
    </el-radio-group>
  </div>
</template>

<script>
export default {
  name: 'AppColorPicker',
  props: {
    radioElements: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    pickerValue: ''
  }),
  methods: {
    dropColor() {
      this.pickerValue = ''
      this.$emit('color-changed', '')
    }
  }
}
</script>

<style lang="scss" scoped>
.color-picker {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  .close-btn {
    margin-right: 10px;
    border-radius: 50%;
    border: 2px solid $close-btn-color;
  }

  ::v-deep .el-radio {
    margin: 0;

    + .el-radio {
      margin: 0 0 0 10px;
    }

    &__label {
      display: none;
    }

    &__inner {
      display: block;
      width: 25px;
      height: 25px;
    }

    &__input {
      display: block;
      border-radius: 50%;
      border: 0;
    }

    .el-radio__inner,
    .is-checked {
      border: 0;
      transition: background $base-transition;
    }

    &.non-urgent {
      .el-radio__inner,
      .is-checked {
        @include task_color($task-type-non-urgent-color, hover);
      }
    }

    &.common {
      .el-radio__inner,
      .is-checked {
        @include task_color($task-type-common-color, hover);
      }
    }

    &.tolerable {
      .el-radio__inner,
      .is-checked {
        @include task_color($task-type-tolerable-color, hover);
      }
    }

    &.urgent {
      .el-radio__inner,
      .is-checked {
        @include task_color($task-type-urgent-color, hover);
      }
    }

    &.bugfix {
      .el-radio__inner,
      .is-checked {
        @include task_color($task-type-bugfix-color, hover);
      }
    }
  }
}
</style>
