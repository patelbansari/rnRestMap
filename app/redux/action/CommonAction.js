import { IS_SPLASH, REST_LIST, } from "./Action"

export const updateRestList = (list) => {
    return { type: REST_LIST, list }
} 

