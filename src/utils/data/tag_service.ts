import { IMemo, ITag } from "../interface/interface";
import { dummyTags } from "./dummyData";

class TagService {
  findTag (tagId: string, tagArr?: ITag[]) {
    const tags = dummyTags; 
    return tags.filter(v => v.id === tagId )[0];
  }

  tagName (tag: ITag) {
    if (tag.id === "timeBomb") return ""
    else if (tag.id === "undefined") return ""
    else return tag.name
  }
}

export default TagService;