/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import SearchModel from '../Models/SearchModel';
import IWikipediaService from '../Services/IWikipediaService';
import Autosuggest from "react-autosuggest"
interface IProps {
    wikiService: IWikipediaService,
    theme?: any,
    history?: any
}
interface IState {
    searchRes: Array<SearchModel>,
    query: string
}

const getSuggestionValue = (suggestion: SearchModel) => suggestion.Title;

const renderSuggestion = (suggestion: SearchModel) => (
    <div>
        {suggestion.Title}
    </div>
);
export default class Home extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            searchRes: [],
            query: ""
        };
    }

    onChange = (event: any, { newValue, method }: { newValue: string, method: string }) => {
        this.setState({
            ...this.state,
            query: newValue
        }, () => {
            if (method === "click") {
                this.redirectContent();
            }
        });
    };
    getSuggestions = (value: string, searchRes: SearchModel[], showCount: number) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : searchRes.filter(model =>
            model.Title.toLowerCase().slice(0, inputLength) === inputValue
        ).slice(0, showCount);
    };
    onSuggestionsFetchRequested = ({ value }: { value: string }) => {

        if (value !== "") {
            this.setState({ ...this.state, query: value }, () => {
                this.props.wikiService.PrefixSearch(this.state.query).then((val) => {
                    this.setState({ ...this.state, searchRes: this.getSuggestions(value, val.Results, 5) })
                })
            })
        }
    }
    onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.redirectContent()
    }
    redirectContent = () => this.state.query !== "" ? this.props.history.push("/" + encodeURIComponent(this.state.query.replaceAll(" ", "_"))) : null;
    onSuggestionsClearRequested = () => {
        this.setState({
            searchRes: []
        });
    };
    render() {
        const inputProps = {
            placeholder: 'search something',
            value: this.state.query,
            onChange: this.onChange,
            type: "Search"
        };
        return <div className="d-flex">
            <Row>
                <Form onSubmit={this.onSubmitHandler} className="d-flex">
                    <Autosuggest
                        suggestions={this.state.searchRes}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        getSuggestionValue={getSuggestionValue}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                        id="searchInput"
                        theme={this.props.theme}
                        highlightFirstSuggestion
                    />
                    <Button type="submit" className="btn-sm btn-dark" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, height: 40 }}>
                        <svg width="2em" height="1em" viewBox="0 0 16 16" className="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z" />
                            <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                        </svg>
                    </Button>
                </Form>
            </Row>
        </div>


    }
}






