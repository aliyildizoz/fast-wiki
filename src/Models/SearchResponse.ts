import SearchModel from "./SearchModel";

export default class SearchResponse {

    SearchText!: string;
    Results: Array<SearchModel> = new Array<SearchModel>();
}

