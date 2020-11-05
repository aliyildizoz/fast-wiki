/*
***** Not:&redirects= bu propu her zaman kullan.(sayfanın adını vs her şeye duyarsız yapar)***

    1)Main Image
        - bu url ile sayfadaki resimlerin adları vedosya uzantıları alıyoruz (burada döndürülen resimler içinde ana sayfa ilgili olan resim için arama gerekli).
            https://en.wikipedia.org/w/api.php?action=query&titles="Buraya sayfanın adı geliyor."&format=json&prop=images
        - bu url ile yukarıdaki resimlerin her birinin urlini adını yazarak alıyoruz
            https://en.wikipedia.org/w/api.php?action=query&format=json&titles=File:"Buraya resmin adı geliyor"&prop=imageinfo&iiprop=url
        
        - İkinci yol olarak direkt buradan resimi getirebiliriz (en iyi çözüm)
            https://en.wikipedia.org/w/api.php?action=query&titles=ali&prop=pageimages&format=json&piprop=original 
    2)Summary

        - exchars: döndürülecek karekter sayısı
        - exsentences:döndürülecek cümle sayısı(kullanılabilir)
        - exintro:bunu kullanmazsak tüm sayfayı getirir.(exsentences=5) bununla kullanırsak özeti olmayan içeriklerde gelir. 
            https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&titles="burada sayfanın adı gelir"&redirects=&exsentences=10
        
        - Sayfa getirirken önce buraya istek atılıp en uygun başlığa sahip olan sayfa  getirilip onun üzerinden yukarıdaki işlem yapılır. 
            https://en.wikipedia.org/w/api.php?format=json&action=query&redirects=&list=search&srsearch=Diyarbak%C4%B1r%20castle&srlimit=50&origin=* 

*/
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