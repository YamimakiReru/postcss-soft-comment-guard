/**
 * @typedef {import('postcss').Root} Root
 */

const _DEFAULT_MAGIC_PREFIX = '!!GUARD!!'

export function wrapComments(options = {}) {
  const that = {
    postcssPlugin: 'postcss-soft-wrap-comments',

    /** @type {string} */
    _magicPrefix: options.magicPrefix || _DEFAULT_MAGIC_PREFIX,

    /**
     * Called once (per entrypoint) at the START of processing.
     * @see https://postcss.org/api/#root
     * @param {Root} root
     */
    Once: (root) => {
      root.walkComments((comment) => {
        if (!comment.text.startsWith('!')) {
          comment.text = that._magicPrefix + comment.text
        }
      })
    },
  }

  return that
}

export function unwrapComments(options = {}) {
  const that = {
    postcssPlugin: 'postcss-soft-unwrap-comments',

    /** @type {string} */
    _magicPrefix: options.magicPrefix || _DEFAULT_MAGIC_PREFIX,

    /**
     * Called once (per entrypoint) at the END of processing.
     * @see https://postcss.org/api/#root
     * @param {Root} root
     */
    OnceExit: (root) => {
      root.walkComments((comment) => {
        if (comment.text.startsWith(that._magicPrefix)) {
          comment.text = comment.text.slice(that._magicPrefix.length)
        }
      })
    },
  }

  return that
}
