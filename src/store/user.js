import axios from '~/utils/adminApiConfig'

export default {
  namespaced: true,
  state: () => ({
    allProducts: [
      {
        "id": "cFmeC7aY5KjZbBAdJE9y",
        "title": "검정 구두 ",
        "price": 639000,
        "description": "107.9cm(43인치) / 와이드(16:9) / 평면 / VA / 3840 x 2160(4K UHD) / 픽셀피치: 0.2451mm / 8ms(GTG) / 300cd / 5,00",
        "tags": [
          "가전",
          "모니터",
          "컴퓨터"
        ],
        "thumbnail": "https://storage.googleapis.com/heropy-api/vBAK4MQdH5v195712.png",
        "isSoldOut": false
      },
      {
        "id": "nbqtQvEivYwEXTDet7YM",
        "title": "빨간 구드 Pro 16",
        "price": 3360000,
        "description": "역대 가장 강력한 MacBook Pro가 등장했습니다. 최초의 프로용 Apple Silicon인 M1 Pro 또는 M1 Max 칩을 탑재해 쏜살같이 빠른 속도는 물론, 획기적인 성",
        "tags": [
          "가전",
          "노트북",
          "컴퓨터"
        ],
        "thumbnail": "https://storage.googleapis.com/heropy-api/vIKMk_jy4Yv195256.png",
        "isSoldOut": false
      }
    ]
  }),
  getters:{
    tagSet(state) {
      const tagsRaw = []
      state.allProducts.forEach(data => {
        tagsRaw.push(...data.tags)
      })
      return [... new Set(tagsRaw)]
    }
  },
  mutations: {
    assignState(state,payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    }
  },
  actions: {
    async getAllProducts({ commit }, tags = []) {
      const { data } = await axios.get()
      if (tags.length) {
        const allProducts = data.filter(item => item.tags.filter(tag => tags.includes(tag)).length)
        commit('assignState', { allProducts })
      } else {
        commit('assignState', { allProducts: data })
      }
    }
  }
}