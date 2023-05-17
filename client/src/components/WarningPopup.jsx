import React from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Colors } from '../assets/theme/Colors';

export const WarningPopup = () => {
    const isDark = useSelector(state => state.theme.isDark)

    return (
        <Overlay
            isOpen={true}
            // onAfterOpen={afterOpenModal}
            // onRequestClose={closeModal}
            // style={customStyles}
            contentLabel="Example Modal"
            isDark={isDark}
            style={{
                overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    zIndex: 2,
                },
                content: {
                    margin: 'auto',
                    marginTop: '50px',
                    border: `1px solid ${isDark ? Colors.DARK_BORDER : Colors.LIGHT_BORDER}`,
                    background: isDark ? Colors.DARK_WRAPPER : Colors.LIGHT_WRAPPER,
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '5px',
                    outline: 'none',
                    padding: '30px'
                }
            }}
        >
            <Title isDark={isDark}>Проектирование трассы питьевого водопровода</Title>
            <ListItem isDark={isDark}>1. Найдите населенный пункт, для которого Вы хотите спроектировать сотовую систему экологического питьевого водоснабжения; </ListItem>
            <ListItem isDark={isDark}>2. Задайте 4 границы населенного пункта, с учетом того, что план трассы будет строиться в пределах указанной пешеходной доступности и не ближе указанного минимального расстояния до границы;</ListItem>
            <ListItem isDark={isDark}>3. Выберете точку &#127937; начала постраения трассы из предложенных &#9784;;</ListItem>
            <ListItem isDark={isDark}>4. Нажмите "Построить план трассы";</ListItem>
            <ListItem isDark={isDark}>5. Заполните поля для инженерных рассчетов и нажмите "Рассчетать";</ListItem>
            <SubTitle isDark={isDark}> Готово! Осталось только сохранить &#127881;</SubTitle>
            <OkButton isDark={isDark}>Ok</OkButton>
        </Overlay >
    )
}


const Overlay = styled(Modal)`
width: 40%;
background: ${p => p.isDark ? Colors.DARK_BUTTON : Colors.LIGHT_BUTTON};
border-radius: 5px;
border: 1px solid ${p => p.isDark ? Colors.DARK_BORDER : Colors.LIGHT_BORDER};
text-align: center;
`

const Title = styled.h1`
color: ${p => p.isDark ? Colors.WHITE : Colors.LIGHT_BORDER};
font-size: 40px;
line-height: 40px;
`

const SubTitle = styled.div`
margin-top: 10px;
color: ${p => p.isDark ? Colors.WHITE : Colors.LIGHT_BORDER};
font-size: 30px;
`

const ListItem = styled.div`
margin-top: 10px;
color: ${p => p.isDark ? Colors.WHITE : Colors.LIGHT_BORDER};
font-size: 20px;
`

const OkButton = styled.button`
width: 100px;
height: 30px;
margin: 15px auto;
text-align: center;
color: ${p => p.isDark ? Colors.WHITE : Colors.LIGHT_BORDER};
background: ${p => p.isDark ? Colors.DARK_BUTTON : Colors.LIGHT_BUTTON};
border-radius: 5px;
`