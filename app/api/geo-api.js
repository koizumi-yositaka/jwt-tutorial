const axios = require("axios")
const url_list = require("../util/const/url_list")



const BASE_URL=url_list.yahoo
const axiosInstance = axios.create({baseURL:BASE_URL})
const getAddress=async(lat,lon)=>{
    const feature=  (await axiosInstance.get("/reverseGeoCoder",{
        params:{
            output: "json",
            lat,
            lon,
            appid:process.env.YAHOO_APP_ID
        }
    })).data?.Feature

    return feature ? feature[0].Property.Address :""
}

module.exports = getAddress
