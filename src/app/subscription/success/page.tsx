"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [storedOrder, setStoredOrder] = useState<string>("");
  useEffect(() => {
    try {
      setStoredOrder(sessionStorage.getItem("lumio_payos_order_code") ?? "");
    } catch {
      setStoredOrder("");
    }
  }, []);

  const orderCode =
    searchParams.get("orderCode") ??
    searchParams.get("order_code") ??
    searchParams.get("orderId") ??
    storedOrder ??
    "";

  const [status, setStatus] = useState<string | null>(null);
  const [pollError, setPollError] = useState<string | null>(null);
  /** Hết thời gian poll mà vẫn PENDING — thường do webhook chưa/chưa tới server */
  const [pendingTimeout, setPendingTimeout] = useState(false);

  useEffect(() => {
    if (!orderCode) return;

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 45;
    const intervalMs = 2000;

    const tick = async () => {
      if (cancelled) return;
      if (attempts >= maxAttempts) {
        setPendingTimeout(true);
        return;
      }
      attempts++;
      try {
        const r = await fetch(
          `/api/subscriptions/purchase/status/${encodeURIComponent(orderCode)}`
        );
        const data = (await r.json()) as { status?: string; message?: string };
        if (!r.ok) {
          setPollError(data.message ?? "Không đọc được trạng thái đơn.");
          return;
        }
        if (data.status) setStatus(data.status);
        if (data.status === "PAID") {
          try {
            sessionStorage.removeItem("lumio_payos_order_code");
          } catch {
            /* ignore */
          }
          return;
        }
        if (
          data.status === "CANCELLED" ||
          data.status === "EXPIRED" ||
          data.status === "FAILED"
        ) {
          return;
        }
        setTimeout(tick, intervalMs);
      } catch {
        setPollError("Lỗi mạng khi kiểm tra trạng thái.");
      }
    };

    tick();
    return () => {
      cancelled = true;
    };
  }, [orderCode]);

  const paid = status === "PAID";
  const badTerminal =
    status === "EXPIRED" ||
    status === "CANCELLED" ||
    status === "FAILED";
  const showSpinner =
    !paid &&
    !badTerminal &&
    !pollError &&
    !pendingTimeout &&
    Boolean(orderCode);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
      {paid ? (
        <CheckCircle2 className="mb-4 h-16 w-16 text-green-500" aria-hidden />
      ) : badTerminal || pendingTimeout ? (
        <AlertCircle className="mb-4 h-16 w-16 text-amber-500" aria-hidden />
      ) : (
        <Loader2
          className={`mb-4 h-12 w-12 text-indigo-600 ${showSpinner ? "animate-spin" : ""}`}
          aria-hidden
        />
      )}
      <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        {paid
          ? "Thanh toán thành công"
          : badTerminal
            ? "Chưa kích hoạt tài khoản từ đơn này"
            : pendingTimeout
              ? "Chưa nhận được xác nhận từ máy chủ"
              : "Đang xác nhận thanh toán…"}
      </h1>
      <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
        {paid
          ? "Tài khoản cửa hàng của bạn đã được tạo. Hãy đăng nhập bằng email hoặc tên đăng nhập đã đăng ký."
          : status === "EXPIRED"
            ? "Đơn chờ thanh toán trên hệ thống đã hết hạn (thường vài phút sau khi tạo link) trước khi máy chủ nhận được xác nhận PayOS, nên tài khoản chưa được tạo. Tiền có thể đã vào PayOS/ngân hàng nhưng luồng đăng ký cần webhook thành công trong thời gian đơn còn hiệu lực — hãy thử đăng ký thanh toán lại hoặc liên hệ hỗ trợ kèm mã đơn."
            : status === "CANCELLED"
              ? "Giao dịch đã bị hủy trên PayOS. Không có tài khoản mới được tạo từ đơn này."
              : status === "FAILED"
                ? "Xử lý đơn trên máy chủ thất bại. Vui lòng thử lại từ bảng giá hoặc liên hệ hỗ trợ."
                : pendingTimeout
                  ? "Đã chờ nhưng trạng thái đơn vẫn là PENDING. Thường gặp khi PayOS không gọi được webhook tới API của bạn (ví dụ API chạy localhost), hoặc webhook chậm. Kiểm tra cấu hình PayOS / URL công khai của backend."
                  : orderCode
                    ? "Hệ thống đang đồng bộ với PayOS. Quá trình này thường mất vài giây sau khi thanh toán thành công."
                    : "Nếu bạn vừa hoàn tất thanh toán, tài khoản sẽ được kích hoạt sau khi PayOS gửi xác nhận tới máy chủ."}
      </p>
      {orderCode && (
        <p className="mb-4 font-mono text-xs text-gray-400">
          Mã đơn: {orderCode}
          {status ? ` · ${status}` : ""}
        </p>
      )}
      {pollError && (
        <p className="mb-4 text-sm text-amber-600 dark:text-amber-400">{pollError}</p>
      )}
      {paid ? (
        <>
          <Button asChild className="rounded-xl">
            <Link href="/login">Đăng nhập</Link>
          </Button>
          <Link
            href="/pricing"
            className="mt-4 text-sm text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400"
          >
            Về bảng giá
          </Link>
        </>
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/pricing">Thử lại từ bảng giá</Link>
          </Button>
          <Button asChild variant="secondary" className="rounded-xl">
            <Link href="/login">Đăng nhập</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default function SubscriptionSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
