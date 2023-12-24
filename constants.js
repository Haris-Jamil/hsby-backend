const errorCodes = {
  BAD_REQEUST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const monthLetter = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "M",
];

const order_status = [
  "New booked",
  "Parcel received at office",
  "Parcel in transit to destination",
  "Parcel received at destination",
  "Out for delivery",
  "Delivered",
  "Returned to the shipper",
  "Parcel return to office",
  "Refused by consignee",
  "Re-attempt",
  "Return received at origin",
  "Return in process",
  "Consignee not responding",
  "Picked up",
  "Ready for pickup",
];

module.exports = { errorCodes, monthLetter, order_status };
