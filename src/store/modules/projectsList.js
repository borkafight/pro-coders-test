import {setItem} from '@/helpers/persistentStorage'

const state = {
  projectsList: [],
  isSubmitting: false,
  validationErrors: null
}

const getters = {
  getProjectsList: state => {
    return state.projectsList
  }
}

const mutations = {
  initProjects(state, payload) {
    state.projectsList = payload
  },
  addProjectStart(state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  addProjectSuccess(state, payload) {
    state.isSubmitting = false
    state.projectsList = payload
  },
  addProjectFailure(state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  removeProjectStart(state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  removeProjectSuccess(state, payload) {
    state.isSubmitting = false
    state.projectsList = payload
  },
  removeProjectFailure(state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

const actions = {
  pushProject({commit, state}, properties) {
    return new Promise(() => {
      commit('addProjectStart')
      setTimeout(() => {
        const mergedProjects = [...state.projectsList, properties]

        commit('addProjectSuccess', mergedProjects)
        setItem('projects', mergedProjects)
      }, 100)
    }).catch(result => {
      console.log('Error', result)
      commit('addProjectFailure')
    })
  },
  removeProject({commit, state}, id) {
    return new Promise(() => {
      commit('removeProjectStart')
      setTimeout(() => {
        const result = state.projectsList.filter(item => item.id !== id)
        commit('removeProjectSuccess', result)
        setItem('projects', [...state.projectsList])
      }, 100)
    }).catch(result => {
      console.log('Error', result)
      commit('removeProjectFailure')
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
