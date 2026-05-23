/**
 * RESTAURANTS SCREEN
 * Lista över restauranger med sök och filterchips.
 */

import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Search } from "lucide-react-native";
import { colors, radius, spacing, typography } from "../theme";
import { MOCK_RESTAURANTS, filterPlaces, Place } from "../data/places";
import PlaceCard from "../components/PlaceCard";

const FILTERS = [
  { key: "all",      label: "Alla" },
  { key: "Mat",      label: "Mat" },
  { key: "Skaldjur", label: "Skaldjur" },
  { key: "Fika",     label: "Fika" },
  { key: "Bar",      label: "Bar" },
];

interface Props {
  navigation: any;
}

export default function RestaurantsScreen({ navigation }: Props) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let list = filterPlaces(MOCK_RESTAURANTS, activeFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    return list;
  }, [activeFilter, searchQuery]);

  const handlePress = useCallback(
    (place: Place) => navigation.navigate("PlaceDetail", { place }),
    [navigation]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Restauranger</Text>
        <View style={styles.searchBar}>
          <Search size={15} color={colors.granite} />
          <TextInput
            style={styles.searchInput}
            placeholder="Sök restaurang..."
            placeholderTextColor={colors.granite}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View style={styles.chips}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f.key}
              style={[styles.chip, activeFilter === f.key && styles.chipActive]}
              onPress={() => setActiveFilter(f.key)}
              activeOpacity={0.8}
            >
              <Text style={[styles.chipText, activeFilter === f.key && styles.chipTextActive]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaceCard place={item} onPress={handlePress} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.empty}>Inga restauranger hittades.</Text>}
      />
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
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.shell,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
  },
  searchInput: { flex: 1, fontSize: 14, color: colors.rockDark },
  chips: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.sm, flexWrap: "wrap" },
  chip: { backgroundColor: colors.sand, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 5 },
  chipActive: { backgroundColor: colors.seaBlue },
  chipText: { fontSize: 12, fontWeight: "600", color: colors.granite },
  chipTextActive: { color: colors.white },
  list: { padding: spacing.lg, gap: spacing.md, paddingBottom: 100 },
  empty: { textAlign: "center", color: colors.granite, marginTop: 40, fontSize: 14 },
});
