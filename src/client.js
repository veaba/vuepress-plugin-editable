// 要素1
// 当前行数
/**
 *
 * @param sourcePath {string}
 * @param line {number}
 * @param content {string}
 * */
function pullRequest(
	sourcePath,
	line,
	content
) {
	// TODO
}

module.exports = ({Vue}) => {
	return {
		name: 'vuepress-plugin-editable',
		content: Vue.mixin({
			mounted() {
				// TODO: 为什么这里会执行这么多次呢？
				console.info(1);
				const targetNode = document.querySelector('body');
				const dblClick = (event) => {
					const repoPrefix = this.$themeConfig.repo || '';
					if (!repoPrefix || !repoPrefix.length) {
						console.warn('Warning: You have not set the repo url');
					}
					const fullRemoteUrl = repoPrefix + this.$page.relativePath;
					console.log('TODO pull pr to==>', fullRemoteUrl);
				};
				
				if (targetNode) {
					targetNode.removeEventListener('dblclick', dblClick);
					targetNode.addEventListener('dblclick', dblClick);
				}
			}
		})
	};
};
