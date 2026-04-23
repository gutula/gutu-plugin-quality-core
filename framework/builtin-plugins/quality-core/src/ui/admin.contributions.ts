import {
  defineAdminNav,
  defineCommand,
  definePage,
  defineWorkspace,
  type AdminContributionRegistry
} from "@platform/admin-contracts";

import { BusinessAdminPage } from "./admin/main.page";

export const adminContributions: Pick<AdminContributionRegistry, "workspaces" | "nav" | "pages" | "commands"> = {
  workspaces: [
    defineWorkspace({
      id: "quality",
      label: "Quality",
      icon: "shield-check",
      description: "Inspection, release, and corrective-action control for quality-managed flows.",
      permission: "quality.inspections.read",
      homePath: "/admin/business/quality",
      quickActions: ["quality-core.open.control-room"]
    })
  ],
  nav: [
    defineAdminNav({
      workspace: "quality",
      group: "control-room",
      items: [
        {
          id: "quality-core.overview",
          label: "Control Room",
          icon: "shield-check",
          to: "/admin/business/quality",
          permission: "quality.inspections.read"
        }
      ]
    })
  ],
  pages: [
    definePage({
      id: "quality-core.page",
      kind: "dashboard",
      route: "/admin/business/quality",
      label: "Quality Control Room",
      workspace: "quality",
      group: "control-room",
      permission: "quality.inspections.read",
      component: BusinessAdminPage
    })
  ],
  commands: [
    defineCommand({
      id: "quality-core.open.control-room",
      label: "Open Quality Core",
      permission: "quality.inspections.read",
      href: "/admin/business/quality",
      keywords: ["quality core","quality","business"]
    })
  ]
};
