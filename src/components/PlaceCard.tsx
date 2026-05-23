/**
 * PLACE CARD
 * Återanvänd kort-komponent för restauranger och butiker.
 * Används i RestaurantsScreen, ShopsScreen och MapScreen.
 */

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Star, Clock, Circle } from "lucide-react-native";
import { colors, shadows, radius, spacing, typography } from "../theme";
import { Place, getOpenStatus } from "../data/places";

const { width } = Dimensions.get("window");

interface PlaceCardProps {
  place: Place;
  onPress: (place: Place) => void;
}

// Kategori → bakgrundsfärg för fotoplats (tills Google Photos kopplas)
const CATEGORY_COLORS: Record<string, [string, string]> = {
  Skaldjur:    ["#1B4B66", "#2D6A8E"],
  Mat:         ["#2D6A8E", "#4A8BAF"],
  Fika:        ["#4A7C59", "#5A7D6B"],
  Bar:         ["#3D3D3D", "#6B6B6B"],
  Souvenirer:  ["#B8860B", "#C9A96E"],
  "Mat & Dryck": ["#5A7D6B", "#7A9B8A"],
  Kläder:      ["#4A8BAF", "#C4B8A8"],
  Övrigt:      ["#C4B8A8", "#EDE8E0"],
};

export default function PlaceCard({ place, onPress }: PlaceCardProps) {
  const { open, label } = getOpenStatus(place);
  const [colorA, colorB] = CATEGORY_COLORS[place.category] ?? ["#2D6A8E", "#4A8BAF"];

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => onPress(place)}
    >
      {/* Foto-banner (gradient tills riktiga foton kopplas) */}
      <View
        style={[
          styles.imageBanner,
          { backgroundColor: colorA },
        ]}
      >
        <View style={[styles.imageBannerOverlay, { backgroundColor: colorB }]} />
      </View>

      <View style={styles.body}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>{place.name}</Text>
          <View style={styles.openBadge}>
            <Circle
              size={7}
              color={open ? colors.kelp : colors.rust}
              fill={open ? colors.kelp : colors.rust}
            />
            <Text style={[styles.openText, { color: open ? colors.kelp : colors.rust }]}>
              {open ? "Öppet" : "Stängt"}
            </Text>
          </View>
        </View>

        <View style={styles.meta}>
          <Text style={styles.category}>{place.category}</Text>
          {place.rating != null && (
            <>
              <Text style={styles.dot}>·</Text>
              <Star size={11} color={colors.rust} fill={colors.rust} />
              <Text style={styles.rating}>{place.rating.toFixed(1)}</Text>
            </>
          )}
          <Text style={styles.dot}>·</Text>
          <Clock size={11} color={colors.granite} />
          <Text style={styles.metaText}>{label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    ...shadows.sm,
  },
  imageBanner: {
    height: 72,
    position: "relative",
  },
  imageBannerOverlay: {
    position: "absolute",
    right: 0,
    top: 0,
    width: "50%",
    height: "100%",
    opacity: 0.6,
  },
  body: {
    padding: spacing.md,
    paddingTop: spacing.sm + 2,
    paddingBottom: spacing.md,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    flex: 1,
    ...typography.h3,
    color: colors.rockDark,
    marginRight: spacing.sm,
  },
  openBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  openText: {
    fontSize: 10,
    fontWeight: "700",
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flexWrap: "wrap",
  },
  category: {
    fontSize: 11,
    color: colors.granite,
    fontWeight: "500",
  },
  dot: {
    fontSize: 11,
    color: colors.granite,
  },
  rating: {
    fontSize: 11,
    color: colors.granite,
    fontWeight: "600",
  },
  metaText: {
    fontSize: 11,
    color: colors.granite,
  },
});
