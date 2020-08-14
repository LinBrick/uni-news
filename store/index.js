import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: uni.getStorageSync('USERINFO') || {},
		historyLists: uni.getStorageSync('__history') || []
	},
	mutations: {
		SET_USER_INFO(state, userInfo) {
			state.userInfo = userInfo
		},
		SET_HISTORY_LISTS(state, history) {
			state.historyLists = history
		},
		CLEAR_HISTORY(state) {
			state.historyLists = []
		}
	},
	actions: {
		set_userInfo({
			commit
		}, userInfo) {
			uni.setStorageSync('USERINFO', userInfo)
			commit('SET_USER_INFO', userInfo)
		},
		set_history({ commit,state }, history) {
			const historyList = uni.getStorageSync('__history') ? uni.getStorageSync('__history').map(item => item.name) : []
			if(historyList.length && historyList.includes(history.name)) return
			let list = state.historyLists
			list.unshift(history)
			uni.setStorageSync('__history', list)
			commit('SET_HISTORY_LISTS', list)
		},
		clearHistory({commit}) {
			uni.removeStorageSync('__history')
			commit('CLEAR_HISTORY')
		}
	}
})

export default store