import store from '@/store/index.js'

function $http(options) {
	const {
		name,
		data
	} = options;
	const dataObj = {
		user_id: store.state.userInfo._id,
		...data
	}
	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
			name,
			data: dataObj || {}
		}).then(res => {
			if(res.result.code === 200) {
				resolve(res.result)
			} else {
				reject(res.result)
			}
		}).catch(err => {
			reject(err)
		})
	})
}

export default function(name, data) {
	return $http({
		name,
		data
	})
}
