import { NextFunction, Request, Response } from "express";
import { fetchAllEvents, fetchEventById } from "../models/events.models";

export const getAllEvents = async (req: Request, res: Response) => {
    try {
        const unParsedEvents = await fetchAllEvents();

        const events = unParsedEvents.map((event) => ({
            ...event,
            price: parseFloat(event.price),
          }));
        
        res.status(200).send({ events });
    } catch (error: any) {
        res.status(500).send({ error: "Error fetching events" });
    }
};

export const getEventById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const unParsedEvent = await fetchEventById(id);

        const event = {
            ...unParsedEvent,
            price: parseFloat(unParsedEvent.price),
          };

        res.status(200).send({ event });
    } catch (error: any) {
        next(error)
    }
};