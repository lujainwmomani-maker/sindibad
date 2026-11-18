import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";
import { categoryLabelsAr } from "../data/homeData";
import { getTrips, localizeTrip } from "../services/trips";
import "../pages/Home.css";

const initials = (name) =>
  name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

export default function TripListings({ standalone = false }) {
  const { language, isArabic } = useSettings();
  const Heading = standalone ? "h1" : "h2";

  const [cat, setCat] = useState(null);
  const [trips, setTrips] = useState([]);
  const [tripsStatus, setTripsStatus] = useState("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    getTrips({ signal: controller.signal })
      .then((data) => {
        if (controller.signal.aborted) return;
        setTrips(data);
        setTripsStatus("ready");
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setTripsStatus("error");
        }
      });

    return () => controller.abort();
  }, [attempt]);


  const tripCategories = new Map();
  for (const trip of trips) {
    if (trip.categoryId != null && trip.categoryName) {
      tripCategories.set(trip.categoryId, trip.categoryName);
    }
  }

  const shown =
    cat === null ? trips : trips.filter((trip) => trip.categoryId === cat);

  const dateFormatter = new Intl.DateTimeFormat(isArabic ? "ar-JO" : "en-US", {
    day: "numeric",
    month: "short",
  });

  function formatTripDate(value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : dateFormatter.format(date);
  }

  const text = (ar, en) => (isArabic ? ar : en);

  return (
    <section className="section container">
      <div className="sec-head">
        <div>
          <span className="eyebrow">
            {text("رحلات بمجموعات صغيرة", "Curated small groups")}
          </span>

          <Heading>{standalone ? text("الرحلات", "Trips") : text("اختر مغامرتك القادمة", "Handcrafted Expeditions")}</Heading>

          <p>
            {text(
              "استكشف الرحلات القادمة واختر التجربة اللي بتناسبك.",
              "Explore upcoming trips and find the experience that suits you.",
            )}
          </p>
        </div>

        {tripsStatus === "ready" && trips.length > 0 && (
          <div className="chips">
            <button
              type="button"
              className={cat === null ? "chip on" : "chip"}
              aria-pressed={cat === null}
              onClick={() => setCat(null)}
            >
              {text("كل الرحلات", "All Trips")}
            </button>
            {Array.from(tripCategories, ([id, name]) => (
              <button
                type="button"
                key={id}
                className={cat === id ? "chip on" : "chip"}
                aria-pressed={cat === id}
                onClick={() => setCat(id)}
              >
                {isArabic ? categoryLabelsAr[name] || name : name}
              </button>
            ))}
          </div>
        )}
      </div>

      {tripsStatus === "loading" && (
        <p role="status">{text("جارٍ تحميل الرحلات…", "Loading trips…")}</p>
      )}

      {tripsStatus === "error" && (
        <div>
          <p role="alert">
            {text(
              "ما قدرنا نحمّل الرحلات. جرّب مرة ثانية.",
              "We couldn't load the trips. Please try again.",
            )}
          </p>
          <button
            type="button"
            className="btn btn-blue"
            onClick={() => {
              setTripsStatus("loading");
              setAttempt((current) => current + 1);
            }}
          >
            {text("إعادة المحاولة", "Try again")}
          </button>
        </div>
      )}

      {tripsStatus === "ready" && (
        <div className="cards3">
          {shown.map((trip) => localizeTrip(trip, language)).map((trip) => (
            <article className="card" key={trip.tripId}>
              <div className="trip-img">
                {trip.tripImageUrl && (
                  <img
                    src={trip.tripImageUrl}
                    alt=""
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
                {trip.startDate && (
                  <span className="date">
                    {formatTripDate(trip.startDate)}
                    {trip.endDate && <> – {formatTripDate(trip.endDate)}</>}
                  </span>
                )}
              </div>

              <div className="card-body">
                <h3><bdi>{trip.title}</bdi></h3>
                {trip.description && <p><bdi>{trip.description}</bdi></p>}

                <div className="trip-card-footer">
                  {trip.guideName && (
                    <div className="guide-mini">
                      <span className="avatar">{initials(trip.guideName)}</span>
                      <strong><bdi>{trip.guideName}</bdi></strong>
                    </div>
                  )}
                  <Link
                    to={`/checkout/${trip.tripId}`}
                    className="trip-summary-link"
                  >
                    {text("عرض ملخّص الرحلة", "View trip summary")}
                  </Link>
                </div>
              </div>
            </article>
          ))}

          {shown.length === 0 && (
            <p role="status">
              {trips.length === 0
                ? text(
                    "ما في رحلات متاحة حاليًا.",
                    "No trips are available right now.",
                  )
                : text(
                    "ما في رحلات ضمن هذا التصنيف حاليًا.",
                    "No trips in this category right now.",
                  )}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
