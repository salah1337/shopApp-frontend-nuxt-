import Vue from 'vue'

Vue.mixin({
  methods: {
    filterSearch(searchField, str) {
      if (searchField != "") {
        let regex = RegExp(`${searchField}+?`, 'ig')
        // console.log(`${str} / ${searchField}  = ` + regex.test(str));
        return regex.test(str)
      } else {
        return true
      }
    },
    highlight(searchField, str) {
      if (searchField != "") {
        let regex = RegExp(`${searchField}+`, 'ig')
        str = str.replace(regex, `<span class='highlited' style='color:var(--main)'>${this.searchField}</span>`)
        return str
      } else {
        return str
      }
    },
  }
})