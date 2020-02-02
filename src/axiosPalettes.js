import axios from "axios"

const instance = axios.create({
  baseURL: "https://tocolor-c1acd.firebaseio.com/"
})

export default instance
