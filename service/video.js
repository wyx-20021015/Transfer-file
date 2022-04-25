import wRequest from './index'
export function getTopMv(offset,limit=10){
  return wRequest.get('/top/mv',{offset,limit})
}
export function getMvUrl(id){
  return wRequest.get('/mv/url',{
    id
  })
}
export function getMvDetail(id){
  return wRequest.get("/mv/detail",{
    mvid:id
  })
}
export function getMvRelate(id){
  return wRequest.get("/related/allvideo",{
    id
  })
}