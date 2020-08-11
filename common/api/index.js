function $http(options) {
	const {
		name,
		data
	} = options;
	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
			name,
			data: data || {}
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
