import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Colors } from '../../assets/theme/Colors'
import { InputForm } from './InputForm'
import { Calculate } from './Calculate'
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const CalculateContainer = () => {
    const isDark = useSelector(state => state.theme.isDark)
    const printRef = useRef();
    const saveAsPDF = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL('image/png');

        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight =
            (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('print.pdf');
    }

    return (
        <ContainerCalculate ref={printRef} isDark={isDark}>
            <Title isDark={isDark}>Инженерные рассчеты</Title>
            <InputForm />
            <Calculate />
            <SaveButton isDark={isDark} onClick={saveAsPDF}>Сохранить как PDF</SaveButton>
        </ContainerCalculate>
    )
}

const ContainerCalculate = styled.div`
    width: 80%;
    height: 100%;
    background: ${p => p.isDark ? Colors.DARK_WRAPPER : Colors.WHITE};
    padding-top: 50px;
`

const Title = styled.h2`
    color: ${p => p.isDark ? Colors.WHITE : Colors.LIGHT_BORDER};
    font-size: 40px;
    text-align: center;
`

const SaveButton = styled.button`
width: 200px;
height: 30px;
margin: 15px;
text-align: center;
color: ${p => p.isDark ? Colors.WHITE : Colors.LIGHT_BORDER};
background: ${p => p.isDark ? Colors.DARK_BUTTON : Colors.LIGHT_BUTTON};
border-radius: 5px;
`

