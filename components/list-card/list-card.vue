<template>
	<view>
		<view class="listcard">
			<view class="listcard-image">
				<image src="/static/logo.png" mode="aspectFill"></image>
			</view>
			<view class="listcard-content">
				<view class="listcard-content__title" style="font-size:14px;font-bold:400;">
					<text>uni-app开发框架</text>
				</view>
				<view class="listcard-content__des">
					<view class="listcard-content__des-lable">
						<view class="listcard-content__des-lable-item">前端</view>
					</view>
					<view class="listcard-content__des-browse">120浏览量</view>
				</view>
			</view>
		</view>
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
	.listcard {
		display: flex;
		padding: 10px;
		margin: 10px;
		border-radius: 5px;
		box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: 0.1);
		box-sizing: border-box;
		.listcard-image {
			flex-shrink: 0;
			width: 60px;
			height: 60px;
			border-radius: 5px;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.listcard-content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-left: 10px;
			width: 100%;
			.listcard-content__title {
				fons-size: 14px;
				color: #333;
				fong-weight: 400;
				line-height: 1.2;
				text {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}
		}
		.listcard-content__des {
			display: flex;
			justify-content: space-between;
			font-size: 12px;
			.listcard-content__des-lable {
				display: flex;
				.listcard-content__des-lable-item {
					padding:0 5px;
					margin-right: 5px;
					border-radius: 15px;
					color: $mk-base-color;
					border: 1px $mk-base-color solid;
				}
			}
			.listcard-content__des-browse {
				color: #999;
				line-height: 1.5;
			}
		}
	}
</style>
