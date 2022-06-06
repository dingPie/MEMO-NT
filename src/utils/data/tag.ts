import { IMemo, ITag } from "../interface/interface";
import { dummyTags } from "./dummyData";

class Tag {
  findTag (memo: IMemo, tagArr?: ITag[]) {
    const tags = dummyTags; 
    return tags.filter(v => v.id === memo.tagId )[0];
  }

  tagName (tag: ITag) {
    if (tag.id === "timeBomb") return ""
    else if (tag.id === "undefined") return ""
    else return tag.name
  }
}

export default Tag;