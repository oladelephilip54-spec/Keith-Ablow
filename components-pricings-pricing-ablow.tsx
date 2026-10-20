"use client";

import { useState } from "react";
import Link from "next/link";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Avatar from "@/components/ui/components-primitives-avatar";

type Palette6 = "blue" | "purple" | "amber" | "teal" | "rose" | "slate";

export type Plan6 = {
  id: string;
  name: string;
  description: string;
  palette: Palette6;
  price: string;
  originalPrice?: string;
  priceNote?: string;
  ctaLabel: string;
  ctaHref: string;
  featuredLabel?: string;
  features: string[];
  footerNote?: string;
  footerDesc?: string;
  ctaDark?: boolean;
};

const CARD_PALETTES: Record<
  Palette6,
  {
    base: string;
    blobA: string;
    blobB: string;
    avatarColor:
      | "blue"
      | "orange"
      | "red"
      | "green"
      | "purple"
      | "yellow"
      | "cyan"
      | "pink"
      | "indigo"
      | "lime"
      | "turquoise"
      | "violet";
  }
> = {
  blue: {
    base: "bg-sky-50 dark:bg-blue-950",
    blobA: "bg-blue-500 dark:bg-blue-500",
    blobB: "bg-sky-200 dark:bg-sky-600",
    avatarColor: "blue",
  },
  purple: {
    base: "bg-violet-50 dark:bg-violet-950",
    blobA: "bg-violet-500 dark:bg-violet-500",
    blobB: "bg-fuchsia-200 dark:bg-fuchsia-600",
    avatarColor: "purple",
  },
  amber: {
    base: "bg-amber-50 dark:bg-amber-950",
    blobA: "bg-amber-500 dark:bg-amber-500",
    blobB: "bg-yellow-200 dark:bg-yellow-600",
    avatarColor: "yellow",
  },
  teal: {
    base: "bg-teal-50 dark:bg-teal-950",
    blobA: "bg-teal-500 dark:bg-teal-500",
    blobB: "bg-emerald-200 dark:bg-emerald-600",
    avatarColor: "turquoise",
  },
  rose: {
    base: "bg-rose-50 dark:bg-rose-950",
    blobA: "bg-rose-500 dark:bg-rose-500",
    blobB: "bg-pink-200 dark:bg-pink-600",
    avatarColor: "red",
  },
  slate: {
    base: "bg-slate-100 dark:bg-slate-900",
    blobA: "bg-slate-400 dark:bg-slate-500",
    blobB: "bg-zinc-200 dark:bg-zinc-600",
    avatarColor: "blue",
  },
};

const PLANS: Plan6[] = [
  {
    id: "book-trailer",
    name: "Book Trailer",
    description: "A short, cinematic trailer that captures the mood of the novel without spoiling it.",
    palette: "blue",
    price: "$80",
    priceNote: "One-time payment • Delivered in 5–7 days",
    ctaLabel: "Get Book Trailer",
    ctaHref: "#contact",
    features: [
      "60–90 second cinematic trailer",
      "Atmospheric tone matching the book",
      "Ready for YouTube, Instagram & Facebook",
      "2 rounds of revisions included",
      "1080p + vertical versions",
      "Music licensing handled",
    ],
    footerNote: "Perfect first step",
    footerDesc: "Ideal if you want a strong visual asset before full promotion.",
  },
  {
    id: "social-3months",
    name: "Social Media + Ads",
    description: "Full 3-month management including content strategy and Facebook ads.",
    palette: "amber",
    price: "$3,500",
    priceNote: "3-month engagement • Includes Facebook ads",
    ctaLabel: "Start 3-Month Campaign",
    ctaHref: "#contact",
    featuredLabel: "Most Recommended",
    ctaDark: true,
    features: [
      "Complete content strategy for the book",
      "Consistent posting across platforms",
      "Targeted Facebook ads",
      "Content focused on reinvention & authenticity",
      "Weekly performance reports",
      "Real-time optimization",
      "Direct collaboration on messaging",
      "Organic + paid growth combined",
    ],
    footerNote: "Best value for launch",
    footerDesc: "Designed to turn attention into actual readers.",
  },
  {
    id: "full-launch",
    name: "Full Launch Package",
    description: "Book trailer + full 3-month social media management & ads.",
    palette: "purple",
    price: "$3,500",
    originalPrice: "$3,580",
    priceNote: "Trailer included free",
    ctaLabel: "Get Full Launch Package",
    ctaHref: "#contact",
    featuredLabel: "Best Overall Value",
    features: [
      "Everything in the Book Trailer",
      "Everything in the 3-Month Social + Ads package",
      "Cohesive visual + content system",
      "Priority production timeline",
      "One single point of contact",
      "Aligned messaging across all channels",
    ],
    footerNote: "Recommended for maximum impact",
    footerDesc: "The cleanest way to launch with both visual and promotion.",
  },
];

function PlanCard({ plan }: { plan: Plan6 }) {
  const pal = CARD_PALETTES[plan.palette];

  return (
    <div className="flex flex-col rounded-2xl border bg-card p-1">
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border border-black/6 p-5 dark:border-white/10",
          pal.base
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute -top-12 -right-12 size-52 rounded-full opacity-55 blur-3xl dark:opacity-70",
            pal.blobA
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute top-1/3 -left-8 size-60 rounded-full opacity-25 blur-3xl dark:opacity-35",
            pal.blobB
          )}
        />

        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.4] mix-blend-overlay dark:opacity-[0.1]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id={`grain-${plan.id}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.68"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#grain-${plan.id})`} />
        </svg>

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Avatar shape="squircle" size="sm" color={pal.avatarColor} />
            {plan.featuredLabel && (
              <span className="rounded-full bg-black/10 px-2.5 py-0.5 text-xs font-medium text-foreground/70 backdrop-blur-sm dark:bg-white/15 dark:text-foreground/70">
                {plan.featuredLabel}
              </span>
            )}
          </div>

          <div className="space-y-0.5">
            <h3 className="text-xl font-bold tracking-tight">{plan.name}</h3>
            <p className="text-sm text-foreground/60">{plan.description}</p>
          </div>

          <div className="space-y-0.5">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight">{plan.price}</span>
              {plan.originalPrice && (
                <span className="text-base text-foreground/45 line-through">
                  {plan.originalPrice}
                </span>
              )}
            </div>
            {plan.priceNote && (
              <p className="text-xs text-foreground/50">{plan.priceNote}</p>
            )}
          </div>

          <Button
            className={cn(
              "w-full rounded-full font-semibold",
              plan.ctaDark
                ? "bg-foreground text-background hover:bg-foreground/85"
                : "bg-white/70 text-foreground backdrop-blur-sm hover:bg-white/90 dark:bg-white/15 dark:text-foreground dark:hover:bg-white/25"
            )}
            asChild
          >
            <Link href={plan.ctaHref}>{plan.ctaLabel}</Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-1 pt-5">
        <ul className="space-y-2.5">
          {plan.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm">
              <HugeiconsIcon
                icon={Tick02Icon}
                className="size-3.5 shrink-0 text-foreground/40"
                strokeWidth={2}
              />
              {f}
            </li>
          ))}
        </ul>

        {(plan.footerNote || plan.footerDesc) && (
          <div className="space-y-0.5 border-t border-border p-2">
            {plan.footerNote && (
              <p className="text-xs font-semibold">{plan.footerNote}</p>
            )}
            {plan.footerDesc && (
              <p className="text-xs text-muted-foreground">{plan.footerDesc}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PricingAblow() {
  return (
    <div className="w-full space-y-8">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">
          Proposal for A Matter of Life and Death
        </h2>
        <p className="text-sm text-muted-foreground">
          Clear options to help the book reach the readers who need it.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}
