export const createMapsUrl = (lat: number, long: number, zoom = 13) => {
  return `https://www.google.com/maps/@${lat},${long},${zoom}z`;
};
