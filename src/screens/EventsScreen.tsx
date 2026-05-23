/**
 * EVENTS SCREEN
 * "Händer idag" + "Kommande" evenemangskalender.
 * Data: MOCK_EVENTS → byts mot API/CMS senare.
 */

import React, { useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { MapPin, Clock } from "lucide-react-native";
import { colors, radius, spacing, typography, shadows } from "../theme";
import { MOCK_EVENTS, getTodayEvents, getUpcomingEvents, formatEventDate, getDateBadge } from "../data/events";

export default function EventsScreen() {
  const todayEvents = useMemo(() => getTodayEvents(MOCK_EVENTS), []);
  const upcomingEvents = useMemo(() => getUpcomingEvents(MOCK_EVENTS), []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Evenemang</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Händer idag */}
        <Text style={styles.sectionLabel}>Händer idag</Text>
        {todayEvents.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>Inga evenemang idag</Text>
          </View>
        ) : (
          todayEvents.map((ev) => (
            <View key={ev.id} style={styles.todayCard}>
              <Text style={styles.todayTag}>{formatEventDate(ev.date)}</Text>
              <Text style={styles.todayTitle}>{ev.title}</Text>
              <View style={styles.metaRow}>
                <MapPin size={11} color={colors.granite} />
                <Text style={styles.metaText}>{ev.location}</Text>
                {ev.timeStart && (
                  <>
                    <Text style={styles.dot}>·</Text>
                    <Clock size={11} color={colors.granite} />
                    <Text style={styles.metaText}>
                      {ev.timeStart}{ev.timeEnd ? `–${ev.timeEnd}` : ""}
                    </Text>
                  </>
                )}
              </View>
              {ev.description ? (
                <Text style={styles.todayDesc}>{ev.description}</Text>
              ) : null}
            </View>
          ))
        )}

        {/* Kommande */}
        <Text style={[styles.sectionLabel, { marginTop: spacing.xl }]}>Kommande</Text>
        {upcomingEvents.map((ev, index) => {
          const { day, month } = getDateBadge(ev.date);
          const isFirst = index === 0;
          return (
            <View key={ev.id} style={styles.upcomingItem}>
              <View style={[styles.dateBadge, !isFirst && styles.dateBadgeMuted]}>
                <Text style={[styles.dateNum, !isFirst && styles.dateNumMuted]}>{day}</Text>
                <Text style={[styles.dateMon, !isFirst && styles.dateMonMuted]}>{month}</Text>
              </View>
              <View style={styles.upcomingContent}>
                <Text style={styles.upcomingTitle}>{ev.title}</Text>
                <View style={styles.metaRow}>
                  <MapPin size={11} color={colors.granite} />
                  <Text style={styles.metaText}>{ev.location}</Text>
                  {ev.timeStart && (
                    <>
                      <Text style={styles.dot}>·</Text>
                      <Clock size={11} color={colors.granite} />
                      <Text style={styles.metaText}>{ev.timeStart}</Text>
                    </>
                  )}
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.shell },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.06)",
  },
  title: { ...typography.h1, color: colors.rockDark },
  content: { padding: spacing.lg, paddingBottom: 100 },
  sectionLabel: {
    ...typography.caption,
    color: colors.granite,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: spacing.md,
  },
  emptyCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  emptyText: { fontSize: 14, color: colors.granite },
  todayCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: colors.seaBlue,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  todayTag: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.seaBlue,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  todayTitle: { ...typography.h3, color: colors.rockDark, marginBottom: 4 },
  todayDesc: {
    fontSize: 12,
    color: colors.granite,
    lineHeight: 17,
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.sand,
  },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { fontSize: 11, color: colors.granite },
  dot: { fontSize: 11, color: colors.granite },
  upcomingItem: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.md,
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "center",
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  dateBadge: {
    backgroundColor: colors.deepSea,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm + 2,
    alignItems: "center",
    minWidth: 44,
  },
  dateBadgeMuted: { backgroundColor: colors.sand },
  dateNum: { fontSize: 18, fontWeight: "700", color: colors.white, lineHeight: 20 },
  dateNumMuted: { color: colors.seaBlue },
  dateMon: { fontSize: 9, color: colors.white, textTransform: "uppercase", opacity: 0.85, marginTop: 1 },
  dateMonMuted: { color: colors.granite, opacity: 1 },
  upcomingContent: { flex: 1 },
  upcomingTitle: { ...typography.h3, color: colors.rockDark, marginBottom: 3 },
});
