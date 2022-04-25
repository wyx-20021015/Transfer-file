import wRequest from './index'
export function handleInputing (value){
  return wRequest.get(`/search/suggest`,{
    keywords:value,
    type:"mobile"
  })
}
export function hotSearch(){
  return wRequest.get(`/search/hot`)
}
export function searchHandler(value){
  return wRequest.get(`/search`,{
    keywords:value
  })
}