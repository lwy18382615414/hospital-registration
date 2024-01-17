// 对于axios函数库进行二次封装
// 目的：1、利用axios请求、响应拦截器
// 2、请求拦截器，一般在请求头中携带公共的参数： token
// 3、响应拦截器，可以简化服务器返回的数据，处理http的网络错误

import axios from "axios";
import {ElMessage} from "element-plus";
import {HospitalParam} from "@/type";

//利用axios.create方法创建一个axios示例，可以设置基础路径、超时时间的设置

const request = axios.create({
    baseURL: '/api',
    timeout: 5000, //超时时间设置
})

//请求拦截器
request.interceptors.request.use((config) => {
        // config: 请求拦截器回调注入的对象（配置对象）
        // 可以通过请求头携带公共参数-token
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

//响应拦截器
request.interceptors.response.use((response) => {
    return response
}, (error) => {
    //处理http网络错误
    let status = error.response.status;
    switch (status) {
        case 404:
            ElMessage({
                type: 'error',
                message: error.message
            })
            break;
        case 500 | 501 | 503 | 504 | 505:
            ElMessage({
                type: 'error',
                message: '服务器异常！'
            })
            break;
    }
    return Promise.reject(new Error(error.message))
})

//获取医院等级分类字典
export async function getHospitalLevelMapping(): Promise<any> {
    return new Promise((resolve, reject) => {
        request
            .get(`cmn/dict/findByDictCode/Hostype`)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

//获取医院所在地区字典
export async function getHospitalRegionMapping(): Promise<any> {
    return new Promise((resolve, reject) => {
        request
            .get(`cmn/dict/findByDictCode/Beijin`)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

//获取医院列表
export async function getHospitalList(
    currentPage: number,
    pageSize: number,
    hospitalParam?: HospitalParam
): Promise<any> {
    return new Promise((resolve, reject) => {
        request
            .get(`/hosp/hospital/${currentPage}/${pageSize}`, {
                params: {
                    hoscode: hospitalParam?.hoscode,
                    hosname: hospitalParam?.hosname,
                    hostype: hospitalParam?.hostype,
                    provinceCode: hospitalParam?.provinceCode,
                    cityCode: hospitalParam?.cityCode,
                    districtCode: hospitalParam?.districtCode,
                    status: hospitalParam?.status,
                }
            })
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

