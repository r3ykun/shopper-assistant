import {
    PRODUCT_UNIT_METADATA,
} from "./units";

export const PRODUCT_UNIT_DROPDOWN_ITEMS =
    PRODUCT_UNIT_METADATA.map(unit => ({

        label: unit.name,

        value: unit.name,

        keywords: unit.aliases,

        section: unit.group,

    }));