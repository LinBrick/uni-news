<template>
	<view class="home">
		<navbar></navbar>
		<tab :list="tabList" :tabIndex="tabIndex" @tab="tab"></tab>
		<view class="home-list">
			<list :tab="tabList" :activeIndex="activeIndex" @change="change"></list>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				title: 'Hello',
				tabList: [],
				tabIndex: 0,
				activeIndex: 0
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		watch: {
			userInfo(newVal) {
				this.getLabel()
			}
		},
		onLoad() {
			uni.$on('labelChange', (res) => {
				this.tabList = []
				this.tabIndex = 0
				this.activeIndex = 0
				this.getLabel()
			})
			this.getLabel()
		},
		methods: {
			change(current) {
				this.tabIndex = current
				this.activeIndex = current
			},
			tab({data, index}) {
				this.activeIndex = index
			},
			getLabel() {
				this.$uniCloudFunction('get_lable').then(res => {
					const { data } = res
					data.unshift({
						name: '全部'
					})
					this.tabList = data
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
		.home-list {
			flex:1;
			box-sizing: border-box;
		}
	}
</style>
