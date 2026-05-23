/**
 * UNIK FUNKTION 2: FÄRJE-DIRECT
 * Realtidsnedräkning, lokala notiser och schema för
 * Lysekil–Fiskebäckskil. Integration med Västtrafik.
 */

import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Vibration } from "react-native";
import { Ship, Clock, Bell, Bus } from "lucide-react-native";
import { colors, shadows, radius, spacing, typography } from "../theme";

interface FerryDeparture {
    time: string;
    direction: "to" | "from"; // to = Lysekil→Fiskebäckskil, from = Fiskebäckskil→Lysekil
    status: "onTime" | "delayed" | "cancelled";
}

const SCHEDULE: FerryDeparture[] = [
    { time: "14:00", direction: "from", status: "onTime" },
    { time: "14:15", direction: "to", status: "onTime" },
    { time: "14:30", direction: "from", status: "onTime" },
    { time: "14:45", direction: "to", status: "onTime" },
    { time: "15:00", direction: "from", status: "onTime" },
    { time: "15:15", direction: "to", status: "onTime" },
];

function getMinutesUntil(nextTime: string): number {
    const now = new Date();
    const [h, m] = nextTime.split(":").map(Number);
    const target = new Date();
    target.setHours(h, m, 0, 0);
    if (target < now) target.setDate(target.getDate() + 1);
    return Math.max(0, Math.floor((target.getTime() - now.getTime()) / 60000));
}

export default function FerryDirect() {
    const [minutesLeft, setMinutesLeft] = useState(12);
    const [reminderSet, setReminderSet] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setMinutesLeft((prev) => (prev > 0 ? prev - 1 : getMinutesUntil("14:30")));
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const toggleReminder = () => {
        setReminderSet((prev) => !prev);
        if (!reminderSet) {
            Vibration.vibrate(100);
            // Här skulle man schemalägga en lokal notis via expo-notifications
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Färje-Direct</Text>

            {/* Countdown Card */}
            <View style={styles.countdownCard}>
                <View style={styles.countdownHeader}>
                    <Ship size={24} color={colors.seaBlue} />
                    <View style={{ flex: 1, marginLeft: spacing.sm }}>
                        <Text style={styles.countdownTitle}>Lysekil ↔ Fiskebäckskil</Text>
                        <Text style={styles.countdownSub}>Avgår varje halvtimme (säsong)</Text>
                    </View>
                </View>

                <View style={styles.countdownBody}>
                    <Text style={styles.countdownLabel}>Nästa avgång om</Text>
                    <Text style={styles.countdownTime}>
                        {minutesLeft < 1 ? "Nu" : `${minutesLeft} min`}
                    </Text>
                </View>

                <TouchableOpacity
                    style={[
                        styles.remindBtn,
                        reminderSet && styles.remindBtnActive,
                    ]}
                    activeOpacity={0.8}
                    onPress={toggleReminder}
                >
                    <Bell size={18} color={reminderSet ? "#fff" : colors.seaBlue} />
                    <Text
                        style={[
                            styles.remindText,
                            reminderSet && styles.remindTextActive,
                        ]}
                    >
                        {reminderSet
                            ? "Påminnelse aktiv (10 min innan)"
                            : "Påminn mig 10 min innan"}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Schedule */}
            <Text style={styles.sectionTitle}>Kommande avgångar</Text>
            <View style={styles.scheduleCard}>
                {SCHEDULE.map((dep, i) => (
                    <View key={i} style={styles.scheduleRow}>
                        <Text style={styles.scheduleTime}>{dep.time}</Text>
                        <Text
                            style={[
                                styles.scheduleDir,
                                dep.direction === "to"
                                    ? { color: colors.seaBlue }
                                    : { color: colors.graniteGrey },
                            ]}
                        >
                            {dep.direction === "to" ? "→ Fiskebäckskil" : "→ Lysekil"}
                        </Text>
                        <View
                            style={[
                                styles.statusDot,
                                {
                                    backgroundColor:
                                        dep.status === "onTime"
                                            ? colors.kelpGreen
                                            : dep.status === "delayed"
                                            ? colors.sunsetAmber
                                            : colors.alertRed,
                                },
                            ]}
                        />
                    </View>
                ))}
            </View>

            {/* Västtrafik connection */}
            <View style={styles.transitCard}>
                <Bus size={20} color={colors.seaBlue} />
                <View style={{ flex: 1, marginLeft: spacing.sm }}>
                    <Text style={styles.transitTitle}>Anslutning på andra sidan</Text>
                    <Text style={styles.transitDesc}>
                        Buss 841 till Uddevalla avgår 14:22 från Fiskebäckskil
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.shellWhite, padding: spacing.lg },
    header: {
        fontSize: typography.h1.fontSize,
        fontWeight: typography.h1.fontWeight,
        color: colors.rockDark,
        marginBottom: spacing.lg,
    },
    countdownCard: {
        backgroundColor: colors.foamWhite,
        borderRadius: radius.md,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.06)",
        marginBottom: spacing.lg,
    },
    countdownHeader: { flexDirection: "row", alignItems: "center", marginBottom: spacing.md },
    countdownTitle: { fontSize: 16, fontWeight: "700", color: colors.rockDark },
    countdownSub: { fontSize: 12, color: colors.graniteGrey, marginTop: 1 },
    countdownBody: {
        backgroundColor: colors.sandBeige,
        borderRadius: radius.sm,
        padding: spacing.lg,
        alignItems: "center",
        marginBottom: spacing.md,
    },
    countdownLabel: { fontSize: 13, color: colors.graniteGrey, marginBottom: 4 },
    countdownTime: { fontSize: 36, fontWeight: "700", color: colors.seaBlue },
    remindBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        paddingVertical: 14,
        borderRadius: radius.sm,
        borderWidth: 1.5,
        borderColor: colors.seaBlue,
    },
    remindBtnActive: { backgroundColor: colors.seaBlue, borderColor: colors.seaBlue },
    remindText: { fontSize: 14, fontWeight: "600", color: colors.seaBlue },
    remindTextActive: { color: "#fff" },
    sectionTitle: {
        fontSize: typography.h3.fontSize,
        fontWeight: typography.h3.fontWeight,
        color: colors.rockDark,
        marginBottom: spacing.sm,
    },
    scheduleCard: {
        backgroundColor: colors.foamWhite,
        borderRadius: radius.md,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.06)",
        marginBottom: spacing.lg,
    },
    scheduleRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.06)",
    },
    scheduleTime: { fontSize: 15, fontWeight: "700", color: colors.rockDark, width: 50 },
    scheduleDir: { flex: 1, fontSize: 14, fontWeight: "500" },
    statusDot: { width: 8, height: 8, borderRadius: 4 },
    transitCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.foamWhite,
        borderRadius: radius.md,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.06)",
    },
    transitTitle: { fontSize: 14, fontWeight: "600", color: colors.rockDark },
    transitDesc: { fontSize: 12, color: colors.graniteGrey, marginTop: 2 },
});
