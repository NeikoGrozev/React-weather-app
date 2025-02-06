import express, { Request, Response } from "express";
import {
  getAutocomplateSearch,
  getSearchLocation,
} from "../helpers/cityHelper";
import { BAD_REQUEST, INTERNAL_ERROR } from "../constants/statusCode";

const router = express.Router();

router.get("/search-locations", async (req: Request, res: Response) => {
  const { query }: { query?: string } = req.query;
  try {
    if (typeof query !== "string" || !query.trim()) {
      res.status(BAD_REQUEST).json({ error: "Missing query parameter" });
    }

    const searchLocation = await getSearchLocation(query as string);
    const searchLocationData = await searchLocation.json();

    res.json(searchLocationData);
  } catch {
    res.status(INTERNAL_ERROR).json({ error: "Failed to fetch products" });
  }
});

router.get("/autocomplete", async (req: Request, res: Response) => {
  const { query }: { query?: string } = req.query;
  try {
    if (typeof query !== "string" || !query.trim()) {
      res.status(BAD_REQUEST).json({ error: "Missing query parameter" });
    }

    const autocomplateResponse = await getAutocomplateSearch(query as string);
    const autocomplateResponseData = await autocomplateResponse.json();

    res.json(autocomplateResponseData);
  } catch {
    res.status(INTERNAL_ERROR).json({ error: "Failed to fetch products" });
  }
});

export default router;
