export enum TrackStatusEnum {
  // Fase de Importação e Alfândega
  ELECTRONIC_INFO_SENT = 'electronic_info_sent',
  POSTED = 'posted',
  LEFT_INTERNATIONAL_CENTER = 'left_international_center',
  RECEIVED_IN_BRAZIL = 'received_in_brazil',
  SENT_TO_CUSTOMS = 'sent_to_customs',
  CUSTOMS_CLEARED = 'customs_cleared',
  AWAITING_PAYMENT = 'awaiting_payment',
  PAYMENT_CONFIRMED = 'payment_confirmed',
  CUSTOMS_FINISHED = 'customs_finished',

  // Fase de Trânsito Nacional e Entrega
  IN_TRANSIT = 'in_transit',
  AT_DISTRIBUTION_CENTER = 'at_distribution_center',
  DELIVERY_ROUTE = 'delivery_route',
  DELIVERED = 'delivered',

  // Exceções e Problemas
  NOT_ARRIVED_AT_UNIT = 'not_arrived_at_unit',
  AWAITING_PICKUP = 'awaiting_pickup',
  DELIVERY_FAILED_ABSENT = 'delivery_failed_absent',
  INCORRECT_ADDRESS = 'incorrect_address',
  IMPORT_REJECTED = 'import_rejected',
  RETURNED_TO_ORIGIN = 'returned_to_origin',
  LOST_OR_STOLEN = 'lost_or_stolen',

  // Desconhecido
  UNKNOWN = 'unknown',
}
