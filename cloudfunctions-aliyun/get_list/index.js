'use strict';

const db = uniCloud.database()
exports.main = async (event, context) => {
	const { 
		name,
		page = 1,
		pageSize = 10
	 } = event
	const matchObj = {}
	if(name !== '全部') {
		matchObj.classify  = name
	}
	const list = await db.collection('article')
	.aggregate()
	.match(matchObj)
	.project({
		content: 0
	})
	.skip(pageSize * (page - 1))
	.limit(pageSize)
	.end()
	// const list = await db.collection('article')
	// .field({
	// 	content: false
	// })
	// .get()
	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data
	}
};
