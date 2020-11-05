import React, { Component, FunctionComponent } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import IWikipediaService from '../Services/IWikipediaService'
import Search from '../Components/Search'
import Content from '../Components/Content'

interface IProps {
    route?: any
    WikiService: IWikipediaService
}
interface IState {

}

export default class Home extends Component<IProps, IState> {
    state = {}

    render() {
        const wikiService = this.props.WikiService;
        const history = this.props.route.history;
        return (

            <Container className="mb-5">
                <Row className="mb-3">
                    <Col md="2">
                        <GoBackButton className="float-right" goBack={history.goBack} />
                    </Col>
                    <Col md={{ span: 6, offset: 1 }} >
                        <Search wikiService={wikiService} history={history} />
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 10, offset: 1 }}>
                        <Content wikiService={wikiService} />
                    </Col>
                </Row>
            </Container>
        )
    }
}
const GoBackButton: FunctionComponent<{ className?: string, goBack: any }> = ({ className, goBack }) => <Button className={"btn-sm btn-success " + (className ? className : "")} onClick={() => goBack()}>
    <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
    </svg>
</Button>