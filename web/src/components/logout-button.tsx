"use client";

import Button from "@/components/button";

type LogoutButtonProps = {
  fullWidth?: boolean;
};

export function LogoutButton({ fullWidth }: LogoutButtonProps) {
  async function startBufferLogout() {
    window.location.href = "/api/auth/logout";
  }

  return (
    <Button onClick={startBufferLogout} variant="secondary" size={fullWidth ? "block" : "default"}>
      Disconnect
    </Button>
  );
}
