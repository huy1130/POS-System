import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SubscriptionCancelPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
      <XCircle className="mb-4 h-16 w-16 text-amber-500" aria-hidden />
      <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        Thanh toán chưa hoàn tất
      </h1>
      <p className="mb-8 text-sm text-gray-600 dark:text-gray-400">
        Bạn đã hủy hoặc thoát khỏi trang thanh toán PayOS. Chưa có tài khoản mới được tạo — bạn có thể
        chọn lại gói và thử lại bất cứ lúc nào.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="default" className="rounded-xl">
          <Link href="/pricing">Chọn gói</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-xl">
          <Link href="/">Về trang chủ</Link>
        </Button>
      </div>
    </div>
  );
}
