import React from "react";
import Svg, { Path, Circle, Rect, Line } from "react-native-svg";

export const OverviewIcon = ({ color = "#000" }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
    <Path d="M8 12h8" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path d="M12 8v8" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const DashboardIcon = ({ color = "#000" }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="3" width="8" height="8" stroke={color} strokeWidth={2} />
    <Rect x="13" y="3" width="8" height="8" stroke={color} strokeWidth={2} />
    <Rect x="3" y="13" width="8" height="8" stroke={color} strokeWidth={2} />
    <Rect x="13" y="13" width="8" height="8" stroke={color} strokeWidth={2} />
  </Svg>
);

export const HorizontalMenuIcon = ({ color = "#000" }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path d="M4 6h16" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path d="M4 12h16" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path d="M4 18h16" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const DefaultManIcon = ({ color = "#000" }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth={2} />
    <Path
      d="M4 21v-2a4 4 0 014-4h8a4 4 0 014 4v2"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const StatsIcon = ({ color = "#000" }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path d="M5 12h2v5H5v-5zM11 7h2v10h-2V7zM17 14h2v3h-2v-3z" fill={color} />
  </Svg>
);

export const SettingsIcon = ({ color = "#000" }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const HomeIcon = ({ color = "#000" }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 12l9-9 9 9v9a3 3 0 0 1-3 3h-12a3 3 0 0 1-3-3v-9z"
      stroke={color}
      strokeWidth={2}
    />
    <Path d="M9 21v-6h6v6" stroke={color} strokeWidth={2} />
  </Svg>
);

export const MessagesIcon = ({ color = "#000" }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"
      stroke={color}
      strokeWidth={2}
    />
  </Svg>
);

export const ProfileIcon = ({ color = "#000" }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth={2} />
    <Path d="M5.5 21a6.5 6.5 0 0 1 13 0" stroke={color} strokeWidth={2} />
  </Svg>
);

export const AdminPanelIcon = ({ color = "#000" }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path d="M4 4h16v16H4z" stroke={color} strokeWidth={2} />
    <Path d="M9 9h6v6H9z" fill={color} />
  </Svg>
);

export const BackIcon = ({ color = "#000" }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18l-6-6 6-6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const NextIcon = ({ color = "#000" }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 6l6 6-6 6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const AboutIcon = ({ color = "#000" }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={2} />
    <Line
      x1={12}
      y1={8}
      x2={12}
      y2={12}
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Circle cx={12} cy={16} r={1} fill={color} />
  </Svg>
);

export const HelpIcon = ({ color = "#000" }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={2} />
    <Path
      d="M9.5 9a2.5 2.5 0 015 1c0 1.5-2 2-2 3"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={12} cy={17} r={1} fill={color} />
  </Svg>
);

export const BackArrowIcon = ({ color = "#000" }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18l-6-6 6-6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const LogoutIcon = ({ color = "#000" }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Rect
      x={3}
      y={4}
      width={12}
      height={16}
      rx={2}
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 12h5m-2-2l3 2-3 2"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
