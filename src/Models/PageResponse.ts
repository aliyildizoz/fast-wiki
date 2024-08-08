import PageModel from "./PageModel"

export default class PageResponse {

    PageModel: PageModel = new PageModel()
    IsExistsMatch: boolean = false
    IsExistsImage: boolean = false
    SearchComplete: boolean = false

}