import { convertToRFC5545 } from "../utils/dateUtils";

import { NextFunction, Request, Response } from "express";
import {
  fetchAllEvents,
  fetchEventById,
  createEvent,
  updateEvent,
  eraseEvent
} from "../models/events.models";

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const unParsedEvents = await fetchAllEvents();

    const events = unParsedEvents.map((event) => ({
      ...event,
      price: parseFloat(event.price),
    }));

    res.status(200).send({ events });
  } catch (error: any) {
    console.log(error)
    res.status(500).send({ error: "Error fetching events" });
  }
};

export const getEventById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const unParsedEvent = await fetchEventById(id);

    const event = {
      ...unParsedEvent,
      price: parseFloat(unParsedEvent.price),
    };

    res.status(200).send({ event });
  } catch (error: any) {
    next(error);
  }
};

export const postEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      owner_id,
      title,
      description,
      price,
      location_type,
      city,
      region,
      tickets_remaining,
      capacity,
      category,
      start_datetime,
      end_datetime,
      address,
      photo_1_url,
      photo_2_url,
      photo_3_url,
    } = req.body;

    const eventReq = {
      owner_id: owner_id,
      title: title,
      description: description,
      price: price,
      location_type: location_type,
      city: city,
      region: region,
      tickets_remaining: tickets_remaining,
      capacity: capacity,
      category: category,
      start_datetime: start_datetime,
      end_datetime: end_datetime,
      address: address,
      photo_1_url: photo_1_url,
      photo_2_url: photo_2_url,
      photo_3_url: photo_3_url,
    };
    
    
    const PSQLevent = await createEvent(eventReq);
   

    const newEvent = {
      ...PSQLevent,
      price: parseFloat(PSQLevent.price),
      start_datetime: convertToRFC5545(PSQLevent.start_datetime),
      end_datetime: convertToRFC5545(PSQLevent.end_datetime),
    };

   

    res.status(201).send({ newEvent });
  } catch (error: any) {
    
    next(error)
  }
};


export const patchEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedRequest = req.body;

    const PSQLevent = await updateEvent(id, updatedRequest);

    const updatedEvent = {
      ...PSQLevent,
      price: parseFloat(PSQLevent.price),
      start_datetime: convertToRFC5545(PSQLevent.start_datetime),
      end_datetime: convertToRFC5545(PSQLevent.end_datetime),
    };

    res.status(200).send({ updatedEvent });
  } catch (error: any) {
    next(error);
  }
};

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const { id } = req.params;

    ;
    if (isNaN(parseInt(id))) {
      next({ status: 400, msg: "Bad Request: id must be a number" });
    }

    await eraseEvent(id);
    res.status(200).send();
  } catch (error: any) {
    next(error);
  }
};