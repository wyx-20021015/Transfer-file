import {
  HYEventStore
} from 'hy-event-store'
import {
  getRankRequest
} from '../service/music'
const rankingMap = { 0: "newRanking", 1: "hotRanking", 2: "originRanking", 3: "upRanking" }

const rankStore = new HYEventStore({
  state: {
    newRanking: {}, // 0: 新歌
    hotRanking: {}, // 1: 热门
    originRanking: {}, // 2: 原创
    upRanking: {} // 3: 飙升
  },
  actions: {
    getRankData(ctx) {
      // getRankRequest(1).then(res=>{
      //   ctx.hotRank=res.data.playlist
      // })
      for (let i = 0; i < 4; i++) {
        getRankRequest(i).then(res => {
          const rankingName = rankingMap[i]
          ctx[rankingName] = res.data.playlist
        })
      }
    }
  }
})
export {
  rankStore
}