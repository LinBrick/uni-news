<template>
	<view class="home">
		<navbar></navbar>
		<tab :list="tabList" @tab="tab"></tab>
		<list-scroll>
			<list-card v-for="item in 5"></list-card>
		</list-scroll>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				tabList: []
			}
		},
		onLoad() {
			this.getLabel()
		},
		methods: {
			tab({data, index}) {
				
			},
			getLabel() {
				this.$uniCloudFunction('get_lable').then(res => {
					this.tabList = res.data
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}
	.home  {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
	}
</style>
