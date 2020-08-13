function $http(options) {
	const {
		name,
		data
	} = options;
	const dataObj = {
		user_id: '5f32282c35a9a80001914e13',
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
