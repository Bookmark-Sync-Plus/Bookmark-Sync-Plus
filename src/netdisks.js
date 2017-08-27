'use strict'

const Netdisks = {
  // glot.io
  //  id    is required when do pull()
  //  token is required when do push(), unlink()
  glot: {
    options: {
      token: null,
      title: '.bookmarks.json',
      id: null
    },
    set(opts = {}) {
      Object.assign(this.options, opts)
    },
    async pull() {
      let id = this.options.id
      if (!id) return
      const url = `https://snippets.glot.io/snippets/${id}`
      try {
        return (await (await fetch(url)).json()).files
      } catch (e) {
        console.error('glot.pull()', e)
        return []
      }
    },
    async push(bookmarks = [{ name: '_.json', content: '{}' }]) {
      let data = {
        language: 'json',
        title: this.options.title,
        public: false,
        files: bookmarks
      }
      let url = 'https://snippets.glot.io/snippets'
      let id = this.options.id
      if (id) url += `/${id}`
      let token = this.options.token
      let init = {
        method: id ? 'POST' : 'PUT',
        headers: new Headers()
      }
      init.headers.append('Authorization', this.options.token)
      init.headers.append('Content-type', 'application/json')
      try {
        this.options.id = (await (await fetch(url, init)).json()).id
      } catch (e) {
        console.error('glot.push()', e)
      }
    },
    async unlink() {
      if (!id) return
      let url = `https://snippets.glot.io/snippets/${id}`
      let init = {
        method: 'DELETE',
        headers: new Headers()
      }
      init.headers.append('Authorization', this.options.token)
      try {
        let ret = await (await fetch(url, init)).body()
        this.options.id = null
        this.options.token = null
        return ret
      } catch (e) {
        console.error('glot.unlink()', e)
        return null
      }
    }
  }
}
