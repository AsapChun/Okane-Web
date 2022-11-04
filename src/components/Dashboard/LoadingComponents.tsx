import { Row, Col} from "react-bootstrap";

interface PropsInterface  {
    isVisible: string;
}

const LoadingComponents: React.FC<PropsInterface> = (
    props: PropsInterface
) => {

    return(
            <Row className={props.isVisible} style={{
                    display: "flex",
                    flexWrap: "wrap",
                    minWidth: "100%",
                    margin: "0px !important",
                    padding: "0px !important",
                    minHeight: "500px",
                    height: "500px"
        }}>
            <Col xs= "12" md="12" style = {{
                background: "#FFFFFF",
                border: "1px solid #E5E5E5",
                // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "5px",
                minHeight: "100%",
                height: "100%",
                overflow: "hidden",
                paddingLeft: "400px",
                paddingRight: "400px",
                paddingTop: "50px",
                maxWidth: "100%",
                minWidth: "100%",
                marginBottom: "20px",
                margin: "0px !important",
                textAlign: "center"
            }}>
                <Row style={{
                    display: "block",
                    padding: "100px"
                }}>
                <div id ="loadingIn" className = "overallContainer">
                        <div className="row header loadingInHeader">    
                            <div className="logo align-items-center">
                                <img className = "logo_img loadingInLogo" src="images/okane_logo.png" alt="Okane"></img>
                            </div>
                            <div className = "loadingText">
                                Loading
                            </div> 
                        </div>
                </div>
                </Row>
            </Col>
        </Row>
    )
}

export default LoadingComponents;