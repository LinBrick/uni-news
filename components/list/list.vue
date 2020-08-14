<template>
	<swiper class="home-swiper" :current="activeIndex" @change="change">
		<swiper-item v-for="(item,index) in tab" :key="item._id" class="swiper-item">
			<list-item :list="listCatchData[index]" :load="load[index]"  @loadmore="loadmore"></list-item>
		</swiper-item>
	</swiper>
</template>

<script>
	import listItem from './list-item.vue'
	export default {
		components: {
			listItem
		},
		props: {
			tab: {
				type: Array,
				default(){
					return []
				}
			},
			activeIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				list: [],
				listCatchData: {},
				load: {},
				page: 1,
				pageSize: 10
			};
		},
		watch: {
			tab(newVal) {
				if(newVal.length === 0) return
				this.listCatchData = {}
				this.load = {}
				this.getList(this.activeIndex)
			}
		},
		created() {
			// TODO tab 还没有赋值
			uni.$on('update_article',(e)=>{
				if(e === 'follow'){
					this.listCatchData = {}
					this.load = {}
					this.getList(this.activeIndex)
				}
			})
		},
		methods: {
			loadmore() {
				if(this.load[this.activeIndex].loading === 'noMore') return
				this.load[this.activeIndex].page++
				this.getList(this.activeIndex)
			},
			change(e) {
				const { current } = e.detail
				this.$emit('change', current)
				if(!this.listCatchData[current] || this.listCatchData[current].length === 0) {
					this.getList(current)
				}
			},
			getList(current) {
				if(!this.load[current]) {
					this.load[current] = {
						page: 1,
						loading: 'loading'
					}
				}
				this.$uniCloudFunction('get_list', {
						name: this.tab[current].name,
						page: this.load[current].page,
						pageSize: 10
					}).then(result => {
						const { data } = result
						if(data.length === 0) {
							let oldLoad = {}
							oldLoad.loading = 'noMore'
							oldLoad.page = this.load[current].page
							this.$set(this.load, current, oldLoad)
							this.$forceUpdate()
							return
						}
						const oldList = JSON.parse(JSON.stringify(this.listCatchData[current] || []))
						oldList.push(...data)
						this.$set(this.listCatchData, current, oldList)
				})
			}
		}
	}
</script>

<style lang="scss">
	.home-swiper {
		height: 100%;

		.swiper-item {
			height: 100%;
			overflow: hidden;

			.list-scroll {
				height: 100%;
			}
		}
	}
</style>
