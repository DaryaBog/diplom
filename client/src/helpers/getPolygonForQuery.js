export const getPolygonPointForQuery = polygon => {
    const LanLat = polygon.map(item => item.flat().join(' '))
    return LanLat.flat().join(' ')
}