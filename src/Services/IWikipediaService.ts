import SearchResponse from "../Models/SearchResponse";
import ImageResponse from "../Models/ImageResponse";
import ContentModel from "../Models/ContentModel";
import PageResponse from "../Models/PageResponse";

export default interface IWikipediaService {

    PrefixSearch(searchText: string): Promise<SearchResponse>;
    Find(title: string): Promise<PageResponse>;
    GetMainImage(title: string): Promise<ImageResponse>;
    GetContent(title: string): Promise<ContentModel>;

}