export const getOutData = (outputData) => {
    const { diametr, depth, pressure, expense, volumeTank, powerOOU, fluidVolume, maximumFlow, powerCompressor } = outputData

    return [
        {
            text: 'Рекомендуемый диаметр трубы (мм):',
            value: diametr
        }, {
            text: 'Рекомендуемая глубина заложения водопроводной трубы (м):',
            value: depth
        }, {
            text: 'Выбор нагнетательного насоса',
        }, {
            text: 'Рекомендуемый напор (м): от',
            value: pressure
        }, {
            text: 'Рекомендуемый расход (м3/с): от',
            value: expense
        }, {
            text: 'Выбор накопительного резервуара',
        }, {
            text: 'Рекомендуемый объем (м3):',
            value: volumeTank
        }, {
            text: 'Выбор обратноосмотической установки',
        }, {
            text: 'Рекомендуемая производительность (м3/ч):',
            value: powerOOU
        }, {
            text: 'Выбор емкости с мешалками'
        }, {
            text: 'Рекомендуемый объем (л):',
            value: fluidVolume
        }, {
            text: 'Выбор ультрафиолетовой установки',
        }, {
            text: 'Рекомендуемый максимальный поток (м3/ч):',
            value: maximumFlow,
        }, {
            text: 'Выбор компрессора',
        }, {
            text: 'Рекомендуемая производительность (м3/м):',
            value: powerCompressor
        }
    ]
}