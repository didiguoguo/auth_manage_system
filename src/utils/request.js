import axios from 'axios'
import router from '../router'
import { Notification } from 'element-ui'

export const SERVER_PATH = 'http://192.168.1.14:5000'

axios.defaults.baseUrl = SERVER_PATH

export function parseErrorMessage(res){
    if(res.code===401){
        router.push('/login')
    }
    Notification({
        type: 'error',
        title: res.code,
        message: res.message
    })
}

export default function request(url, options){
    const newOptions = { ...options }
    return axios.request({...newOptions, url})
}