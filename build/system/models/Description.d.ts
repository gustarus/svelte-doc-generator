import Base from '../base/Base';
export declare namespace DescriptionSpace {
    type Config = {
        comments: Data[];
    };
    type Data = {
        type: string;
        value: string;
    };
}
export default class Description extends Base<DescriptionSpace.Config> {
    comments: DescriptionSpace.Data[];
    get markdown(): string;
}
