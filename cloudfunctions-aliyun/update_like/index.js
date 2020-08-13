'use strict';
const db = uniCloud.database()
const dmCmd = db.command
exports.main = async (event, context) => {
	const {
		user_id,
		article_id
	} = event;
	const userInfo = await db.collection('user').doc(user_id).get()
	const article_likes_ids = userInfo.data[0].article_likes_ids
	let dbCmdFuns = null
	if(article_likes_ids.includes(article_id)) {
		dbCmdFuns = dmCmd.pull(article_id)
	} else {
		dbCmdFuns = dmCmd.addToSet(article_id)
	}
	await db.collection('user').doc(user_id).update({
		article_likes_ids: dbCmdFuns
	})
	return {
		code: 200,
		msg: '数据请求成功',
		data: userInfo.data[0]
	}
};
