'use strict';

const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id,
		value
	 } = event
	const userInfo = await db.collection('user').doc(user_id).get()
	const article_likes_ids = userInfo.data[0].article_likes_ids
	const list = await db.collection('article')
	.aggregate()
	// 追加字段
	.addFields({
		is_like: $.in(['$_id', article_likes_ids])
	})
	.project({
		content: 0
	})
	.match({
		title: new RegExp(value)
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
