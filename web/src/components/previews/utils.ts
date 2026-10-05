export function getStatusVariant(status: string): "accent" | "accent2" | "neutral" | "outline" {
  switch (status.toLowerCase()) {
    case "sent":
    case "published":
      return "accent2";
    case "draft":
      return "neutral";
    case "scheduled":
      return "accent";
    default:
      return "neutral";
  }
}
