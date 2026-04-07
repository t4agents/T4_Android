import React from 'react';
import { ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { darkTheme, lightTheme } from '../constants/theme';
import { getOnboardingScreenStyles } from '../constants/styles';
import { colors } from '../constants/colors';

const pendingDocs = [
    { name: 'Jordan Lee', doc: 'T4 + SIN card', status: 'Needs review' },
    { name: 'Priya Patel', doc: 'Direct deposit form', status: 'Ready' },
    { name: 'Luis Martinez', doc: 'Offer letter', status: 'Missing signature' },
];

export const OnboardingScreen: React.FC = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? 'dark' : 'light';
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
    const styles = getOnboardingScreenStyles(currentTheme);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>Onboarding</Text>
                    <Text style={styles.subtitle}>Scan and verify employee documents in minutes.</Text>
                </View>

                <View style={styles.scanCard}>
                    <View style={styles.scanIcon}>
                        <Ionicons name="scan" size={26} color="#fff" />
                    </View>
                    <View style={styles.scanText}>
                        <Text style={styles.scanTitle}>Smart Scan</Text>
                        <Text style={styles.scanSubtitle}>
                            Extract data from T4s, IDs, and bank forms automatically.
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.scanButton} onPress={() => {}}>
                        <Ionicons name="camera-outline" size={18} color="#fff" />
                        <Text style={styles.scanButtonText}>Scan</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Import Options</Text>
                    <View style={styles.importGrid}>
                        <TouchableOpacity style={styles.importCard} onPress={() => {}}>
                            <Ionicons name="cloud-upload-outline" size={20} color={colors.main} />
                            <Text style={styles.importTitle}>Upload CSV</Text>
                            <Text style={styles.importSubtitle}>Bulk employee list</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.importCard} onPress={() => {}}>
                            <Ionicons name="document-text-outline" size={20} color={colors.main} />
                            <Text style={styles.importTitle}>Offer Letters</Text>
                            <Text style={styles.importSubtitle}>Auto-extract details</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.importCard} onPress={() => {}}>
                            <Ionicons name="shield-checkmark-outline" size={20} color={colors.main} />
                            <Text style={styles.importTitle}>Verify IDs</Text>
                            <Text style={styles.importSubtitle}>Instant validation</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.importCard} onPress={() => {}}>
                            <Ionicons name="mail-outline" size={20} color={colors.main} />
                            <Text style={styles.importTitle}>Send Invite</Text>
                            <Text style={styles.importSubtitle}>Self-serve onboarding</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Pending Review</Text>
                        <TouchableOpacity onPress={() => {}}>
                            <Text style={styles.sectionLink}>See all</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.pendingCard}>
                        {pendingDocs.map((doc, index) => (
                            <View
                                key={doc.name}
                                style={[
                                    styles.pendingRow,
                                    index < pendingDocs.length - 1 ? styles.pendingRowSpacing : null
                                ]}
                            >
                                <View style={styles.pendingIcon}>
                                    <Ionicons name="document-text-outline" size={18} color={currentTheme.colors.textSecondary} />
                                </View>
                                <View style={styles.pendingText}>
                                    <Text style={styles.pendingName}>{doc.name}</Text>
                                    <Text style={styles.pendingDoc}>{doc.doc}</Text>
                                </View>
                                <View style={[styles.pendingStatus, doc.status === 'Ready' ? styles.statusReady : doc.status === 'Needs review' ? styles.statusReview : styles.statusMissing]}>
                                    <Text style={styles.pendingStatusText}>{doc.status}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
