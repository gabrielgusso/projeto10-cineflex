import styled from "styled-components"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function SelectSeat({setSuccessText}) {
  const { idFilm, idDate } = useParams()
  const [items, setItems] = useState([])
  const [seats, setSeats] = useState([])
  const [select, setSelect] = useState([])
  const [movie, setMovie] = useState([])
  const [date, setDate] = useState([])
  const [name, setName] = useState("")
  const [cpf, setCpf] = useState("")
  const navigate = useNavigate()
  const [selectNum, setSelectNum] = useState([])

  useEffect(() => {
    const promisse = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idDate}/seats`
    )

    promisse.then((response) => {
      setItems(response.data)
      setSeats(response.data.seats)
      setMovie(response.data.movie)
      setDate(response.data.day)
    })

    promisse.catch((error) => {
      console.log(error.response.data)
    })
  }, [])

  function Login(event) {
    event.preventDefault()
    const loginData = {
      ids: select,
      name,
      cpf,
    }
    const URL = "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many"
    const request = axios.post(URL, loginData)

    request.then((res) => {
      setSuccessText({
        filmName: movie.title,
        filmDay: date.weekday,
        filmTime: items.name,
        seat: selectNum,
        name,
        cpf
      })
      navigate(`/${idFilm}/${idDate}/success`)
    })

    request.catch((err) => {
      console.log(err)
    })
  }

  function allSelects(e) {
    setSelect([...select, e.id])
    setSelectNum([...selectNum, e.name])
  }

  return (
    <>
      <Text>
        <h1>Selecione o(s) assento(s)</h1>
      </Text>
      <AllSeats>
        {seats.map((e) => (
          <Seat
          data-identifier="seat"
            color={
              e.isAvailable
                ? select.includes(e.id)
                  ? "#1AAE9E"
                  : "#c3cfd9"
                : "#fbe192"
            }
            onClick={() => {
              select.includes(e.id)
                ? setSelect(select.filter((f) => f !== e.id))
                : e.isAvailable
                ? allSelects(e)
                : alert("Esse assento não está disponível")
            }}
          >
            {e.name}
          </Seat>
        ))}
      </AllSeats>
      <Subtitle>
        <SubtitleDiv >
          <Select data-identifier="seat-selected-subtitle"
          />
          <p>Selecionado</p>
        </SubtitleDiv>
        <SubtitleDiv>
          <Avaliable data-identifier="seat-available-subtitle" />
          <p>Disponível</p>
        </SubtitleDiv>
        <SubtitleDiv>
          <Unavailable data-identifier="seat-unavailable-subtitle" />
          <p>Indisponível</p>
        </SubtitleDiv>
      </Subtitle>
      <Form onSubmit={Login}>
        <label htmlFor="nome">Nome do comprador:</label>
        <input
        data-identifier="buyer-name-input"
          type="text"
          id="nome"
          placeholder="Digite seu nome..."
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="cpf">CPF do comprador:</label>
        <input
        data-identifier="buyer-cpf-input"
          type="text"
          id="cpf"
          placeholder="Digite seu CPF..."
          onChange={(e) => setCpf(e.target.value)}
        />
        <ButtonFlex>
          <button type="submit" data-identifier="reservation-btn" >Reservar assento(s)</button>
        </ButtonFlex>
      </Form>
      <Footer>
        <img src={movie.posterURL} alt={movie.title} />
        <div>
          <p>{movie.title}</p>
          <p>
            {date.weekday} - {items.name}
          </p>
        </div>
      </Footer>
    </>
  )
}

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    color: #293845;
    font-size: 24px;
    margin: 25px 0 15px 0;
  }
`

const Footer = styled.div`
  position: absolute;
  width: 100%;
  height: 117px;
  background: #dfe6ed;
  position: fixed;
  bottom: 0;
  display: flex;
  font-size: 22px;
  align-items: center;
  padding-left: 10px;
  img {
    width: 48px;
    height: 72px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    border: 8px solid white;
  }
  p {
    margin-left: 10px;
  }
`

const AllSeats = styled.div`
  margin: 0 21px 0 24px;
  display: flex;
  flex-wrap: wrap;
`

const Seat = styled.div`
  width: 26px;
  height: 26px;
  background: ${(props) => props.color};
  border: 1px solid #808f9d;
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  margin: 10px 3px 10px 3px;
  cursor: pointer;
`
const Subtitle = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 16px 35px 0px 35px;
`

const Select = styled.div`
  width: 25px;
  height: 25px;
  background: #1aae9e;
  border: 1px solid #0e7d71;
  border-radius: 17px;
`

const Avaliable = styled.div`
  width: 24px;
  height: 24px;
  background: #c3cfd9;
  border: 1px solid #7b8b99;
  border-radius: 17px;
`

const Unavailable = styled.div`
  width: 24px;
  height: 24px;
  background: #fbe192;
  border: 1px solid #f7c52b;
  border-radius: 17px;
`

const SubtitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    margin-top: 10px;
    font-size: 13px;
  }
`
const Form = styled.form`
  margin: 0 21px 117px 24px;
  display: flex;
  padding: 4px;
  justify-content: center;
  flex-direction: column;
  margin-top: 25px;

  label {
    font-size: 18px;
    margin-top: 12px;
    margin-bottom: 5px;
  }
  input {
    width: 327px;
    height: 51px;
    border-radius: 3px;
    outline: none;
    border: 1px solid #d5d5d5;
  }

  button {
    width: 225px;
    height: 42px;
    border: none;
    font-size: 18px;
    background-color: #e8833a;
    border-radius: 3px;
  }
`
const ButtonFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`
