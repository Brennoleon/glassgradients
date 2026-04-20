import {
  GlassCalendar,
  GlassChart,
  GlassCombobox,
  GlassDataGrid,
  GlassDropdown,
  GlassKanban,
  GlassNotificationCenter,
  GlassResizablePanel,
  GlassSpotlightOverlay,
  GlassTabs,
  GlassTimeline,
  GlassToast
} from "glassgradients/components/react";

export function AdvancedSuite() {
  return (
    <GlassResizablePanel aria-label="Operations workspace">
      <GlassTabs aria-label="Workspace views" />
      <GlassCombobox aria-label="Search records" />
      <GlassDropdown aria-label="Actions" />
      <GlassDataGrid aria-label="Deployments" />
      <GlassChart aria-label="Release health" />
      <GlassTimeline aria-label="Activity" />
      <GlassKanban aria-label="Pipeline" />
      <GlassCalendar aria-label="Schedule" />
      <GlassNotificationCenter aria-label="Notifications" />
      <GlassToast>Build finished</GlassToast>
      <GlassSpotlightOverlay aria-label="Command spotlight" />
    </GlassResizablePanel>
  );
}
