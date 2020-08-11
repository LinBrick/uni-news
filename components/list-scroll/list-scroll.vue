<template>
	<view class="scroll">
		<scroll-view  class="list-scroll" scroll-y>
			<slot></slot>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.scroll {
		flex:1;
		overflow: hidden;
		box-sizing: border-box;
		.list-scroll {
			height: 100%;
			display: flex;
			flex-direction: colum;
		}
	}
</style>
