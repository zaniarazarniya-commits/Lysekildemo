/**
 * MAP SCREEN — Interaktiv karta med filter
 * react-native-maps + custom markers + filter-chips
 */

import React, { useState, useCallback, useMemo } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import {
    Layers,
    Utensils,
    Waves,
    Car,
    Zap,
    Toilet,
    X,
    Bus,
    ShoppingBag,
    Bed,
} from "lucide-react-native";
import { colors, shadows, radius, spacing, typography } from "../theme";
import {
    POI_DATA,
    CATEGORY_CONFIG,
    filterPOIs,
    POICategory,
} from "../data/pois";

const { width, height } = Dimensions.get("window");

/* ── Filter Chips Configuration ── */
const FILTERS: { key: POICategory | "all"; label: string; icon: any }[] = [
    { key: "all", label: "Allt", icon: Layers },
    { key: "restaurant", label: "Mat", icon: Utensils },
    { key: "beach", label: "Bad", icon: Waves },
    { key: "parking", label: "Parkering", icon: Car },
    { key: "charging", label: "Laddning", icon: Zap },
    { key: "toilet", label: "Toalett", icon: Toilet },
    { key: "bus", label: "Buss", icon: Bus },
    { key: "shop", label: "Butik", icon: ShoppingBag },
    { key: "hotel", label: "Boende", icon: Bed },
];

/* ── Lysekil Default Region ── */
const LYSEKIL_REGION: Region = {
    latitude: 58.275,
    longitude: 11.44,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
};

/* ── Map Screen Component ── */
export default function MapScreen() {
    const [activeFilter, setActiveFilter] = useState<POICategory | "all">("all");
    const [selectedPOI, setSelectedPOI] = useState<(typeof POI_DATA)[0] | null>(
        null
    );

    const visiblePOIs = useMemo(
        () => filterPOIs(POI_DATA, activeFilter),
        [activeFilter]
    );

    const handleMarkerPress = useCallback(
        (poi: (typeof POI_DATA)[0]) => {
            setSelectedPOI(poi);
        },
        []
    );

    const handleFilterPress = useCallback(
        (key: POICategory | "all") => {
            setActiveFilter(key);
            setSelectedPOI(null);
        },
        []
    );

    return (
        <View style={styles.container}>
            {/* Map */}
            <MapView
                style={styles.map}
                initialRegion={LYSEKIL_REGION}
                showsUserLocation
                showsMyLocationButton
                onPress={() => setSelectedPOI(null)}
            >
                {visiblePOIs.map((poi) => {
                    const config = CATEGORY_CONFIG[poi.category];
                    return (
                        <Marker
                            key={poi.id}
                            coordinate={{
                                latitude: poi.lat,
                                longitude: poi.lng,
                            }}
                            pinColor={config.color}
                            onPress={() => handleMarkerPress(poi)}
                        />
                    );
                })}
            </MapView>

            {/* Filter Chips (bottom floating) */}
            <View style={styles.filterContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterScroll}
                >
                    {FILTERS.map((f) => {
                        const isActive = activeFilter === f.key;
                        const Icon = f.icon;
                        return (
                            <TouchableOpacity
                                key={f.key}
                                style={[
                                    styles.filterChip,
                                    isActive && styles.filterChipActive,
                                ]}
                                activeOpacity={0.8}
                                onPress={() => handleFilterPress(f.key)}
                            >
                                <Icon
                                    size={16}
                                    color={isActive ? "#fff" : colors.graniteGrey}
                                />
                                <Text
                                    style={[
                                        styles.filterChipText,
                                        isActive && styles.filterChipTextActive,
                                    ]}
                                >
                                    {f.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            {/* Selected POI Info Panel */}
            {selectedPOI && (
                <View style={styles.infoPanel}>
                    <TouchableOpacity
                        style={styles.infoClose}
                        onPress={() => setSelectedPOI(null)}
                        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                    >
                        <X size={20} color={colors.graniteGrey} />
                    </TouchableOpacity>
                    <View style={styles.infoHeader}>
                        <View
                            style={[
                                styles.infoDot,
                                {
                                    backgroundColor:
                                        CATEGORY_CONFIG[selectedPOI.category]
                                            .color,
                                },
                            ]}
                        />
                        <Text style={styles.infoTitle}>{selectedPOI.name}</Text>
                    </View>
                    <Text style={styles.infoDesc}>
                        {selectedPOI.description}
                    </Text>
                    <View style={styles.infoMetaRow}>
                        <Text style={styles.infoMeta}>{selectedPOI.meta}</Text>
                        {selectedPOI.accessibility && (
                            <View style={styles.accessBadge}>
                                <Text style={styles.accessText}>
                                    Tillgänglighetsanpassad
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            )}
        </View>
    );
}

/* ── Styles ── */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },

    /* Filter Chips */
    filterContainer: {
        position: "absolute",
        bottom: 16,
        left: 0,
        right: 0,
        paddingHorizontal: spacing.lg,
    },
    filterScroll: {
        gap: spacing.sm,
        paddingVertical: 4,
    },
    filterChip: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 10,
        backgroundColor: colors.foamWhite,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.08)",
        ...shadows.sm,
    },
    filterChipActive: {
        backgroundColor: colors.seaBlue,
        borderColor: colors.seaBlue,
    },
    filterChipText: {
        fontSize: 13,
        fontWeight: "600",
        color: colors.graniteGrey,
    },
    filterChipTextActive: {
        color: "#fff",
    },

    /* Info Panel */
    infoPanel: {
        position: "absolute",
        bottom: 80,
        left: spacing.lg,
        right: spacing.lg,
        backgroundColor: colors.foamWhite,
        borderRadius: radius.md,
        padding: spacing.lg,
        ...shadows.md,
    },
    infoClose: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 5,
        padding: 4,
    },
    infoHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        marginBottom: 6,
        paddingRight: 24,
    },
    infoDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    infoTitle: {
        fontSize: typography.h3.fontSize,
        fontWeight: typography.h3.fontWeight,
        color: colors.rockDark,
    },
    infoDesc: {
        fontSize: typography.body.fontSize,
        color: colors.graniteGrey,
        lineHeight: 20,
        marginBottom: spacing.sm,
    },
    infoMetaRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        flexWrap: "wrap",
    },
    infoMeta: {
        fontSize: 12,
        fontWeight: "600",
        color: colors.seaBlue,
    },
    accessBadge: {
        backgroundColor: "rgba(74,124,89,0.12)",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
    },
    accessText: {
        fontSize: 11,
        fontWeight: "700",
        color: colors.kelpGreen,
    },
});
