import IWikipediaService from "./IWikipediaService";
import WikiApiEndPoints from "./WikiApiEndPoints";
import SearchResponse from "../Models/SearchResponse";
import ContentModel from "../Models/ContentModel";
import PageResponse from "../Models/PageResponse";
import ImageResponse from "../Models/ImageResponse";
import SearchModel from "../Models/SearchModel";

export default class WikipediaService implements IWikipediaService {

    ApiEndPoints: WikiApiEndPoints;
    constructor() {
        this.ApiEndPoints = new WikiApiEndPoints();
    }
    GetContent(title: string): Promise<ContentModel> {
        var contentModel = new ContentModel()
        var res = fetch(this.ApiEndPoints.GetContentUrl(title, 5)).then(async (val: Response) => {
            var res = await val.json();
            if (res.query !== null) {
                var content = Object.values(res.query.pages)[0] as any;
                if (content != null) {
                    if (content.extract) {
                        contentModel.Summary = content.extract;
                    }
                }
            }
            return contentModel;
        })
        return res;
    }
    private ArrayUnique(array: Array<SearchModel>): Array<SearchModel> {

        return array.filter((val: SearchModel, index, self) =>
            index === self.findIndex((t) => (
                t.Title === val.Title && t.PageId === val.PageId
            ))
        );
    }
    Find(title: string): Promise<PageResponse> {
        var pageRes = new PageResponse()
        var res = this.PrefixSearch(title).then(async (searchRes: SearchResponse) => {
            var psSearch = await searchRes.Results;
            var search = this.Search(title);
            if (psSearch.length > 0) {
                var firstTitle = psSearch[0].Title

                if (firstTitle != null && firstTitle !== "" && firstTitle.toLowerCase().includes(title.toLowerCase())) {
                    pageRes.IsExistsMatch = true;
                    pageRes.PageModel.Title = firstTitle;
                    pageRes.PageModel.Url = this.ApiEndPoints.GetPageUrl(firstTitle)
                    var content = this.GetContent(firstTitle);
                    var image = this.GetMainImage(firstTitle);

                    pageRes.PageModel.Content = await content;
                    pageRes.PageModel.Image = (await image).ImageModel;
                    pageRes.IsExistsImage = (await image).IsExistsMatch;
                }
            }

            pageRes.PageModel.SimilarTitles = this.ArrayUnique([...(await search).Results, ...psSearch]);
            return pageRes;
        });

        return res;
    }

    private Search(title: string): Promise<SearchResponse> {
        let searchResponse = new SearchResponse();
        searchResponse.SearchText = title;
        var res = fetch(this.ApiEndPoints.GetSearchUrl(title)).then(async (val: Response) => {
            var query = Object.entries(await val.json()).find((val: [string, any]) => val[0] === "query")?.[1]
            if (query != null) {
                var searchRes = Object.entries(query as Object).find((val: [string, any]) => val[0] === "search")?.[1]
                if (searchRes != null) {
                    (searchRes as []).forEach((val: { pageid: number, title: string }) =>
                        searchResponse.Results.push({ PageId: val.pageid, Title: val.title }))
                }
            }
            return searchResponse;
        });
        return res;
    }
    GetMainImage(title: string): Promise<ImageResponse> {
        var image = new ImageResponse()

        var res = fetch(this.ApiEndPoints.GetMainImageUrl(title)).then(async (val: Response) => {
            var res = await val.json();
            if (res.query !== null) {
                var pages = Object.values(res.query.pages)[0] as any;
                if (pages != null) {
                    if (pages.original) {
                        image.ImageModel.Src = pages.original.source;
                        image.ImageModel.Height = pages.original.height;
                        image.ImageModel.Width = pages.original.width;
                        image.IsExistsMatch = true;
                    }
                }
            }
            return image;
        })

        return res;
    }
    PrefixSearch(searchText: string): Promise<SearchResponse> {
        let searchResponse = new SearchResponse();
        searchResponse.SearchText = searchText;

        var res = fetch(this.ApiEndPoints.GetPsSearchUrl(searchText)).then(async (val: Response) => {
            var query = Object.entries(await val.json()).find((val: [string, any]) => val[0] === "query")?.[1]
            if (query != null) {
                var pssearchRes = Object.entries(query as Object).find((val: [string, any]) => val[0] === "prefixsearch")?.[1]
                if (pssearchRes != null) {
                    (pssearchRes as []).forEach((val: { pageid: number, title: string }) =>
                        searchResponse.Results.push({ PageId: val.pageid, Title: val.title }))
                }
            }
            return searchResponse;
        });
        return res;
    }

}