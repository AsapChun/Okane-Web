import { Col } from "react-bootstrap"

interface PropsInterface  {
  NetWorth: number,
  plaidLinked: string,
}

const NetWorth: React.FC<PropsInterface> = (
  props: PropsInterface
) => {
  let plaidLinked = props.plaidLinked;
  return(
    <>
      <Col md="5" className = "p-0" style={{
        fontFamily: 'Poppins',
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "20px",
        lineHeight: "24px"
      }}>
        Net Worth:
      </Col>
      <Col md="6" className = "p-0 m-0" style={{
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '20px',
        lineHeight: '200%',
        color: '#2D3A6F',
      }}>
        ${plaidLinked === "false" ?  5000 : (props.NetWorth).toFixed(0)}
      </Col>
    </>
  )
}

export default NetWorth