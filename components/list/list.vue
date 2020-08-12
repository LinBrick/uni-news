<template>
	<swiper class="home-swiper" :current="activeIndex" @change="change">
		<swiper-item v-for="(item,index) in tab" :key="item._id" class="swiper-item">
			<list-item :list="listCatchData[index]"></list-item>
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
				listCatchData: {}
			};
		},
		watch: {
			tab(newVal) {
				if(newVal.length === 0) return
				this.getList(this.activeIndex)
			}
		},
		created() {
			// this.getList(this.tab[this.activeIndex].name)
			// this.getList(0)
		},
		methods: {
			change(e) {
				const { current } = e.detail
				this.getList(current)
				this.$emit('change', current)
			},
			getList(current) {
				this.$uniCloudFunction('get_list',{name: this.tab[current].name}).then(result => {
					// this.list = result.data
					// this.listCatchData[current] = result.data
					this.$set(this.listCatchData, current, result.data)
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
