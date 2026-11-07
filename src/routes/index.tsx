import { createFileRoute } from "@tanstack/react-router";
import QRCode from "qrcode";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarCheck,
  Car,
  Check,
  Clock,
  Copy,
  Download,
  Facebook,
  Globe,
  Images,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Plane,
  RefreshCw,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  UserRound,
  UserRoundPlus,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { business } from "@/lib/business";
import { buildReviewDrafts } from "@/lib/review-drafts";
import { buildBusinessVCard } from "@/lib/vcard";
import logo from "@/assets/skyrun-limo-logo.png.asset.json";
import heroVehicle from "@/assets/cadillac-escalade-esv.jpg.asset.json";
import escaladeGarage from "@/assets/cadillac-escalade-esv-2.jpg.asset.json";
import suburban from "@/assets/chevrolet-suburban.jpg.asset.json";
import sprinter from "@/assets/executive-sprinter.jpg.asset.json";
import navigatorVehicle from "@/assets/lincoln-navigator.jpg.asset.json";
import expedition from "@/assets/ford-expedition-max.jpg.asset.json";
import yukon from "@/assets/gmc-yukon-xl-denali.webp.asset.json";
import jetVan from "@/assets/mercedes-sprinter-jet-van.jpg.asset.json";

const topics = [
  "Driver professionalism",
  "Vehicle comfort",
  "Pickup experience",
  "Airport transportation",
  "Communication",
  "Overall journey",
] as const;
const services = [
  { title: "Airport Transfers", icon: Plane },
  { title: "Corporate Travel", icon: BriefcaseBusiness },
  { title: "Private Chauffeur", icon: UserRound },
  { title: "City & Hourly Rides", icon: Clock },
  { title: "Special Occasions", icon: Sparkles },
  { title: "Black Car Service", icon: Car },
];
const fleetCategories = ["Regular Sedan", "Luxury Sedan", "Regular SUV", "Luxury SUV"];
const fleetPhotos = [
  { name: "Cadillac Escalade ESV", image: escaladeGarage },
  { name: "Chevrolet Suburban", image: suburban },
  { name: "Executive Sprinter", image: sprinter },
  { name: "Lincoln Navigator L", image: navigatorVehicle },
];
const galleryPhotos = [
  {
    name: "Cadillac Escalade ESV",
    image: heroVehicle,
    crop: "escalade-front",
    alt: "Black Cadillac Escalade ESV viewed from the front and side",
  },
  {
    name: "Cadillac Escalade ESV",
    image: escaladeGarage,
    crop: "escalade-garage",
    alt: "Black Cadillac Escalade ESV outside a garage",
  },
  {
    name: "Chevrolet Suburban",
    image: suburban,
    crop: "suburban",
    alt: "Black Chevrolet Suburban",
  },
  {
    name: "Executive Sprinter",
    image: sprinter,
    crop: "executive-sprinter",
    alt: "Black executive Mercedes Sprinter shuttle",
  },
  {
    name: "Ford Expedition MAX Platinum",
    image: expedition,
    crop: "expedition",
    alt: "Gray Ford Expedition MAX Platinum",
  },
  { name: "GMC Yukon XL Denali", image: yukon, crop: "yukon", alt: "GMC Yukon XL Denali" },
  {
    name: "Lincoln Navigator L",
    image: navigatorVehicle,
    crop: "navigator",
    alt: "Lincoln Navigator L",
  },
  {
    name: "Mercedes-Benz Sprinter Jet Van",
    image: jetVan,
    crop: "jet-van",
    alt: "Black Mercedes-Benz Sprinter Jet Van",
  },
];

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "SKYRUN LIMO | Digital Business Card" },
      {
        name: "description",
        content:
          "Call, book, save, and share SKYRUN LIMO — premium chauffeur and black car service in Chicago and surrounding suburbs.",
      },
      { property: "og:title", content: "SKYRUN LIMO | Digital Business Card" },
      {
        property: "og:description",
        content:
          "Premium chauffeur and black car service in Chicago. Call, book, or save our contact.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function Index() {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [experience, setExperience] = useState("");
  const [drafts, setDrafts] = useState<string[]>([]);
  const [draftRound, setDraftRound] = useState(0);
  const [status, setStatus] = useState("");
  const [qrPng, setQrPng] = useState("");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const cardUrl = business.digitalCardUrl;

  useEffect(() => {
    void QRCode.toDataURL(cardUrl, {
      width: 480,
      margin: 2,
      color: { dark: "#050D1C", light: "#FFFFFF" },
      errorCorrectionLevel: "M",
    }).then(setQrPng);
  }, [cardUrl]);

  const reviewFacts = useMemo(
    () => [...selectedTopics, ...(experience.trim() ? [experience.trim()] : [])],
    [experience, selectedTopics],
  );

  function announce(message: string) {
    setStatus(message);
    window.setTimeout(() => setStatus(""), 3000);
  }

  function saveContact() {
    const url = URL.createObjectURL(
      new Blob([buildBusinessVCard()], { type: "text/vcard;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "skyrun-limo.vcf";
    anchor.click();
    URL.revokeObjectURL(url);
    announce("Contact card downloaded.");
  }

  async function copyText(text: string, message: string) {
    try {
      await navigator.clipboard.writeText(text);
      announce(message);
    } catch {
      announce("Copy is not available in this browser.");
    }
  }

  async function shareCard() {
    if (navigator.share) {
      try {
        await navigator.share({ title: "SKYRUN LIMO", text: business.tagline, url: cardUrl });
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
      }
    }
    await copyText(cardUrl, "Card link copied.");
  }

  function downloadQr() {
    if (!qrPng) return;
    const anchor = document.createElement("a");
    anchor.href = qrPng;
    anchor.download = "skyrun-limo-card-qr.png";
    anchor.click();
  }

  function makeDrafts() {
    setDrafts(buildReviewDrafts(rating, reviewFacts));
    setDraftRound((round) => round + 1);
  }

  function startOver() {
    setRating(0);
    setSelectedTopics([]);
    setExperience("");
    setDrafts([]);
  }

  const actions: {
    label: string;
    icon: typeof Phone;
    href?: string;
    onClick?: () => void;
    external?: boolean;
  }[] = [
    { label: "Call", icon: Phone, href: business.primaryContact.phoneLink },
    { label: "Email", icon: Mail, href: business.emailUrl },
    { label: "Website", icon: Globe, href: business.websiteUrl, external: true },
    { label: "Book Ride", icon: CalendarCheck, href: business.bookingUrl, external: true },
    { label: "Instagram", icon: Instagram, href: business.instagramUrl, external: true },
    { label: "Facebook", icon: Facebook, href: business.facebookUrl, external: true },
    { label: "Save Contact", icon: UserRoundPlus, onClick: saveContact },
    { label: "Share Card", icon: Share2, onClick: shareCard },
  ];

  return (
    <main className="card-page">
      <div className="digital-card">
        <header className="profile">
          <div className="profile-cover">
            <PhotoCarousel
              photos={galleryPhotos}
              variant="hero"
              label="SKYRUN LIMO fleet photos"
              autoPlayInterval={4000}
            />
          </div>
          <div className="profile-body">
            <img
              className="profile-logo"
              src={logo.url}
              alt="SKYRUN LIMO official logo"
              width={180}
              height={180}
            />
            <p className="profile-kicker">PREMIUM CHAUFFEUR · CHICAGO</p>
            <h1>SKYRUN LIMO</h1>
            <p className="profile-tagline">{business.tagline}</p>
            <p className="profile-area">
              <MapPin aria-hidden="true" /> {business.serviceArea}
            </p>
            <p className="profile-desc">{business.description}</p>
            <div className="profile-buttons">
              <Button asChild className="btn-gold">
                <a href={business.bookingUrl} target="_blank" rel="noreferrer">
                  <CalendarCheck /> Book a Ride
                </a>
              </Button>
              <Button asChild variant="outline" className="btn-line">
                <a href={business.primaryContact.phoneLink}>
                  <Phone /> Call Now
                </a>
              </Button>
            </div>
          </div>
        </header>

        <nav className="action-grid" aria-label="Contact actions">
          {actions.map(({ label, icon: Icon, href, onClick, external }) =>
            href ? (
              <a
                key={label}
                className="action-tile"
                href={href}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                <span>
                  <Icon aria-hidden="true" />
                </span>
                {label}
              </a>
            ) : (
              <button key={label} type="button" className="action-tile" onClick={onClick}>
                <span>
                  <Icon aria-hidden="true" />
                </span>
                {label}
              </button>
            ),
          )}
        </nav>

        <Panel index="01" title="Get in Touch">
          <ul className="contact-list">
            {[business.primaryContact, business.secondaryContact].map((contact) => (
              <li key={contact.name}>
                <span className="contact-icon">
                  <Phone aria-hidden="true" />
                </span>
                <div>
                  <strong>{contact.name}</strong>
                  <a href={contact.phoneLink}>{contact.phone}</a>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="icon-btn"
                  aria-label={`Copy ${contact.name}'s number`}
                  onClick={() => copyText(contact.phone, "Phone number copied.")}
                >
                  <Copy />
                </Button>
                <a className="row-cta" href={contact.phoneLink}>
                  Call
                </a>
              </li>
            ))}
            <li>
              <span className="contact-icon">
                <Mail aria-hidden="true" />
              </span>
              <div>
                <strong>Business Email</strong>
                <a href={business.emailUrl}>{business.email}</a>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="icon-btn"
                aria-label="Copy email address"
                onClick={() => copyText(business.email, "Email copied.")}
              >
                <Copy />
              </Button>
              <a className="row-cta" href={business.emailUrl}>
                Email
              </a>
            </li>
            <li>
              <span className="contact-icon">
                <Globe aria-hidden="true" />
              </span>
              <div>
                <strong>Official Website</strong>
                <a href={business.websiteUrl} target="_blank" rel="noreferrer">
                  skyrunlimo.com
                </a>
              </div>
              <a className="row-cta" href={business.websiteUrl} target="_blank" rel="noreferrer">
                Visit
              </a>
            </li>
          </ul>
        </Panel>

        <Panel index="02" title="About SKYRUN LIMO">
          <p className="panel-text">
            Skyrun Limo provides private chauffeur and black car transportation across Chicago and
            surrounding suburbs, helping customers arrange airport transfers, corporate journeys,
            and special occasions with comfort and personal attention.
          </p>
        </Panel>

        <section className="fleet-gallery" aria-labelledby="fleet-gallery-title">
          <div className="section-label">03 / OUR FLEET</div>
          <div className="gallery-heading">
            <h2 id="fleet-gallery-title">Ride in comfort.</h2>
            <a href={business.fleetUrl} target="_blank" rel="noreferrer">
              View fleet <ArrowRight aria-hidden="true" />
            </a>
          </div>
          <PhotoCarousel
            photos={fleetPhotos.map(({ name, image }) => ({ name, image, alt: name }))}
            variant="fleet"
            label="Featured fleet vehicles"
            autoPlayInterval={4200}
          />
          <p className="gallery-note">A selection from the SKYRUN LIMO fleet.</p>
        </section>

        <section className="photo-gallery-section" aria-labelledby="photo-gallery-title">
          <div className="section-label">THE SKYRUN EXPERIENCE</div>
          <div className="photo-gallery-heading">
            <div>
              <h2 id="photo-gallery-title">Our Fleet Gallery</h2>
              <p>Explore the vehicles and comfort behind the Skyrun Limo experience.</p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="gallery-view-all"
              onClick={() => {
                setActivePhotoIndex(null);
                setGalleryOpen(true);
              }}
            >
              <Images aria-hidden="true" /> <span>View All Photos</span>{" "}
              <span className="gallery-count">{galleryPhotos.length}</span>
            </Button>
          </div>
          <PhotoCarousel
            photos={galleryPhotos}
            variant="gallery"
            label="Skyrun Limo fleet gallery"
            autoPlayInterval={4000}
            onPhotoSelect={(index) => {
              setActivePhotoIndex(index);
              setGalleryOpen(true);
            }}
          />
        </section>

        <Panel
          index="04"
          title="Our Services"
          link={{ label: "Explore All Services", href: business.servicesUrl }}
        >
          <div className="service-grid">
            {services.map(({ title, icon: Icon }) => (
              <div key={title} className="service-tile">
                <Icon aria-hidden="true" />
                {title}
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          index="05"
          title="Fleet Categories"
          link={{ label: "View Full Fleet", href: business.fleetUrl }}
        >
          <div className="fleet-pills">
            {fleetCategories.map((category) => (
              <span key={category}>
                <Car aria-hidden="true" />
                {category}
              </span>
            ))}
          </div>
        </Panel>

        <Panel index="06" title="Enjoyed Your Ride?" className="review-panel">
          <p className="panel-text">
            Share your experience with Skyrun Limo. Your feedback matters.
          </p>
          <div className="stars" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star key={n} fill="currentColor" />
            ))}
          </div>
          <div className="panel-buttons">
            {business.googleReviewUrl ? (
              <Button asChild className="btn-gold">
                <a href={business.googleReviewUrl} target="_blank" rel="noreferrer">
                  <Star /> Write a Google Review
                </a>
              </Button>
            ) : (
              <Button className="btn-gold" disabled>
                <Star /> Google Review link coming soon
              </Button>
            )}
            <Button variant="outline" className="btn-line" onClick={() => setReviewOpen(true)}>
              <Sparkles /> AI Review Assistant
            </Button>
          </div>
        </Panel>

        <Panel index="07" title="Follow Us">
          <div className="social-grid">
            <a
              className="social-tile"
              href={business.instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span className="ig">
                <Instagram aria-hidden="true" />
              </span>
              <div>
                <small>Instagram</small>
                <strong>@skyrun2428</strong>
              </div>
              <ArrowRight aria-hidden="true" />
            </a>
            <a className="social-tile" href={business.facebookUrl} target="_blank" rel="noreferrer">
              <span className="fb">
                <Facebook aria-hidden="true" />
              </span>
              <div>
                <small>Facebook</small>
                <strong>SKYRUN LIMO</strong>
              </div>
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </Panel>

        <Panel index="08" title="Save & Share Our Card">
          <div className="qr-box">
            {qrPng ? (
              <img
                src={qrPng}
                alt="QR code that opens the SKYRUN LIMO digital card"
                width={180}
                height={180}
              />
            ) : (
              <div className="qr-loading" />
            )}
            <p>Scan to open this card</p>
          </div>
          <div className="share-grid">
            <Button variant="outline" className="btn-line" onClick={downloadQr}>
              <Download /> Download QR
            </Button>
            <Button
              variant="outline"
              className="btn-line"
              onClick={() => copyText(cardUrl, "Card link copied.")}
            >
              <Copy /> Copy Link
            </Button>
            <Button variant="outline" className="btn-line" onClick={shareCard}>
              <Share2 /> Share Card
            </Button>
            <Button variant="outline" className="btn-line" onClick={saveContact}>
              <UserRoundPlus /> Save Contact
            </Button>
          </div>
        </Panel>

        <section className="cta-panel" aria-labelledby="cta-heading">
          <h2 id="cta-heading">Ready for Your Next Ride?</h2>
          <div className="panel-buttons">
            <Button asChild className="btn-gold">
              <a href={business.bookingUrl} target="_blank" rel="noreferrer">
                <CalendarCheck /> Book Now
              </a>
            </Button>
            <Button asChild variant="outline" className="btn-line">
              <a href={business.primaryContact.phoneLink}>
                <Phone /> Call Skyrun
              </a>
            </Button>
          </div>
        </section>

        <footer className="card-footer">
          © {new Date().getFullYear()} {business.name}
        </footer>
      </div>

      <nav className="bottom-bar" aria-label="Quick actions">
        <a href={business.primaryContact.phoneLink}>
          <Phone aria-hidden="true" />
          Call
        </a>
        <a href={business.bookingUrl} target="_blank" rel="noreferrer">
          <CalendarCheck aria-hidden="true" />
          Book
        </a>
        <button type="button" onClick={() => setReviewOpen(true)}>
          <Star aria-hidden="true" />
          Review
        </button>
      </nav>

      <p role="status" aria-live="polite" className={`toast ${status ? "toast-show" : ""}`}>
        {status}
      </p>

      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
        <DialogContent className="review-modal max-h-[90dvh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>AI Review Assistant</DialogTitle>
            <DialogDescription>
              Share only what actually happened. Every suggestion is editable, and nothing is posted
              for you.
            </DialogDescription>
          </DialogHeader>
          <div className="review-body">
            <fieldset>
              <legend>Your rating</legend>
              <div className="rating-row">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-label={`${value} out of 5 stars`}
                    aria-pressed={rating === value}
                    className={rating >= value ? "on" : ""}
                    onClick={() => setRating(value)}
                  >
                    <Star fill={rating >= value ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>What stood out?</legend>
              <div className="chip-row">
                {topics.map((topic) => {
                  const on = selectedTopics.includes(topic);
                  return (
                    <button
                      key={topic}
                      type="button"
                      aria-pressed={on}
                      className={on ? "on" : ""}
                      onClick={() =>
                        setSelectedTopics((list) =>
                          on ? list.filter((t) => t !== topic) : [...list, topic],
                        )
                      }
                    >
                      {on && <Check aria-hidden="true" />}
                      {topic}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <label htmlFor="experience">
              A short description <span>(optional)</span>
            </label>
            <textarea
              id="experience"
              maxLength={500}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="e.g. The driver helped with our luggage at O'Hare."
            />
            <p className="privacy">
              <ShieldCheck aria-hidden="true" /> Written on this device from your details only.
            </p>
            <Button
              className="btn-gold w-full"
              onClick={makeDrafts}
              disabled={!rating && reviewFacts.length === 0}
            >
              <Sparkles /> {drafts.length ? "Regenerate suggestions" : "Create 5 suggestions"}
            </Button>
            {drafts.length > 0 && (
              <div className="draft-list">
                <div className="draft-head">
                  <strong>Your suggestions</strong>
                  <button type="button" onClick={startOver}>
                    <X aria-hidden="true" /> Start over
                  </button>
                </div>
                {drafts.map((draft, index) => (
                  <DraftCard
                    key={`${draftRound}-${index}`}
                    index={index}
                    initialText={draft}
                    onCopy={(text) => copyText(text, "Review copied.")}
                  />
                ))}
                {business.googleReviewUrl ? (
                  <Button asChild className="btn-gold w-full">
                    <a href={business.googleReviewUrl} target="_blank" rel="noreferrer">
                      Continue to Google <ArrowRight />
                    </a>
                  </Button>
                ) : (
                  <p className="privacy">
                    <RefreshCw aria-hidden="true" /> Copy your review now — the Google link will be
                    added soon.
                  </p>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={galleryOpen}
        onOpenChange={(open) => {
          setGalleryOpen(open);
          if (!open) setActivePhotoIndex(null);
        }}
      >
        <DialogContent
          className="gallery-dialog max-h-[92dvh] overflow-y-auto sm:max-w-[58rem]"
          onKeyDown={(event) => {
            if (activePhotoIndex === null || event.defaultPrevented) return;
            if (event.key === "ArrowRight") {
              event.preventDefault();
              setActivePhotoIndex((index) =>
                index === null ? 0 : (index + 1) % galleryPhotos.length,
              );
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              setActivePhotoIndex((index) =>
                index === null ? 0 : (index - 1 + galleryPhotos.length) % galleryPhotos.length,
              );
            }
          }}
        >
          <DialogHeader className="gallery-dialog-header">
            <DialogTitle>Our Fleet Gallery</DialogTitle>
            <DialogDescription>
              Explore the vehicles and comfort behind the Skyrun Limo experience.
            </DialogDescription>
          </DialogHeader>
          {activePhotoIndex === null ? (
            <div className="gallery-grid">
              {galleryPhotos.map((photo, index) => (
                <Button
                  key={`${photo.name}-${index}`}
                  type="button"
                  variant="ghost"
                  className="gallery-grid-item"
                  aria-label={`View ${photo.name}, photo ${index + 1} of ${galleryPhotos.length}`}
                  onClick={() => setActivePhotoIndex(index)}
                >
                  <img src={photo.image.url} alt={photo.alt} loading="lazy" />
                  <span>{photo.name}</span>
                </Button>
              ))}
            </div>
          ) : (
            <PhotoCarousel
              photos={galleryPhotos}
              variant="viewer"
              label="Full-size fleet photos"
              autoPlay={false}
              initialIndex={activePhotoIndex}
              onSlideChange={setActivePhotoIndex}
            />
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}

type CarouselPhoto = { name: string; image: { url: string }; alt: string; crop?: string };

function PhotoCarousel({
  photos,
  variant,
  label,
  autoPlay = true,
  autoPlayInterval = 4000,
  initialIndex = 0,
  onPhotoSelect,
  onSlideChange,
}: {
  photos: CarouselPhoto[];
  variant: "hero" | "fleet" | "gallery" | "viewer";
  label: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  initialIndex?: number;
  onPhotoSelect?: (index: number) => void;
  onSlideChange?: (index: number) => void;
}) {
  const [viewportRef, emblaApi] = useEmblaCarousel({
    loop: photos.length > 1,
    align: "start",
    startIndex: initialIndex,
  });
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const onSlideChangeRef = useRef(onSlideChange);

  useEffect(() => {
    onSlideChangeRef.current = onSlideChange;
  }, [onSlideChange]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      const index = emblaApi.selectedScrollSnap();
      setSelectedIndex(index);
      onSlideChangeRef.current?.(index);
    };
    update();
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || !autoPlay || paused || reducedMotion || photos.length < 2) return;
    const timer = window.setInterval(() => emblaApi.scrollNext(), autoPlayInterval);
    return () => window.clearInterval(timer);
  }, [autoPlay, autoPlayInterval, emblaApi, paused, photos.length, reducedMotion, selectedIndex]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      event.stopPropagation();
      emblaApi?.scrollPrev(reducedMotion);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      event.stopPropagation();
      emblaApi?.scrollNext(reducedMotion);
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLDivElement>) {
    const nextTarget = event.relatedTarget;
    if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget))
      setPaused(false);
  }

  return (
    <div
      className={`photo-carousel photo-carousel--${variant}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={(event) => {
        if (event.target instanceof HTMLElement && event.target.matches(":focus-visible"))
          setPaused(true);
      }}
      onBlurCapture={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <div className="photo-carousel-viewport" ref={viewportRef}>
        <div className="photo-carousel-track">
          {photos.map((photo, index) => (
            <div
              className={`photo-carousel-slide photo-carousel-slide--${photo.crop ?? "center"}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${photos.length}: ${photo.name}`}
              key={`${photo.name}-${index}`}
            >
              {onPhotoSelect ? (
                <Button
                  type="button"
                  variant="ghost"
                  className="gallery-slide-button"
                  onClick={() => onPhotoSelect(index)}
                  aria-label={`View ${photo.name}`}
                >
                  <figure className="gallery-slide-figure">
                    <span className="gallery-photo-frame">
                      <img src={photo.image.url} alt={photo.alt} loading="lazy" />
                    </span>
                    <figcaption>{photo.name}</figcaption>
                  </figure>
                </Button>
              ) : (
                <figure className={`photo-slide-figure photo-slide-figure--${variant}`}>
                  <img
                    className="photo-slide-image"
                    src={photo.image.url}
                    alt={photo.alt}
                    loading={variant === "hero" && index === 0 ? "eager" : "lazy"}
                    fetchPriority={variant === "hero" && index === 0 ? "high" : "auto"}
                    decoding="async"
                  />
                  {variant === "fleet" && <figcaption>{photo.name}</figcaption>}
                  {variant === "viewer" && (
                    <figcaption className="viewer-photo-caption">{photo.name}</figcaption>
                  )}
                </figure>
              )}
            </div>
          ))}
        </div>
      </div>
      {variant === "viewer" && (
        <p className="viewer-photo-count">
          {selectedIndex + 1} / {photos.length}
        </p>
      )}
    </div>
  );
}

function Panel({
  index,
  title,
  children,
  link,
  className = "",
}: {
  index: string;
  title: string;
  children: ReactNode;
  link?: { label: string; href: string };
  className?: string;
}) {
  return (
    <section className={`panel ${className}`}>
      <div className="section-label">{index} / SKYRUN LIMO</div>
      <div className="panel-head">
        <h2>{title}</h2>
        {link && (
          <a href={link.href} target="_blank" rel="noreferrer">
            {link.label} <ArrowRight aria-hidden="true" />
          </a>
        )}
      </div>
      {children}
    </section>
  );
}

function DraftCard({
  index,
  initialText,
  onCopy,
}: {
  index: number;
  initialText: string;
  onCopy: (text: string) => void;
}) {
  const [text, setText] = useState(initialText);
  return (
    <article className="draft">
      <div>
        <span>Suggestion {index + 1}</span>
        <button type="button" onClick={() => onCopy(text)}>
          <Copy aria-hidden="true" /> Copy
        </button>
      </div>
      <textarea
        aria-label={`Edit suggestion ${index + 1}`}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </article>
  );
}
