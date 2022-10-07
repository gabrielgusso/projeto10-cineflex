import styled from "styled-components"

export default function Header(){
    return(
        <Container>CINEFLEX</Container>
    )
}

const Container = styled.div`
height: 64px;
width: 100%;
background-color: #C3CFD9;
display: flex;
justify-content: center;
align-items: center;
color: #E8833A;
font-size: 34px;
font-weight: 400;
`