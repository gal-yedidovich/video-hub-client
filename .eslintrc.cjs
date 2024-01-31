/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
	root: true,
	'extends': [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/eslint-config-typescript',
	],
	parserOptions: {
		ecmaVersion: 'latest'
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-shadow': 'off',
		'no-tabs': 'off',
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'object-curly-spacing': ['error', 'always'],
		'comma-spacing': ['error', { before: false, after: true }],
		'comma-dangle': ['error', 'always-multiline'],
		curly: ['error', 'all'],
		'brace-style': ['error', '1tbs', { allowSingleLine: true }],
		'max-len': ['error', { code: 120 }],
		'arrow-parens': ['error', 'as-needed'],
		'no-param-reassign': ['error', { props: false }],
		'global-require': 'off',
		'@typescript-eslint/no-inferrable-types': 'off',
		'object-curly-newline': ['error', { consistent: true }],
		camelcase: ['error', { ignoreDestructuring: true }],
		'no-multiple-empty-lines': 'error',
		quotes: ['error', 'single'],
		'no-trailing-spaces': 'error',
		'dot-location': ['error', 'property'],
		'no-whitespace-before-property': 'error',
		semi: ['error', 'never'],
		'quote-props': ['error', 'as-needed'],
		'@typescript-eslint/explicit-module-boundary-types': 'error',
		'function-paren-newline': ['error', 'multiline-arguments'],
		'func-style': ['error', 'declaration'],
		'prefer-arrow-callback': ['error', { allowUnboundThis: false }],
		'@typescript-eslint/prefer-enum-initializers': 'error',
		'no-restricted-imports': ['error', {
			patterns: [{
				group: ['**/../src/**'],
				message: 'disabled. do not import from outside the module, use d.ts files to expose types.',
			}, {
				group: ['**/tests/**'],
				message: 'disabled. do not import from test directory',
			}],
		}],
		'object-shorthand': 'error',
		'@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
		'@typescript-eslint/member-delimiter-style': ['error', {
			singleline: { delimiter: 'comma', requireLast: false },
			multiline: { delimiter: 'comma', requireLast: true },
			overrides: {
				interface: { multiline: { delimiter: 'semi', requireLast: true } },
			},
		}],
	},
}
