import { ticketsMetadata } from "@/modules/core/data/ticketsMetadata";

/*
  General types for general uses
*/
export type TicketType = keyof typeof ticketsMetadata;
