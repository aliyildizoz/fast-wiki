import ContentModel from "./ContentModel";
import ImageModel from "./ImageModel";
import SearchModel from "./SearchModel";

export default class PageModel {

    constructor() {
        this.SimilarTitles = new Array<SearchModel>()

        this.SimilarTitles.push(...[
            { Title: "Albert Einstein", PageId: 1 },
            { Title: "Isaac Newton", PageId: 2 },
            { Title: "Stephen Hawking", PageId: 3 },
            { Title: "Nikola Tesla", PageId: 4 },
            { Title: "Albert Camus", PageId: 5 },
            { Title: "Charles Darwin", PageId: 6 }
        ])
    }
    Image: ImageModel = new ImageModel()
    Content: ContentModel = new ContentModel()
    SimilarTitles: Array<SearchModel>
    Title: string = ""
    Url: string = ""
    PageId: number = 0

}

