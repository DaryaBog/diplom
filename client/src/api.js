import { URL_GEOCODE, URL_SERVER } from "./constants"
import { getQueryCalculate } from "./helpers/queryCalculate"

export class api {
    static getNewPosition(town) {
        return new Promise(async (resolve, reject) => {
            await fetch(`${URL_GEOCODE}${town || 'Новочеркасск'}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
                .then(res => res.json())
                .then(res => res?.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.Point?.pos.split(' '))
                .then(res => resolve([Number(res[0]), Number(res[1])]))
                .catch(error => reject(error))
        })
    }

    static getCalculateResult(inputData) {
        console.log(inputData)
        return new Promise(async (resolve, reject) => {
            await fetch(`${URL_SERVER}/calculates?${getQueryCalculate(inputData)}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
                .then(res => res.json())
                .then(res => {
                    console.log('res', res)
                    resolve(res)
                })
                .catch(error => reject(error))
        })

    }
}