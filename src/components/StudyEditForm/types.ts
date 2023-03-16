import type { Study } from "../../utils/types";

export type SimpleStudy = Omit<Study, "id">;
