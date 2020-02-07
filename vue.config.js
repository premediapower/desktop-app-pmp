module.exports = {
	lintOnSave: process.env.NODE_ENV !== 'production',
	pluginOptions: {
		electronBuilder: {
			nodeIntegration: true,
			builderOptions: {
				publish: ["github"]
			}
		}
	}
};
