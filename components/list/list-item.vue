<template>
	<list-scroll class="list-scroll">
		<list-card types="base" v-for="item in list" :key="item._id" :item="item"></list-card>
	</list-scroll>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default() {
					return []
				}
			}
		},
	}
</script>


<style>
	.list-scroll {
		height: 100%;
	}
</style>