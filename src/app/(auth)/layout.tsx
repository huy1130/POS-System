import { ForceLightTheme } from "@/components/layout/ForceLightTheme";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <ForceLightTheme>{children}</ForceLightTheme>;
}
