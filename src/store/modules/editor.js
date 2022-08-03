const state = {
	file: null,
	rectangleToolActive: false,
	selectedRectangle: null,
	rectangles: [],
}

const getters = {
	file: state => state.file,
	rectangleToolActive: state => state.rectangleToolActive,
	selectedRectangle: state => state.selectedRectangle,
	rectangles: state => state.rectangles,
}

const mutations = {
	setFile: (state, file) => (state.file = file),
	setRectangleToolActive: (state) => (state.rectangleToolActive = !state.rectangleToolActive),
	setSelectedRectangle: (state, selectedRectangle) => (state.selectedRectangle = selectedRectangle),
	addRectangle: (state, rectangle) => (state.rectangles.push(rectangle)),
	deleteRectangle: (state, rectangle) => {
		var shallowCopyArr = state.rectangles.slice();
		var i = shallowCopyArr.indexOf(rectangle);
		shallowCopyArr.splice(i, 1);
		state.rectangles = shallowCopyArr;
	}
}

const actions = {
	setFile({ commit }, file ) {
		commit('setFile', file)
	},
	setRectangleToolActive({ commit }) {
		commit('setRectangleToolActive')
	},
	addRectangle({ commit }, rectangle) {
		commit('addRectangle', rectangle)
	},
	deleteRectangle({ commit }, rectangle) {
		commit('deleteRectangle', rectangle)
	},
	setSelectedRectangle({ commit }, rectangle) {
		commit('setSelectedRectangle', rectangle)
	}
	
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
