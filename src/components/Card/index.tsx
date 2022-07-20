import './style.css'

export type PropsType = {
  id: number,
  nome: string,
  time: string
}

export function Card(props: PropsType) {
  return (
    <div className='card'>
      <small>{props.id}</small>
      <strong>{props.nome}</strong>
      <small>{props.time}</small>
    </div>
  )
}
