
export class api {
    static getNewPosition(town) {
        return new Promise(async (resolve, reject) => {
            await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=2fcf50c3-38d1-4cda-a5a9-da7983b01137&format=json&geocode=${town || 'Новочеркасск'}`, {
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
}