import type { Metadata } from "next";
import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Thanh toán đã hủy · Lumio",
  description: "Bạn đã hủy thanh toán. Chọn lại gói bất cứ lúc nào.",
};

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function SubscriptionCancelPage({ searchParams }: Props) {
  const orderCode =
    typeof searchParams.orderCode === "string" ? searchParams.orderCode : undefined;
  const status =
    typeof searchParams.status === "string" ? searchParams.status : undefined;

  return (
    <div className="mx-auto max-w-lg px-6 py-20 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
        <XCircle className="h-9 w-9" aria-hidden />
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
        Thanh toán chưa hoàn tất
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        Bạn đã hủy hoặc đóng cổng thanh toán PayOS. Không có khoản phí nào được trừ.
        Bạn có thể chọn lại gói và thanh toán lại khi sẵn sàng.
      </p>
      {(orderCode || status) && (
        <p className="mt-6 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-500 dark:border-gray-800 dark:bg-gray-900/60 dark:text-gray-400">
          {status && <span className="block">Trạng thái: {status}</span>}
          {orderCode && (
            <span className="mt-1 block font-mono">
              Mã đơn: {orderCode}
            </span>
          )}
        </p>
      )}
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild className="rounded-xl">
          <Link href="/pricing">Chọn lại gói</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-xl">
          <Link href="/">Về trang chủ</Link>
        </Button>
      </div>
    </div>
  );
}
