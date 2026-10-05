"use client";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { ChevronDown } from "lucide-react";
import { LoginButton } from "@/components/login-button";

export default function MainNavbar() {
  return (
    <header className="border-divider border-b bg-background">
      <nav className="mx-auto flex items-center justify-between p-4 text-foreground">
        <div>
          <span className="font-heading text-lg">Buffer Gaze</span>
        </div>
        <NavigationMenu.Root>
          <NavigationMenu.List className="flex items-center justify-between gap-2">
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="flex cursor-pointer items-center gap-1 font-medium hover:text-accent">
                Overview
                <NavigationMenu.Icon>
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 [[data-panel-open]_&]:rotate-180" />
                </NavigationMenu.Icon>
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="mt-2 w-48 rounded-xl border border-divider bg-surface p-2 shadow-md">
                <ul>
                  <li>
                    <button
                      type="button"
                      className="block w-full rounded-lg p-2 text-left text-foreground hover:bg-neutral-200"
                    >
                      Hello world
                    </button>
                  </li>
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <LoginButton />
            </NavigationMenu.Item>
          </NavigationMenu.List>

          <NavigationMenu.Portal>
            <NavigationMenu.Positioner
              className=""
              sideOffset={10}
              collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}
              collisionAvoidance={{ side: "none" }}
            >
              <NavigationMenu.Popup className="">
                <NavigationMenu.Arrow className="" />
                <NavigationMenu.Viewport className="" />
              </NavigationMenu.Popup>
            </NavigationMenu.Positioner>
          </NavigationMenu.Portal>
        </NavigationMenu.Root>
      </nav>
    </header>
  );
}
