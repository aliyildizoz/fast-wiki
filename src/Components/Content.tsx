import React, { FunctionComponent, useEffect,  useRef, useState } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router";
import PageResponse from "../Models/PageResponse";
import SearchModel from "../Models/SearchModel";
import IWikipediaService from "../Services/IWikipediaService";
import { Link } from "react-router-dom";


const Content: FunctionComponent<{ wikiService: IWikipediaService }> = ({ wikiService }) => {
    let { title }: { title: string } = useParams();
    const sumRef = useRef<HTMLDivElement>(null);
    const [pageResponse, setPageResponse] = useState<PageResponse>(new PageResponse())
    useEffect(() => {
        const current = sumRef.current;
         var res = new PageResponse();
                setPageResponse(res)
                if (current) {
            current.innerHTML = "<i>Loading...</i>"
            if (title) {
                wikiService.Find(decodeURIComponent(title).replaceAll("_", " ")).then((res: PageResponse) => {
                    if (res.IsExistsMatch) {
                        current.innerHTML = res.IsExistsImage ?
                            "<img class=\"card-img float-left mr-2 mb-1\" src=\"" + res.PageModel.Image.Src + "\" style=\"width: 10em;\">" + res.PageModel.Content.Summary + "</img>" :
                            res.PageModel.Content.Summary;
                    } else {
                        current.innerHTML = "<i>The page does not exist.</i>"
                    }
                    setPageResponse(res);

                })
            } else {
               
                current.innerHTML = "<i>Please search for something.</i>"
            }
        }

    }, [sumRef, title, setPageResponse, wikiService])

    return (
        <Row className="pl-0">
            <Col md="8" >
                <Card>
                    <Card.Header as="h5" className="bg-info text-light ">Summary</Card.Header>
                    <Card.Body >
                        {!pageResponse.IsExistsMatch ? "" : <Card.Title as="h5" className="text-center">{pageResponse.PageModel.Title}</Card.Title>}
                        <p className="card-text text-justify font-weight-normal" ref={sumRef}></p>
                        {pageResponse.IsExistsMatch ? <a href={pageResponse.PageModel.Url} className="float-right" target="_blank">show to wikipedia</a> : null}
                    </Card.Body>
                </Card>
            </Col>
            <Col md="4" >
                <Row>
                    <Col> <Card>
                        <Card.Header as="h5" className="bg-info text-light">{(title ? "Similar " : "Sample ") + "Titles"}</Card.Header>
                        <Card.Body className="pr-1 pl-2" >
                            <Card.Text>
                                {!pageResponse.IsExistsMatch && title ? <i>Loading...</i> :
                                    pageResponse.PageModel.SimilarTitles.length > 0 ? pageResponse.PageModel.SimilarTitles.map((val: SearchModel) => {
                                        return <Link className="d-inline-flex  text-decoration-none" to={"/" + encodeURIComponent(val.Title.replaceAll(" ", "_"))} key={val.PageId}>
                                            <Badge data-toggle="tooltip" title={val.Title} variant="light similartitle mr-2" >{val.Title.length > 35 ? val.Title.slice(0, 32) + "..." : val.Title}</Badge>
                                        </Link>
                                    }) : <i>The Similar titles not found.</i>
                                }
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}


export default Content;