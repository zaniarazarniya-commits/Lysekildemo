/**
 * PLACE DETAIL SCREEN
 * Detaljsida för restaurang eller butik.
 * Navigeras till med: navigation.navigate("PlaceDetail", { place })
 */

import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  SafeAreaView,
} from "react-native";
import {
  ArrowLeft,
  Phone,
  Globe,
  MapPin,
  Clock,
  Star,
  ChevronRight,
} from "lucide-react-native";
import { colors, radius, spacing, typography, shadows } from "../theme";
import { Place, getOpenStatus } from "../data/places";

interface Props {
  route: { params: { place: Place } };
  navigation: any;
}

export default function PlaceDetailScreen({ route, navigation }: Props) {
  const { place } = route.params;
  const { open, label } = getOpenStatus(place);

  const handlePhone = () => {
    if (place.phone) Linking.openURL(`tel:${place.phone}`);
  };

  const handleMaps = () => {
    const url = `https://maps.apple.com/?q=${place.lat},${place.lng}`;
    Linking.openURL(url);
  };

  const handleWeb = () => {
    if (place.website) Linking.openURL(place.website);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Tillbaka-knapp */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <ArrowLeft size={22} color={colors.seaBlue} />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero-banner */}
        <View style={styles.heroBanner} />

        <View style={styles.content}>
          {/* Namn + status */}
          <View style={styles.nameRow}>
            <Text style={styles.name}>{place.name}</Text>
            <View style={[styles.statusPill, { backgroundColor: open ? "rgba(90,125,107,0.12)" : "rgba(184,134,11,0.1)" }]}>
              <Text style={[styles.statusText, { color: open ? colors.kelp : colors.rust }]}>
                {open ? "Öppet" : "Stängt"}
              </Text>
            </View>
          </View>

          {/* Kategori + betyg */}
          <View style={styles.metaRow}>
            <Text style={styles.category}>{place.category}</Text>
            {place.rating != null && (
              <>
                <Text style={styles.dot}>·</Text>
                <Star size={13} color={colors.rust} fill={colors.rust} />
                <Text style={styles.rating}>
                  {place.rating.toFixed(1)}
                  {place.reviewCount ? ` (${place.reviewCount})` : ""}
                </Text>
              </>
            )}
          </View>

          {/* Nästa öppet/stänger */}
          <View style={styles.infoRow}>
            <Clock size={15} color={colors.granite} />
            <Text style={styles.infoText}>{label}</Text>
          </View>

          {/* Öppettider */}
          {place.openHours && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Öppettider</Text>
              {Object.entries(place.openHours).map(([day, hours]) => (
                <View key={day} style={styles.hoursRow}>
                  <Text style={styles.hoursDay}>{day}</Text>
                  <Text style={styles.hoursTime}>{hours}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Kontakt */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Kontakt</Text>

            <TouchableOpacity style={styles.actionRow} onPress={handleMaps} activeOpacity={0.8}>
              <MapPin size={18} color={colors.seaBlue} />
              <Text style={styles.actionText}>{place.address}</Text>
              <ChevronRight size={16} color={colors.granite} />
            </TouchableOpacity>

            {place.phone && (
              <TouchableOpacity style={styles.actionRow} onPress={handlePhone} activeOpacity={0.8}>
                <Phone size={18} color={colors.seaBlue} />
                <Text style={styles.actionText}>{place.phone}</Text>
                <ChevronRight size={16} color={colors.granite} />
              </TouchableOpacity>
            )}

            {place.website && (
              <TouchableOpacity style={styles.actionRow} onPress={handleWeb} activeOpacity={0.8}>
                <Globe size={18} color={colors.seaBlue} />
                <Text style={styles.actionText} numberOfLines={1}>
                  {place.website.replace(/^https?:\/\//, "")}
                </Text>
                <ChevronRight size={16} color={colors.granite} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.shell },
  backBtn: {
    position: "absolute",
    top: 52,
    left: spacing.lg,
    zIndex: 10,
    backgroundColor: colors.white,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.md,
  },
  heroBanner: {
    height: 220,
    backgroundColor: colors.deepSea,
  },
  content: { padding: spacing.lg },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.xs,
  },
  name: { ...typography.h1, color: colors.rockDark, flex: 1, marginRight: spacing.sm },
  statusPill: {
    borderRadius: radius.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
  },
  statusText: { fontSize: 12, fontWeight: "700" },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  category: { fontSize: 13, color: colors.granite },
  dot: { color: colors.granite },
  rating: { fontSize: 13, color: colors.granite, fontWeight: "600" },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  infoText: { fontSize: 13, color: colors.granite },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    ...shadows.sm,
  },
  cardTitle: {
    ...typography.caption,
    color: colors.granite,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: spacing.md,
  },
  hoursRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.04)",
  },
  hoursDay: { fontSize: 13, color: colors.rockDark, fontWeight: "500" },
  hoursTime: { fontSize: 13, color: colors.granite },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.04)",
  },
  actionText: { flex: 1, fontSize: 14, color: colors.seaBlue, fontWeight: "500" },
});
