export default class WikiApiEndPoints {

    ApiUrl: string
    ApiLang: ApiLang
    public constructor(apiLang: ApiLang = ApiLang.en) {
        this.ApiLang = apiLang;
        this.ApiUrl = "https://" + apiLang.valueOf() + ".wikipedia.org/w/api.php?origin=*"
    }

    public GetPsSearchUrl(searchText: string, srlimit: number = 10): string {
        var params = {
            action: "query",
            list: "prefixsearch",
            pssearch: encodeURIComponent(searchText),
            format: "json",
            srlimit: srlimit
        };
        var url = this.CreateUrl(params)
        return url;
    }
    public GetSearchUrl(searchText: string, srlimit: number = 20): string {
        var params = {
            action: "query",
            list: "search",
            srsearch: encodeURIComponent(searchText),
            format: "json",
            redirects: "",
            srlimit: srlimit
        };
        var url = this.CreateUrl(params)
        return url;
    }
    public GetContentUrl(title: string, exsentences: number = 0, exintro: boolean = false): string {
        var params = {
            action: "query",
            prop: "extracts",
            titles: encodeURIComponent(title),
            format: "json",
            redirects: "",
        };
        var url = this.CreateUrl(params)
        url += exintro ? "&exintro=" : "";
        url += exsentences !== 0 ? "&exsentences=" + exsentences : "";
        // console.log(url)
        return url;
    }
    public GetMainImageUrl(title: string): string {
        var params = {
            action: "query",
            prop: "pageimages",
            titles: encodeURIComponent(title),
            format: "json",
            redirects: "",
            piprop: "original"
        };
        var url = this.CreateUrl(params)
        // console.log(url)
        return url;
    }
    private CreateUrl(params: object): string {
        var url: string = this.ApiUrl;
        Object.entries(params).forEach((key: [string, string]) => {
            url += "&" + key[0] + "=" + key[1];
        });
        return url;
    }
    public GetPageUrl = (title: string) =>
        "https://en.wikipedia.org/wiki/" + title.replaceAll(" ", "_");
}

export enum ApiLang {
    en = "en",
    tr = "tr"
}