import styled from "styled-components"
import { Link } from "react-router-dom";

export default function Success({successText}) {
    const {filmName, filmDay, filmTime, seat, name, cpf} = successText
  return (
    <>
      <Text>
        <h1>Pedido feito</h1>
        <h1>com sucesso!</h1>
      </Text>
      <InfoBox>
        <Infos data-identifier="movie-session-infos-reserve-finished">
            <h1>Filme e sessão</h1>
            <p>{filmName}</p>
            <p>{filmDay} {filmTime}</p>
        </Infos>
        <Infos data-identifier="seat-infos-reserve-finished">
            <h1>Ingressos</h1>
            { seat && seat.map((e) => 
                <p>Assento {e}</p>
            )}
        </Infos>
        <Infos data-identifier="buyer-infos-reserve-finished">
            <h1>Comprador</h1>
            <p>Nome: {name}</p>
            <p>CPF: {cpf}</p>
        </Infos>
      </InfoBox>
      <LinkBtn to={'/'}>
      <Button data-identifier="back-to-home-btn" >Voltar pra Home</Button>
    </LinkBtn>
    </>
  )
}

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px 0 45px 0;
  flex-direction: column;
  h1 {
    color: #247a6b;
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 8px;
  }
`
const InfoBox = styled.div`
margin: 28px;
`
const Infos = styled.div`
margin-bottom: 45px;

h1{
    font-weight: 700;
font-size: 24px;
margin-bottom: 10px;
}
p{
    font-size: 22px;
    margin-bottom: 5px;
}
`

const Button = styled.button`
border: none;
width: 225px;
height: 42px;
background: #E8833A;
border-radius: 3px;
font-size: 18px;
color: #FFFFFF;
margin-top:50px;
margin-bottom: 50px;`

const LinkBtn = styled(Link)`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
text-decoration: none;
`
