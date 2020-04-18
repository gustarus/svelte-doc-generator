import UsagePartial from '../partials/UsagePartial';
import MainPartial from '../partials/MainPartial';
import DescriptionPartial from '../partials/DescriptionPartial';

export type PartialType = UsagePartial | MainPartial | DescriptionPartial;

export type PartialClassType = typeof UsagePartial | typeof MainPartial | typeof DescriptionPartial;
