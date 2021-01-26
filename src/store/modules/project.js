import {getItem, setItem, generateId} from '@/helpers/index'

const state = {
  projectsList: [],
  isSubmitting: false
}

const getters = {
  getProjects: state => {
    return state.projectsList
  },
  getCurrentProject: state => id => {
    return state.projectsList.find(item => item.id === Number(id))
  },
  getTasks: state => id => {
    return state.projectsList.find(item => item.id === Number(id)).tasks
  }
}

const mutations = {
  updateProjects(state, payload) {
    state.projectsList = payload
    setItem('projects', payload)
  },
  pushProjectTask(state, {id, task}) {
    const projectIndex = state.projectsList.findIndex(item => item.id === id)
    const taskId = generateId(state.projectsList[projectIndex].tasks)

    state.projectsList[id].tasks.push({id: taskId, ...task})
  }
}

const actions = {
  initProjects({commit}) {
    if (getItem('projects')) {
      commit('updateProjects', getItem('projects'))
    }
  },
  pushProject({commit, state}, properties) {
    const mergedProjects = [...state.projectsList, properties]

    commit('updateProjects', mergedProjects)
  },
  removeProject({commit, state}, id) {
    const result = state.projectsList.filter(item => item.id !== id)

    commit('updateProjects', result)
  },
  addProjectTask({commit, state}, {id, task}) {
    commit('pushProjectTask', {id, task})
    commit('updateProjects', state.projectsList)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
