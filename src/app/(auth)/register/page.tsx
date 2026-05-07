"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, EyeOff, Loader2, Check, CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthNavbar } from "@/components/layout/AuthNavbar";
import { cn } from "@/lib/utils";

const BRAND = "#5B4EE8";

const FEATURES = [
  "Bắt đầu miễn phí, không cần thẻ tín dụng",
  "Thiết lập trong vòng 10 phút",
  "Hỗ trợ tận tình 24/7",
];

function passwordStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 8)           score++;
  if (/[A-Z]/.test(pw))        score++;
  if (/[0-9]/.test(pw))        score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const levels = [
    { label: "Quá ngắn",   color: "bg-red-500"   },
    { label: "Yếu",        color: "bg-red-400"   },
    { label: "Trung bình", color: "bg-amber-400" },
    { label: "Khá mạnh",   color: "bg-blue-500"  },
    { label: "Mạnh",       color: "bg-green-500" },
  ];
  return { score, ...levels[score] };
}

export default function RegisterPage() {
  const router = useRouter();

  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [showCf,   setShowCf]   = useState(false);
  const [terms,    setTerms]    = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);

  const strength  = passwordStrength(password);
  const matching  = confirm.length > 0 && confirm === password;
  const canSubmit = name.trim() !== "" && email !== "" && password.length >= 6 && matching && terms;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
    await new Promise((r) => setTimeout(r, 1400));
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-slate-900">
      <AuthNavbar />

      <main className="flex flex-1 items-center justify-center px-6 pt-24 pb-12">
        <div className="mx-auto w-full max-w-5xl flex items-center gap-14">

          {/* ── LEFT: Branding text ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="hidden lg:block flex-1"
          >
            <h2 className="text-4xl font-extrabold leading-tight mb-4 text-gray-900 dark:text-white">
              Bắt đầu hành trình<br />của bạn với Lumio
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-10 max-w-xs">
              Tạo tài khoản miễn phí và khám phá toàn bộ tính năng quản lý bán hàng F&amp;B.
            </p>
            <ul className="space-y-4">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/40">
                    <Check className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── RIGHT: Indigo card ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="w-full max-w-[420px] shrink-0"
          >
            <div className="rounded-2xl bg-indigo-600 dark:bg-indigo-600/95 shadow-2xl shadow-indigo-300/30 dark:shadow-indigo-950/40 overflow-hidden">

              <AnimatePresence mode="wait">
                {success ? (
                  /* ── Success state ─────────────────────────────────────── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center gap-5 px-8 py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 ring-4 ring-white/30"
                    >
                      <CheckCircle2 className="h-10 w-10 text-white" />
                    </motion.div>
                    <div>
                      <p className="text-xl font-bold text-white">Tài khoản đã được tạo!</p>
                      <p className="mt-1.5 text-sm text-indigo-200">
                        Đang chuyển hướng đến trang đăng nhập…
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  /* ── Form ──────────────────────────────────────────────── */
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                    {/* Card header */}
                    <div className="px-8 pt-8 pb-6 border-b border-indigo-500/50">
                      <h1 className="text-xl font-bold text-white">Tạo tài khoản</h1>
                      <p className="mt-0.5 text-sm text-indigo-200">Tham gia Lumio ngay hôm nay</p>
                    </div>

                    {/* Card body */}
                    <div className="px-8 py-6">
                      <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Full name */}
                        <div className="space-y-1.5">
                          <Label className="text-sm font-medium text-indigo-100">Họ và tên</Label>
                          <Input
                            placeholder="Nguyễn Văn A"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="h-11 rounded-lg border-indigo-400/60 bg-indigo-500/40 text-white placeholder:text-indigo-300 focus-visible:ring-white/40 focus-visible:border-white/60"
                          />
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                          <Label className="text-sm font-medium text-indigo-100">Email</Label>
                          <Input
                            type="email"
                            placeholder="you@lumio.app"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-11 rounded-lg border-indigo-400/60 bg-indigo-500/40 text-white placeholder:text-indigo-300 focus-visible:ring-white/40 focus-visible:border-white/60"
                          />
                        </div>

                        {/* Password + strength bar */}
                        <div className="space-y-1.5">
                          <Label className="text-sm font-medium text-indigo-100">Mật khẩu</Label>
                          <div className="relative">
                            <Input
                              type={showPw ? "text" : "password"}
                              placeholder="••••••••"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              className="h-11 rounded-lg border-indigo-400/60 bg-indigo-500/40 text-white placeholder:text-indigo-300 pr-10 focus-visible:ring-white/40 focus-visible:border-white/60"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPw(!showPw)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-300 hover:text-white transition-colors"
                            >
                              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                          <AnimatePresence>
                            {password.length > 0 && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-1.5 overflow-hidden"
                              >
                                <div className="flex gap-1 pt-1">
                                  {[0, 1, 2, 3].map((i) => (
                                    <div key={i} className="h-1 flex-1 rounded-full bg-indigo-400/30 overflow-hidden">
                                      <motion.div
                                        className={cn("h-full rounded-full", i < strength.score ? strength.color : "")}
                                        initial={{ width: "0%" }}
                                        animate={{ width: i < strength.score ? "100%" : "0%" }}
                                        transition={{ duration: 0.3, delay: i * 0.05 }}
                                      />
                                    </div>
                                  ))}
                                </div>
                                <p className={cn(
                                  "text-xs font-medium",
                                  strength.score <= 1 ? "text-red-300" : strength.score === 2 ? "text-amber-300" : "text-green-300"
                                )}>
                                  {strength.label}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Confirm password */}
                        <div className="space-y-1.5">
                          <Label className="text-sm font-medium text-indigo-100">Xác nhận mật khẩu</Label>
                          <div className="relative">
                            <Input
                              type={showCf ? "text" : "password"}
                              placeholder="••••••••"
                              value={confirm}
                              onChange={(e) => setConfirm(e.target.value)}
                              required
                              className={cn(
                                "h-11 rounded-lg border-indigo-400/60 bg-indigo-500/40 text-white placeholder:text-indigo-300 pr-10 focus-visible:ring-white/40",
                                confirm.length > 0 && (matching ? "border-green-400/70" : "border-red-400/70")
                              )}
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              {confirm.length > 0 && matching ? (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400 }}>
                                  <Check className="h-4 w-4 text-green-400" />
                                </motion.div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setShowCf(!showCf)}
                                  className="text-indigo-300 hover:text-white transition-colors"
                                >
                                  {showCf ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                              )}
                            </div>
                          </div>
                          <AnimatePresence>
                            {confirm.length > 0 && !matching && (
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-xs text-red-300"
                              >
                                Mật khẩu không khớp
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Terms */}
                        <label className="flex items-start gap-2.5 cursor-pointer select-none">
                          <div
                            onClick={() => setTerms(!terms)}
                            className={cn(
                              "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                              terms ? "border-white bg-white" : "border-indigo-400/60 bg-indigo-500/30"
                            )}
                          >
                            {terms && <Check className="h-2.5 w-2.5 text-indigo-600" />}
                          </div>
                          <span className="text-sm text-indigo-200 leading-relaxed">
                            Tôi đồng ý với{" "}
                            <button type="button" className="font-medium text-white hover:opacity-80 transition-opacity underline-offset-2 hover:underline">
                              Điều khoản dịch vụ
                            </button>
                            {" "}và{" "}
                            <button type="button" className="font-medium text-white hover:opacity-80 transition-opacity underline-offset-2 hover:underline">
                              Chính sách bảo mật
                            </button>
                          </span>
                        </label>

                        {/* Submit */}
                        <Button
                          type="submit"
                          disabled={!canSubmit || loading}
                          className="w-full h-11 rounded-lg font-semibold bg-white text-indigo-600 hover:bg-indigo-50 text-sm shadow-sm disabled:opacity-40"
                        >
                          {loading ? (
                            <span className="flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Đang tạo tài khoản…
                            </span>
                          ) : "Tạo tài khoản"}
                        </Button>

                        <p className="text-center text-[11px] text-indigo-300">
                          Demo — quá trình đăng ký được mô phỏng
                        </p>

                      </form>
                    </div>

                    {/* Card footer */}
                    <div className="border-t border-indigo-500/50 px-8 py-4 text-center text-sm text-indigo-200">
                      Đã có tài khoản?{" "}
                      <Link href="/login" className="font-semibold text-white hover:opacity-80 transition-opacity">
                        Đăng nhập
                      </Link>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
