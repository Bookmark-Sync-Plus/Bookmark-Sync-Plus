'use strict'

const Netdisks = {
  // glot.io
  //  id    is required when do pull()
  //  token is required when do push(), unlink()
  // https://github.com/prasmussen/glot-snippets/tree/master/api_docs
  //  no limit (:
  glot: {
    options: {
      token: null,
      title: '.bookmarks.json',
      id: null
    },
    set(opts = {}) {
      Object.assign(this.options, opts)
    },
    // @return [
    //    {
    //      name: 'hello.js', content: 'console.log("Hello world!")'
    //    }
    //  ]
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
    // @param [
    //    {
    //      name: 'hello.js', content: 'console.log("Hello world!")'
    //    }
    //  ]
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
    // reset this.options and delete snippet on glot.io
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
        return ret // should be empty
      } catch (e) {
        console.error('glot.unlink()', e)
        return null
      }
    }
  },
  // gist.github.com
  //  id    is required when do pull()
  //  token is required when do push(), unlink(), limit()
  // https://developer.github.com/v3/gists
  // @limit:
  //  1. you can only make 5000 requests at some rate
  //  2. according to https://developer.github.com/v3/gists#truncation,
  //     each size of files in the gist can only be lower than 1 MB,
  //     a gist can only hold 300 files
  //  3. files' names can not start with numbers
  gist: {
    options: {
      token: null,
      description: 'Sync Bookmarks Plus',
      id: null
    },
    set(opts = {}) {
      Object.assign(this.options, opts)
    },
    // @return {
    //    'hello.js': {
    //      content: 'console.log("Hello world!")'
    //    }
    //  }
    async pull() {
      let id = this.options.id
      if (!id) return
      const url = `https://api.github.com/gists/${id}`
      try {
        return (await (await fetch(url)).json()).files
      } catch (e) {
        console.error('gist.pull()', e)
        return {}
      }
    },
    // @param {
    //    'hello.js': {
    //      content: 'console.log("Hello world!")'
    //    }
    //  }
    async push(bookmarks = { '_.json': { content: '{}' } }) {
      let data = {
        description: this.options.description,
        public: false,
        files: bookmarks,
        limit: null
      }
      let url = 'https://api.github.com/gists'
      let id = this.options.id
      if (id) url += `/${id}`
      let token = this.options.token
      let init = {
        method: id ? 'POST' : 'PATCH',
        headers: new Headers()
      }
      init.headers.append('Authorization', `token ${this.options.token}`)
      init.headers.append('Content-type', 'application/json')
      try {
        this.options.id = (await (await fetch(url, init)).json()).id
      } catch (e) {
        console.error('gist.push()', e)
      }
    },
    // reset this.options and delete the gist
    async unlink() {
      if (!id) return
      let url = `https://api.github.com/gists/${id}`
      let init = {
        method: 'DELETE',
        headers: new Headers()
      }
      init.headers.append('Authorization', `token ${this.options.token}`)
      try {
        let ret = await (await fetch(url, init)).body()
        this.options.id = null
        this.options.token = null
        return ret // should be empty
      } catch (e) {
        console.error('gist.unlink()', e)
        return null
      }
    },
    // https://developer.github.com/v3/rate_limit
    // @return {
    //    limit: 5000,
    //    remaining: 4999,
    //    reset: 1372700873
    //  }
    async limit() {
      const url = 'https://api.github.com/rate_limit'
      if (!this.options.limit || (new Date() >= new Date(this.options.limit.reset * 1000)))
        this.options.limit = (await (await fetch(url)).json()).resources.core
      return this.options.limit
    }
  }
}
