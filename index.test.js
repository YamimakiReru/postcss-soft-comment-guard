import { describe, it, expect } from 'vitest'
import postcss from 'postcss'
import { wrapComments, unwrapComments } from './index.js'
import cssnano from 'cssnano'

describe('postcss-soft-wrap/unwrap-comments', () => {
  describe('with magicPrefix option', ()=>{
    it('wraps non-important comments with magic prefix', async () => {
      const input = `
        /* normal */
        /*! important */
      `

      const result = await postcss([
        wrapComments({ magicPrefix: '!!TEST!!' })
      ]).process(input, { from: undefined })

      expect(result.css).toContain('/* !!TEST!!normal */')
      // important comments (/*! ... */) must remain untouched.
      expect(result.css).toContain('/*! important */')
    })

    it('unwraps wrapped comments', async () => {
      const input = `
        /* !!TEST!!normal */
        /*! important */
      `

      const result = await postcss([
        unwrapComments({ magicPrefix: '!!TEST!!' })
      ]).process(input, { from: undefined })

      expect(result.css).toContain('/* normal */')
      expect(result.css).toContain('/*! important */')
    })

    it('wrap → unwrap is identity', async () => {
      const input = `
        /* normal */
        /*! important */
      `

      const wrapped = await postcss([
        wrapComments({ magicPrefix: '!!TEST!!' }),
        unwrapComments({ magicPrefix: '!!TEST!!' })
      ]).process(input, { from: undefined })

      expect(input.trim()).toBe(input.trim())
    })
  })

  describe('with default option', () => {
    it('wraps non-important comments with magic prefix', async () => {
      const input = `
        /* normal */
        /*! important */
      `

      const result = await postcss([
        wrapComments()
      ]).process(input, { from: undefined })

      expect(result.css).toContain('normal')
      // important comments (/*! ... */) must remain untouched.
      expect(result.css).toContain('/*! important */')
    })

    it('unwraps wrapped comments', async () => {
      const plugin = unwrapComments({})

      const input = `
        /* ${plugin._magicPrefix}normal */
        /*! important */
      `

      const result = await postcss([
        cssnano(),
        plugin
      ]).process(input, { from: undefined })

      expect(result.css).toContain('/* normal */')
      expect(result.css).toContain('/*! important */')
    })

    it('wrap → unwrap is identity', async () => {
      const input = `
        /* normal */
        /*! important */
      `

      const unwrapped = await postcss([
        wrapComments(),
        unwrapComments()
      ]).process(input, { from: undefined })

      expect(unwrapped.css.trim()).toBe(input.trim())
    })
  })

  describe('works with cssnano', ()=>{
    it('wraps non-important comments with magic prefix', async () => {
      const input = `
        /* normal */
        /*! important */
      `

      const result = await postcss([
        wrapComments(),
        cssnano()
      ]).process(input, { from: undefined })

      expect(result.css).toContain('normal')
      // important comments (/*! ... */) must remain untouched.
      expect(result.css).toContain('/*! important */')
    })

    it('unwraps wrapped comments', async () => {
      const plugin = unwrapComments({})

      const input = `
        /* ${plugin._magicPrefix}normal */
        /*! important */
      `

      const result = await postcss([
        cssnano(),
        plugin
      ]).process(input, { from: undefined })

      expect(result.css).toContain('/* normal */')
      expect(result.css).toContain('/*! important */')
    })

    it('wrap → unwrap is identity', async () => {
      const input = `
        /* normal */
        /*! important */
      `

      const wrapped = await postcss([
        wrapComments(),
        cssnano(),
        unwrapComments()
      ]).process(input, { from: undefined })

      expect(input.trim()).toBe(input.trim())
    })
  })
})
