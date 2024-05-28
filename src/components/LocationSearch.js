import { SearchOutlined } from "@ant-design/icons";
import {  Button, Col, Input, Row } from "antd";
import { useState } from "react";

const LocationSearch = ({onSearch}) => {

    const [cgi, setCgi] = useState(null);
    const [filter, setFilter] = useState(null);
    

    const handleChange = (value) => {
        setCgi(value);
        let values = value.split("-")
        if (values.length === 4) {
        setFilter({MCC: values[0], MNC: values[1], LAC: values[2], CI: values[3]});
        }
        else{
            alert("Hatalı giriş! Lütfen doğru şekilde giriniz.");
        }
    };

    
    // 286-3-21769-18150953
    const onSearchBtnClick = () => {
        onSearch(filter)
    }

    return(
    <>
        <Row style={{  height: "130px" }}>
            <Col>
                
                <span>CGI: </span>
                <Input name="cgi" value={cgi} onChange={(e) => handleChange(e.target.value)}/>
                <h4>Örnek değer: 286-3-21769-18150953 </h4>
                <Button  type="number" style={{marginLeft: 5}} icon={<SearchOutlined/>} onClick={onSearchBtnClick}>Ara</Button>
                
            </Col>
        </Row>
    </>
    )
}
export default LocationSearch;