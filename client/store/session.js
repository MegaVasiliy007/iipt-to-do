export const state = () => ({
	login: null
});

export const getters = {
	getLogin(state) {
		return state.login;
	},
	isLogin(state) {
		return !!state.login;
	}
}

export const mutations = {
	setLogin(state, { login, init}) {
		state.login = login;
		if (!init) this.$cookies.set('login', state.login, {maxAge: 604800000});
	}
}

export const actions = {
	async nuxtServerInit({ commit }) {
		commit('setLogin', {login: this.$cookies.get('login'), init: true});
	}
}
