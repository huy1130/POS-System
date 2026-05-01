"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Users, Globe, Activity, Calendar } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};
const stagger = { show: { transition: { staggerChildren: 0.12 } } };

// ─── Mission / Vision / Values ───────────────────────────────────────────────
const PILLARS = [
  {
    emoji: "🎯",
    title: "Our Mission",
    desc:  "Empower every F&B business — from street-side coffee shops to multi-branch restaurant chains — with affordable, intuitive software that makes running a business genuinely effortless.",
    bg:    "bg-blue-50 dark:bg-blue-950/30",
    border:"border-blue-100 dark:border-blue-800/40",
  },
  {
    emoji: "👁",
    title: "Our Vision",
    desc:  "A world where every restaurant owner, café manager, and food entrepreneur has access to the same powerful tools that enterprise giants use — without the enterprise price tag.",
    bg:    "bg-indigo-50 dark:bg-indigo-950/30",
    border:"border-indigo-100 dark:border-indigo-800/40",
  },
  {
    emoji: "💎",
    title: "Our Values",
    desc:  "Transparency in everything we build. Innovation that solves real problems. Impact measured by the success of the businesses we serve — not just our own bottom line.",
    bg:    "bg-purple-50 dark:bg-purple-950/30",
    border:"border-purple-100 dark:border-purple-800/40",
  },
];

// ─── Team ─────────────────────────────────────────────────────────────────────
const TEAM = [
  {
    name: "Nguyen Van A",
    role: "Chief Executive Officer",
    bio:  "10+ years scaling SaaS products across Southeast Asia. Former VP at a leading F&B tech startup.",
    initials: "NA",
    color: "bg-blue-600",
  },
  {
    name: "Tran Thi B",
    role: "Chief Technology Officer",
    bio:  "Full-stack engineer passionate about distributed systems. Led engineering teams at two unicorn startups.",
    initials: "TB",
    color: "bg-emerald-600",
  },
  {
    name: "Le Van C",
    role: "Design Lead",
    bio:  "Award-winning product designer with a focus on accessibility and delightful user experiences for SMBs.",
    initials: "LC",
    color: "bg-orange-500",
  },
  {
    name: "Pham Thi D",
    role: "Head of Product",
    bio:  "Former restaurant owner turned product manager. Turns real operator pain-points into elegant features.",
    initials: "PD",
    color: "bg-purple-600",
  },
];

// ─── Stats ─────────────────────────────────────────────────────────────────────
const STATS = [
  { icon: Calendar, label: "Founded",   value: "2023"     },
  { icon: Users,    label: "Users",     value: "300,000+" },
  { icon: Globe,    label: "Countries", value: "10+"      },
  { icon: Activity, label: "Uptime",    value: "99.9%"    },
];

export default function AboutPage() {
  return (
    <div className="pt-16">

      {/* ── Hero header ──────────────────────────────────────────────────── */}
      <section className="py-28 bg-gradient-to-br from-blue-50 via-white to-indigo-50/60 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/40">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp}>
              <Badge className="mb-5 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700/50 px-4 py-1.5 text-sm font-medium">
                Our Story
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="mb-6 text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.08]"
            >
              Built for{" "}
              <span className="text-indigo-600 dark:text-indigo-400">F&B businesses</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              Lumio was born from a simple frustration: great restaurant tools shouldn&apos;t cost a fortune.
              We set out to build software that operators actually love — fast, reliable, and designed with
              real F&B workflows in mind.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Mission / Vision / Values ─────────────────────────────────────── */}
      <section className="py-28 bg-white dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid gap-8 md:grid-cols-3"
          >
            {PILLARS.map((p) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                className={`rounded-2xl border p-8 ${p.bg} ${p.border}`}
              >
                <span className="text-4xl">{p.emoji}</span>
                <h3 className="mt-4 mb-3 text-xl font-bold text-gray-900 dark:text-white">{p.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────────────────── */}
      <section className="py-28 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-14 text-center">
              <Badge className="mb-4 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700/50 px-4 py-1.5 text-sm">
                The Team
              </Badge>
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                The people behind Lumio
              </h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                A small, focused team obsessed with making F&B operations smoother for everyone.
              </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {TEAM.map((member) => (
                <motion.div
                  key={member.name}
                  variants={fadeUp}
                  className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow"
                >
                  {/* Colored avatar with initials */}
                  <div className={`h-16 w-16 rounded-2xl ${member.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <span className="text-xl font-bold text-white">{member.initials}</span>
                  </div>
                  <h4 className="text-base font-bold text-gray-900 dark:text-white">{member.name}</h4>
                  <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mt-0.5 mb-3">{member.role}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Company stats ────────────────────────────────────────────────── */}
      <section className="py-28 bg-white dark:bg-gray-950">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-2 gap-6 md:grid-cols-4"
          >
            {STATS.map(({ icon: Icon, label, value }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-6 py-8 text-center"
              >
                <Icon className="mx-auto mb-3 h-6 w-6 text-indigo-500" />
                <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">{value}</p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
