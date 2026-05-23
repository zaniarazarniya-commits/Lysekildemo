/**
 * HOME SCREEN
 * Färje-widget + snabbknappar + dagens evenemang.
 */

import React, { useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ship, ArrowRight, Clock, Utensils, ShoppingBag, MapPin } from "lucide-react-native";
import { colors, radius, spacing, typography, shadows } from "../theme";
import { MOCK_RESTAURANTS, MOCK_SHOPS, isOpenNow } from "../data/places";
import { MOCK_EVENTS, getTodayEvents } from "../data/events";

// Hårdkodad färja — ersätts av VästtrafikService i Task 14
const NEXT_FERRY = { minutesLeft: 12, time: "14:15", status: "onTime" as const };

interface Props {
  navigation: any;
}

export default function HomeScreen({ navigation }: Props) {
  const openRestaurants = useMemo(
    () => MOCK_RESTAURANTS.filter((p) => isOpenNow(p)).length,
    []
  );
  const openShops = useMemo(
    () => MOCK_SHOPS.filter((p) => isOpenNow(p)).length,
    []
  );
  const todayEvents = useMemo(() => getTodayEvents(MOCK_EVENTS), []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

        {/* Färje-hero */}
        <View style={styles.ferryHero}>
          <View style={styles.ferryEyebrow}>
            <Ship size={12} color="rgba(255,255,255,0.75)" />
            <Text style={styles.ferryEyebrowText}>Nästa färja</Text>
          </View>
          <Text style={styles.ferryCountdown}>
            {NEXT_FERRY.minutesLeft < 1 ? "Nu" : `${NEXT_FERRY.minutesLeft} min`}
          </Text>
          <View style={styles.ferryRoute}>
            <Text style={styles.ferryRouteText}>Lysekil</Text>
            <ArrowRight size={13} color="rgba(255,255,255,0.8)" />
            <Text style={styles.ferryRouteText}>Fiskebäckskil</Text>
          </View>
          <TouchableOpacity
            style={styles.ferryPill}
            onPress={() => navigation.navigate("Färja")}
            activeOpacity={0.8}
          >
            <Clock size={11} color="rgba(255,255,255,0.9)" />
            <Text style={styles.ferryPillText}>
              Avgår {NEXT_FERRY.time} · I tid
            </Text>
          </TouchableOpacity>
        </View>

        {/* Snabbknappar */}
        <View style={styles.quickGrid}>
          <TouchableOpacity
            style={styles.quickCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("Restauranger")}
          >
            <View style={styles.quickIcon}>
              <Utensils size={20} color={colors.seaBlue} />
            </View>
            <Text style={styles.quickName}>Restauranger</Text>
            <Text style={styles.quickOpen}>{openRestaurants} öppna nu</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("Butiker")}
          >
            <View style={styles.quickIcon}>
              <ShoppingBag size={20} color={colors.seaBlue} />
            </View>
            <Text style={styles.quickName}>Butiker</Text>
            <Text style={styles.quickOpen}>{openShops} öppna nu</Text>
          </TouchableOpacity>
        </View>

        {/* Händer idag */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Händer idag</Text>
          {todayEvents.length === 0 ? (
            <View style={styles.emptyEvent}>
              <Text style={styles.emptyText}>Inga evenemang idag</Text>
            </View>
          ) : (
            todayEvents.map((ev) => (
              <TouchableOpacity
                key={ev.id}
                style={styles.eventCard}
                activeOpacity={0.85}
                onPress={() => navigation.navigate("Evenemang")}
              >
                <Text style={styles.eventTitle}>{ev.title}</Text>
                <View style={styles.eventMeta}>
                  <MapPin size={11} color={colors.granite} />
                  <Text style={styles.eventMetaText}>{ev.location}</Text>
                  {ev.timeStart && (
                    <>
                      <Text style={styles.dot}>·</Text>
                      <Clock size={11} color={colors.granite} />
                      <Text style={styles.eventMetaText}>
                        {ev.timeStart}{ev.timeEnd ? `–${ev.timeEnd}` : ""}
                      </Text>
                    </>
                  )}
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.shell },
  content: { paddingBottom: 100 },
  ferryHero: {
    backgroundColor: colors.deepSea,
    padding: spacing.xl,
    paddingTop: spacing.xl + 4,
  },
  ferryEyebrow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: spacing.sm,
  },
  ferryEyebrowText: {
    fontSize: 10,
    fontWeight: "700",
    color: "rgba(255,255,255,0.75)",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  ferryCountdown: {
    fontSize: 44,
    fontWeight: "700",
    color: colors.white,
    letterSpacing: -1,
    lineHeight: 46,
  },
  ferryRoute: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: 4,
  },
  ferryRouteText: { fontSize: 13, color: "rgba(255,255,255,0.8)", fontWeight: "500" },
  ferryPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  ferryPillText: { fontSize: 11, color: "rgba(255,255,255,0.9)", fontWeight: "600" },
  quickGrid: {
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.lg,
  },
  quickCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    ...shadows.sm,
  },
  quickIcon: {
    width: 44,
    height: 44,
    backgroundColor: colors.sand,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  quickName: { fontSize: 13, fontWeight: "700", color: colors.rockDark },
  quickOpen: { fontSize: 11, color: colors.kelp, fontWeight: "600", marginTop: 3 },
  section: { paddingHorizontal: spacing.lg },
  sectionLabel: {
    ...typography.caption,
    color: colors.granite,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: spacing.md,
  },
  eventCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: colors.seaBlue,
    ...shadows.sm,
    marginBottom: spacing.sm,
  },
  eventTitle: { ...typography.h3, color: colors.rockDark, marginBottom: 4 },
  eventMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
  eventMetaText: { fontSize: 11, color: colors.granite },
  dot: { fontSize: 11, color: colors.granite },
  emptyEvent: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  emptyText: { fontSize: 13, color: colors.granite },
});
