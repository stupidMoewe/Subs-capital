import { Request, Response } from "express";

export type MyContext = {
	req: Request;
	res: Response;
};

export interface V3Token {
	id: string;
	name: string;
	symbol: string;
	volumeUSD: string;
	logoURI: string;
	decimals: string;
}
