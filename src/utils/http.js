import axios from 'axios'
export const get = async function({url,params}){
    let result = await axios({
        url,
        method:'get',
        params
    })
    return result.data
}
export const post = async function({url,data}){
    // console.log(data)
    let result = await axios({
        url,
        method:'post',
        data
    })
    return result.data
}