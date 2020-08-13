<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit" @click="editLable">{{editStatus}}</view>
			</view>
			<uni-load-more v-show="loading" status="loading" iconType="snow"></uni-load-more>
			<view v-show="!loading" class="label-content">
				<view class="label-content__item" v-for="(item,index) in labelList" :key="item._id">
					{{item.name}}
					<uni-icons v-show="isEdit" class="icons-close" type="clear" size="14" color="red" @click="del(index)"></uni-icons>
				</view>
				<view v-show="labelList.length === 0" class="no-data">
					当前没有数据
				</view>
			</view>
		</view>
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">标签推荐</view>
			</view>
			<uni-load-more v-show="loading" status="loading" iconType="snow"></uni-load-more>
			<view v-show="!loading" class="label-content">
				<view class="label-content__item" v-for="(item,index) in list" :key="item._id" @click="add(index)">
					{{item.name}}
				</view>
				<view v-show="list.length === 0" class="no-data">
					当前没有数据
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isEdit: false,
				labelList: [],
				list: [],
				loading: true
			}
		},
		computed: {
			editStatus() {
				return this.isEdit ? '完成' : '编辑'
			}
		},
		onLoad() {
			this.getLable()
		},
		methods: {
			editLable() {
				if(this.isEdit) {
					this.isEdit = false
					this.setUpdateLabel(this.labelList)
				} else {
					this.isEdit = true
				}
			},
			getLable() {
				this.loading = true
				this.$uniCloudFunction('get_lable', {
					type: 'all'
				}).then(res => {
					const { data } = res
					this.labelList = data.filter(item => item.current)
					this.list = data.filter(item => !item.current)
					this.loading = false
				})
			},
			add(index) {
				if(!this.isEdit) return
				this.labelList.push(this.list[index])
				this.list.splice(index, 1)
			},
			del(index) {
				this.list.push(this.labelList[index])
				this.labelList.splice(index, 1)
			},
			setUpdateLabel(label) {
				const newLableList = label.map(item => item._id)
				uni.showLoading()
				this.$uniCloudFunction('update_label', {
					label: newLableList
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: '更新成功',
						icon: 'none'
					})
					uni.$emit('labelChange')
				}).catch(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.label {
		.label-box {
			background-color: #fff;
			margin-bottom: 10px;

			.label-header {
				display: flex;
				justify-content: space-between;
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border-bottom: 1px #f5f5f5 solid;

				.label-edit {
					color: #30b33a;
					font-weight: bold;
				}
			}

			.label-content {
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;

				.label-content__item {
					position: relative;
					padding: 2px 5px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px #666 solid;
					font-size: 14px;
					color: #666;

					.icons-close {
						position: absolute;
						right: -8px;
						top: -8px;
						background-color: #fff;
						border-radius: 50%;
					}
				}
			}
		}
	}

	.no-data {
		width: 100%;
		text-align: center;
		padding: 50px 0;
		color: #999;
		font-size: 14px;
	}
</style>
