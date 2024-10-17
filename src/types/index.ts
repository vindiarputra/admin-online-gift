import React from "react";

type TableHeadType = {
	tableName: string;
	columns: string[];
};
export interface TableDataType {
	[key: string]: {
		id: string;
		label: string;
		date?: string;
		actions?: React.ReactNode;
	}[];
}
