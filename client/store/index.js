export const state = () => ({

});

export const actions = {
	async nuxtServerInit({ dispatch }) {
		dispatch('session/nuxtServerInit');
	}
}