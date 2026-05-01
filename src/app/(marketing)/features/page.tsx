"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Zap, BarChart3, Shield, Layers, TrendingUp, ShoppingCart,
  Package, Users, Bell, Globe, CreditCard, Headphones,
  ArrowRight, Check,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

// ─── Feature categories ───────────────────────────────────────────────────────
const CATEGORIES = [
  {
    badge: "Sales",
    title: "Sell faster, smarter",
    desc:  "Everything you need at the counter — from table management to split bills, built for speed.",
    color: "blue",
    features: [
      { icon: ShoppingCart, title: "Real-time POS",        desc: "Lightning-fast transactions with instant sync across all your devices and locations." },
      { icon: CreditCard,   title: "Multiple Payment",     desc: "Accept cash, cards, QR codes, and digital wallets — all from one screen."            },
      { icon: Globe,        title: "Omnichannel Orders",   desc: "Handle dine-in, takeaway, delivery, and online orders from one dashboard."           },
    ],
  },
  {
    badge: "Operations",
    title: "Run a tighter operation",
    desc:  "Keep your inventory accurate, your team aligned, and your costs under control.",
    color: "emerald",
    features: [
      { icon: Package,  title: "Inventory Control",  desc: "Auto-reorder alerts, multi-location tracking, and a full audit trail in real time."    },
      { icon: Layers,   title: "Recipe & Wastage",   desc: "Link ingredients to menu items and track wastage to protect your margins."             },
      { icon: Users,    title: "Staff Management",   desc: "Shift scheduling, role-based permissions, and performance tracking for every team member." },
    ],
  },
  {
    badge: "Insights",
    title: "Know your numbers",
    desc:  "Deep analytics that show you exactly what's working and where to focus next.",
    color: "purple",
    features: [
      { icon: BarChart3,  title: "Advanced Analytics",   desc: "Deep insights on sales, inventory trends, and staff performance in one view."        },
      { icon: TrendingUp, title: "AI-powered Insights",  desc: "Predictive analytics and smart suggestions to boost your revenue every day."         },
      { icon: Bell,       title: "Smart Alerts",         desc: "Get notified instantly on low stock, peak hours, or unusual transaction patterns."   },
    ],
  },
  {
    badge: "Security",
    title: "Built on trust",
    desc:  "Enterprise-grade security and role-based controls so the right people access the right data.",
    color: "orange",
    features: [
      { icon: Shield,      title: "Role-based Access",   desc: "Granular permissions for Manager, Admin, Staff, and Cashier — zero overlap."         },
      { icon: Zap,         title: "99.9% Uptime SLA",    desc: "Built on resilient infrastructure with real-time failover — always-on for your business." },
      { icon: Headphones,  title: "24/7 Support",        desc: "Live chat, email, and phone support from a team that actually knows F&B."            },
    ],
  },
];

const COLOR_MAP: Record<string, { badge: string; accent: string; icon: string; dot: string }> = {
  blue:    { badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-700/50",    accent: "text-blue-600 dark:text-blue-400",    icon: "bg-blue-100 dark:bg-blue-900/40",    dot: "bg-blue-600" },
  emerald: { badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700/50", accent: "text-emerald-600 dark:text-emerald-400", icon: "bg-emerald-100 dark:bg-emerald-900/40", dot: "bg-emerald-600" },
  purple:  { badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 border-purple-200 dark:border-purple-700/50",    accent: "text-purple-600 dark:text-purple-400",    icon: "bg-purple-100 dark:bg-purple-900/40",    dot: "bg-purple-600" },
  orange:  { badge: "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300 border-orange-200 dark:border-orange-700/50",    accent: "text-orange-600 dark:text-orange-400",    icon: "bg-orange-100 dark:bg-orange-900/40",    dot: "bg-orange-500" },
};

// ─── High-level capability list ───────────────────────────────────────────────
const HIGHLIGHTS = [
  "Free 14-day trial, no credit card required",
  "Works on tablet, desktop, and mobile",
  "Offline mode — sell even without internet",
  "Instant onboarding, setup in under 10 minutes",
  "Integrates with major delivery platforms",
  "Dedicated onboarding support included",
];

export default function FeaturesPage() {
  return (
    <div className="pt-16">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="py-28 bg-gradient-to-br from-blue-50 via-white to-indigo-50/60 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/40">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp}>
              <Badge className="mb-5 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700/50 px-4 py-1.5 text-sm font-medium">
                Product Features
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="mb-6 text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.08]"
            >
              Everything your{" "}
              <span className="text-indigo-600 dark:text-indigo-400">F&B business needs</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              From the first sale of the day to closing-time reports, Lumio covers every corner of your
              operations so you can focus on what matters — great food and happy customers.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="h-12 px-8 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200/50 dark:shadow-indigo-900/30">
                  Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="h-12 px-8 rounded-xl border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                  View pricing
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Feature categories ─────────────────────────────────────────────── */}
      {CATEGORIES.map((cat, catIdx) => {
        const colors = COLOR_MAP[cat.color];
        const isEven = catIdx % 2 === 0;
        return (
          <section
            key={cat.badge}
            className={isEven ? "py-28 bg-white dark:bg-gray-950" : "py-28 bg-gray-50 dark:bg-gray-900/50"}
          >
            <div className="mx-auto max-w-7xl px-6">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                variants={stagger}
              >
                {/* Section header */}
                <motion.div variants={fadeUp} className="mb-14 max-w-2xl">
                  <Badge className={`mb-4 px-4 py-1.5 text-sm font-medium ${colors.badge}`}>{cat.badge}</Badge>
                  <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">{cat.title}</h2>
                  <p className="text-lg text-gray-500 dark:text-gray-400">{cat.desc}</p>
                </motion.div>

                {/* Feature cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.features.map(({ icon: Icon, title, desc }) => (
                    <motion.div
                      key={title}
                      variants={fadeUp}
                      className="group rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-7 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                    >
                      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${colors.icon}`}>
                        <Icon className={`h-6 w-6 ${colors.accent}`} />
                      </div>
                      <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-white">{title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* ── Quick highlights ───────────────────────────────────────────────── */}
      <section className="py-28 bg-white dark:bg-gray-950">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-12 text-center">
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">And so much more</h2>
              <p className="mt-3 text-gray-500 dark:text-gray-400">Built with operators in mind, every detail matters.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {HIGHLIGHTS.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-5 py-4">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-indigo-600 px-10 py-16 text-center shadow-2xl shadow-indigo-200 dark:shadow-indigo-900/40"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="absolute -left-20 top-10 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -right-20 bottom-10 h-60 w-60 rounded-full bg-violet-500/20 blur-3xl" />
            </div>
            <div className="relative">
              <Badge className="mb-5 border-white/20 bg-white/10 text-white">14-day free trial · No credit card</Badge>
              <h2 className="text-3xl font-extrabold sm:text-4xl mb-4 text-white">Ready to see it in action?</h2>
              <p className="text-indigo-100 mb-8 max-w-md mx-auto">
                Start your free trial today and discover why 300,000+ businesses trust Lumio.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <Button size="lg" className="h-12 gap-2 bg-white text-indigo-600 hover:bg-indigo-50 px-8 font-semibold shadow-lg">
                    Start free trial <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="h-12 border-white/30 bg-white/10 text-white hover:bg-white/20 px-8">
                    See pricing
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
