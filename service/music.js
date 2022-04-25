import wRequest from './index'
export function getBanners(){
  return wRequest.get('/banner',{
    type:2
  })
}
export function getRankRequest(id){
  return wRequest.get('/top/list',{
    idx:id
  })
}

export function getSongMenu(cat="全部", limit=6, offset=0) {
  return wRequest.get("/top/playlist", {
    cat,
    limit,
    offset
  })
}
export  function getSongListData(id){
  return wRequest.get(`/playlist/detail/dynamic`,{
    id
  })
}