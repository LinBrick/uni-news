'use strict';

const db = uniCloud.database()
exports.main = async (event, context) => {
	const { name } = event
	const list = await db.collection('article')
	.aggregate()
	.match({
		classify: name
	})
	.project({
		content: 0
	})
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
