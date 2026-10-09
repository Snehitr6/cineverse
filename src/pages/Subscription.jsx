
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  Crown,
  Sparkles,
  Zap,
  ShieldCheck,
  Monitor,
  Smartphone,
  BadgeCheck,
  ArrowRight,
  CircleHelp,
} from "lucide-react";

const PLANS = {
  Free: {
    monthly: 0,
    yearly: 0,
    description: "Explore the CINEVERSE collection.",
    features: [
      "Browse the movie collection",
      "Create a personal watchlist",
      "Standard video quality",
      "One profile",
    ],
  },
  Standard: {
    monthly: 149,
    yearly: 1490,
    description: "More entertainment for every day.",
    features: [
      "Everything in Free",
      "Full HD streaming where available",
      "Up to 2 supported screens",
      "Continue Watching",
      "Personalized recommendations",
    ],
  },
  Premium: {
    monthly: 249,
    yearly: 2490,
    description: "The complete cinematic experience.",
    features: [
      "Everything in Standard",
      "4K quality where available",
      "Up to 4 supported screens",
      "Premium viewing experience",
      "Priority feature access",
      "Multiple profiles",
    ],
  },
};

const COMPARISON = [
  ["Browse movies and series", true, true, true],
  ["Personal watchlist", true, true, true],
  ["Continue Watching", true, true, true],
  ["Full HD playback", false, true, true],
  ["4K playback where available", false, false, true],
  ["Simultaneous screens", "1", "2", "4"],
  ["Multiple profiles", false, false, true],
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(price);

export default function Subscription() {
  const [billing, setBilling] = useState("yearly");
  const [activePlan, setActivePlan] = useState("Free");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem("cineverse-subscription");
      if (savedPlan && PLANS[savedPlan]) setActivePlan(savedPlan);
    } catch {
      // The page still works if local storage is unavailable.
    }
  }, []);

  const choosePlan = (planName) => {
    try {
      localStorage.setItem("cineverse-subscription", planName);
      localStorage.setItem(
        "cineverse-subscription-billing",
        billing
      );
      setActivePlan(planName);
      setNotice(
        planName === "Free"
          ? "Your Free demo plan is now selected."
          : `${planName} demo plan selected successfully. No payment was charged.`
      );
    } catch {
      setNotice("Unable to save your selection in this browser.");
    }
  };

  return (
    <main className="subscription-page">
      <section className="subscription-hero">
        <div className="subscription-orb subscription-orb-one" />
        <div className="subscription-orb subscription-orb-two" />

        <div className="subscription-hero-content">
          <span className="subscription-eyebrow">
            <Sparkles size={15} />
            YOUR ENTERTAINMENT, YOUR WAY
          </span>

          <h1>
            One membership.
            <br />
            <span>Unlimited possibilities.</span>
          </h1>

          <p>
            Find the membership that fits your movie nights.
            Discover your next favorite on CINEVERSE.
          </p>

          <div className="subscription-trust">
            <span><Check size={15} /> Flexible plans</span>
            <span><ShieldCheck size={15} /> Secure checkout when enabled</span>
            <span><Zap size={15} /> Upgrade anytime</span>
          </div>

          <a href="#subscription-plans" className="subscription-hero-cta">
            Explore plans <ArrowRight size={17} />
          </a>
        </div>
      </section>

      <section className="subscription-plans" id="subscription-plans">
        <div className="subscription-section-heading">
          <span className="subscription-eyebrow">MEMBERSHIP OPTIONS</span>
          <h2>Choose your experience</h2>
          <p>
            Start with Free or choose a plan with more viewing features.
          </p>
        </div>

        <div className="subscription-billing">
          <span className={billing === "monthly" ? "billing-active" : ""}>
            Monthly
          </span>

          <button
            type="button"
            className={`billing-switch ${billing === "yearly" ? "is-yearly" : ""}`}
            aria-label="Switch billing period"
            aria-pressed={billing === "yearly"}
            onClick={() =>
              setBilling((current) =>
                current === "monthly" ? "yearly" : "monthly"
              )
            }
          >
            <span />
          </button>

          <span className={billing === "yearly" ? "billing-active" : ""}>
            Yearly
          </span>
          <span className="billing-save">Save up to 17%</span>
        </div>

        {notice && (
          <div className="subscription-notice" role="status">
            <Check size={18} />
            <span>{notice}</span>
          </div>
        )}

        <div className="subscription-plan-grid">
          {Object.entries(PLANS).map(([name, plan]) => {
            const price = plan[billing];
            const isCurrent = activePlan === name;
            const isPremium = name === "Premium";

            return (
              <article
                className={`subscription-card ${isPremium ? "subscription-card-featured" : ""} ${isCurrent ? "subscription-card-current" : ""}`}
                key={name}
              >
                {isPremium && (
                  <span className="subscription-popular">
                    <Crown size={13} /> MOST POPULAR
                  </span>
                )}

                <div className="subscription-plan-icon">
                  {name === "Free" && <Monitor size={23} />}
                  {name === "Standard" && <Zap size={23} />}
                  {name === "Premium" && <Crown size={23} />}
                </div>

                <h3>{name}</h3>
                <p className="subscription-plan-description">
                  {plan.description}
                </p>

                <div className="subscription-price">
                  <span className="subscription-currency">₹</span>
                  <strong>{formatPrice(price)}</strong>
                  <span className="subscription-period">
                    /{billing === "yearly" ? "year" : "month"}
                  </span>
                </div>

                {billing === "yearly" && price > 0 && (
                  <p className="subscription-monthly-equivalent">
                    About ₹{formatPrice(Math.round(price / 12))} per month,
                    billed yearly
                  </p>
                )}

                <button
                  type="button"
                  className={`subscription-select ${isPremium ? "subscription-select-primary" : ""}`}
                  onClick={() => choosePlan(name)}
                >
                  {isCurrent ? (
                    <>
                      <Check size={17} /> Selected plan
                    </>
                  ) : (
                    <>
                      {name === "Free" ? "Choose Free" : `Choose ${name}`}
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>

                <div className="subscription-includes">
                  <span>What's included</span>
                  {plan.features.map((feature) => (
                    <div key={feature}>
                      <Check size={16} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="subscription-comparison">
        <div className="subscription-section-heading">
          <span className="subscription-eyebrow">AT A GLANCE</span>
          <h2>Compare membership features</h2>
          <p>Choose the features that matter to your household.</p>
        </div>

        <div className="subscription-table-wrap">
          <table className="subscription-table">
            <thead>
              <tr>
                <th>Features</th>
                <th>Free</th>
                <th>Standard</th>
                <th>Premium</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map(([feature, free, standard, premium]) => (
                <tr key={feature}>
                  <td>{feature}</td>
                  {[free, standard, premium].map((value, index) => (
                    <td key={index}>
                      {value === true ? (
                        <Check className="comparison-check" size={18} />
                      ) : value === false ? (
                        <span className="comparison-unavailable">—</span>
                      ) : (
                        <strong>{value}</strong>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="subscription-bottom-cta">
        <div className="subscription-bottom-icon">
          <Smartphone size={25} />
        </div>
        <div>
          <span className="subscription-eyebrow">READY WHEN YOU ARE</span>
          <h2>Your next movie night starts here.</h2>
          <p>Explore the collection and find something worth watching.</p>
        </div>
        <Link to="/movies" className="subscription-browse">
          Browse titles <ArrowRight size={17} />
        </Link>
      </section>

      <section className="subscription-faq">
        <CircleHelp size={20} />
        <div>
          <h3>About these plans</h3>
          <p>
            These are demo subscription options for the CINEVERSE project.
            Selecting a plan saves your choice in this browser. It does not
            create a paid subscription or charge money. Actual streaming
            quality and device limits depend on the service and video sources.
          </p>
        </div>
        <BadgeCheck size={23} />
      </section>
    </main>
  );
}
