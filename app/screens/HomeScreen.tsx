import React from 'react';
import { ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../constants/colors';
import { darkTheme, lightTheme } from '../constants/theme';
import { getHomeScreenStyles } from '../constants/styles';

const quickActions = [
    { title: 'Scan T4 / IDs', subtitle: 'Auto-fill onboarding', icon: 'scan-outline' as const },
    { title: 'Add Employee', subtitle: 'Invite or bulk import', icon: 'person-add-outline' as const },
    { title: 'Run Payroll', subtitle: 'Next run Apr 15, 2026', icon: 'cash-outline' as const },
    { title: 'Send Payslips', subtitle: 'Secure delivery', icon: 'paper-plane-outline' as const },
];

const insights = [
    { title: 'Overtime trending up', detail: '+8% vs last cycle', tone: 'warning' as const },
    { title: 'Missing tax IDs', detail: '3 employees need SIN', tone: 'error' as const },
    { title: 'On-track for payday', detail: 'All approvals complete', tone: 'success' as const },
];

export const HomeScreen: React.FC = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? 'dark' : 'light';
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
    const styles = getHomeScreenStyles(currentTheme);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.eyebrow}>Good morning</Text>
                        <Text style={styles.title}>Northwind Payroll</Text>
                        <Text style={styles.subtitle}>All your people, one AI-first hub.</Text>
                    </View>
                    <View style={styles.avatar}>
                        <Ionicons name="sparkles" size={20} color="#fff" />
                    </View>
                </View>

                <LinearGradient
                    colors={[colors.main, '#FFB45E', '#FFD6A1']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.askCard}
                >
                    <Text style={styles.askTitle}>Ask Payroll AI</Text>
                    <Text style={styles.askSubtitle}>
                        From “What is a T4?” to “Run payroll for Apr 15”.
                    </Text>

                    <TouchableOpacity style={styles.searchBar} onPress={() => {}}>
                        <Ionicons name="sparkles-outline" size={18} color={currentTheme.colors.textSecondary} style={styles.searchIcon} />
                        <Text style={styles.searchPlaceholder}>Ask about payroll, taxes, or onboarding…</Text>
                        <View style={styles.searchActions}>
                            <Ionicons name="mic-outline" size={18} color={currentTheme.colors.textSecondary} />
                            <Ionicons name="scan-outline" size={18} color={currentTheme.colors.textSecondary} style={styles.searchActionIcon} />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.askChips}>
                        <View style={styles.chip}>
                            <Text style={styles.chipText}>Explain payroll taxes</Text>
                        </View>
                        <View style={styles.chip}>
                            <Text style={styles.chipText}>Set up bi-weekly run</Text>
                        </View>
                    </View>
                </LinearGradient>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Quick Actions</Text>
                        <TouchableOpacity onPress={() => {}}>
                            <Text style={styles.sectionLink}>Customize</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.actionGrid}>
                        {quickActions.map((action) => (
                            <TouchableOpacity key={action.title} style={styles.actionCard} onPress={() => {}}>
                                <View style={styles.actionIcon}>
                                    <Ionicons name={action.icon} size={20} color={colors.main} />
                                </View>
                                <Text style={styles.actionTitle}>{action.title}</Text>
                                <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payroll Snapshot</Text>
                    <View style={styles.snapshotCard}>
                        <View style={styles.snapshotRow}>
                            <View style={styles.snapshotItem}>
                                <Text style={styles.snapshotLabel}>Next Run</Text>
                                <Text style={styles.snapshotValue}>Apr 15, 2026</Text>
                            </View>
                            <View style={styles.snapshotItem}>
                                <Text style={styles.snapshotLabel}>Employees</Text>
                                <Text style={styles.snapshotValue}>42</Text>
                            </View>
                        </View>
                        <View style={styles.snapshotRow}>
                            <View style={styles.snapshotItem}>
                                <Text style={styles.snapshotLabel}>Gross Pay</Text>
                                <Text style={styles.snapshotValue}>$128,400</Text>
                            </View>
                            <View style={styles.snapshotItem}>
                                <Text style={styles.snapshotLabel}>Taxes Due</Text>
                                <Text style={styles.snapshotValue}>$31,220</Text>
                            </View>
                        </View>
                        <View style={styles.snapshotFooter}>
                            <Ionicons name="checkmark-circle" size={18} color={currentTheme.colors.success} />
                            <Text style={styles.snapshotFooterText}>All approvals complete</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>AI Insights</Text>
                    <View style={styles.insightsCard}>
                        {insights.map((insight, index) => (
                            <View
                                key={insight.title}
                                style={[
                                    styles.insightRow,
                                    index < insights.length - 1 ? styles.insightRowSpacing : null
                                ]}
                            >
                                <View style={styles.insightIcon}>
                                    <Ionicons
                                        name={insight.tone === 'success' ? 'trending-up' : insight.tone === 'warning' ? 'alert-circle' : 'alert'}
                                        size={18}
                                        color={insight.tone === 'success' ? currentTheme.colors.success : insight.tone === 'warning' ? currentTheme.colors.warning : currentTheme.colors.error}
                                    />
                                </View>
                                <View style={styles.insightText}>
                                    <Text style={styles.insightTitle}>{insight.title}</Text>
                                    <Text style={styles.insightDetail}>{insight.detail}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
