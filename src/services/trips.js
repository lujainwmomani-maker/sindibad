export async function getTrips({ signal } = {}) {
  const response = await fetch("/api/trips", { signal });

  if (!response.ok) {
    throw new Error(`Failed to load trips (${response.status})`);
  }

  const trips = await response.json();

  if (!Array.isArray(trips)) {
    throw new Error("Expected a list of trips");
  }

  return trips;
}

 
// Arabic copy for the seeded demo trip. Other trips use translations from the API when available.
export function localizeTrip(trip, language) {
  if (!trip || language !== "ar") return trip;

  const isDemo = trip.title === "Wadi Rum Stargazing (Demo)" &&
    trip.guideName === "Demo Guide";

  return {
    ...trip,
    title: trip.titleAr?.trim() || (isDemo ? "ليلة تحت نجوم وادي رم (رحلة تجريبية)" : trip.title),
    description: trip.descriptionAr?.trim() || (isDemo ? "أمسية في وادي رم لمشاهدة النجوم والاستمتاع بهدوء الصحراء." : trip.description),
    guideName: trip.guideNameAr?.trim() || (isDemo ? "مرشد تجريبي" : trip.guideName),
  };
}
