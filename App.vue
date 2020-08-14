<script>
	export default {
		onLaunch: function() {
			this.$uniCloudFunction('get_user', {
				user_id: '5f32282c35a9a80001914e13'
			}).then((res) => {
				const { data } = res
				this.$store.dispatch('set_userInfo', data)
				console.log(data)
			})
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import 'components/gaoyia-parse/parse.css';
</style>
