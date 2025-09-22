import axios from "axios"

export const axiosInstance = axios.create({
    withCredentials:true
})

export const apiConnector = (method,url,bodyData,header, param)=>{
    return axiosInstance({
        method:method,
        url:url,
        data:bodyData||null,
        headers:header||null,
        params:param||null

    })
}