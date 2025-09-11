// components/icons.tsx
import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

export const OverviewIcon = ({ color = '#444' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
    <Path d="M8 12h8" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path d="M12 8v8" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const StatsIcon = ({ color = '#444' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path d="M5 12h2v5H5v-5zM11 7h2v10h-2V7zM17 14h2v3h-2v-3z" fill={color} />
  </Svg>
);

export const SettingsIcon = ({ color = '#444' }: { color?: string }) => (
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

// Add more icons similarly for Home, Messages, Profile, AdminPanel ...
export const HomeIcon = ({ color = '#444' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path d="M3 12l9-9 9 9v9a3 3 0 0 1-3 3h-12a3 3 0 0 1-3-3v-9z" stroke={color} strokeWidth={2} />
    <Path d="M9 21v-6h6v6" stroke={color} strokeWidth={2} />
  </Svg>
);

export const MessagesIcon = ({ color = '#444' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" stroke={color} strokeWidth={2} />
  </Svg>
);

export const ProfileIcon = ({ color = '#444' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth={2} />
    <Path d="M5.5 21a6.5 6.5 0 0 1 13 0" stroke={color} strokeWidth={2} />
  </Svg>
);

export const AdminPanelIcon = ({ color = '#444' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path d="M4 4h16v16H4z" stroke={color} strokeWidth={2} />
    <Path d="M9 9h6v6H9z" fill={color} />
  </Svg>
);
