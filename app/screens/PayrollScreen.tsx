import React from 'react';
import { ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { darkTheme, lightTheme } from '../constants/theme';
import { getPayrollScreenStyles } from '../constants/styles';
import { colors } from '../constants/colors';

const upcomingRuns = [
    { date: 'Apr 15, 2026', status: 'Ready', total: '$128,400', employees: 42 },
    { date: 'Apr 29, 2026', status: 'Draft', total: '$127,100', employees: 42 },
];

const tasks = [
    { title: 'Approve timesheets', detail: '8 pending approvals', tone: 'warning' as const },
    { title: 'Review garnishments', detail: '1 update required', tone: 'error' as const },
    { title: 'Sync benefits', detail: 'Last sync 2 hours ago', tone: 'success' as const },
];

export const PayrollScreen: React.FC = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? 'dark' : 'light';
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
    const styles = getPayrollScreenStyles(currentTheme);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>Payroll Runs</Text>
                    <TouchableOpacity style={styles.runButton} onPress={() => {}}>
                        <Ionicons name="play" size={18} color="#fff" />
                        <Text style={styles.runButtonText}>Run Payroll</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Upcoming Runs</Text>
                    {upcomingRuns.map((run) => (
                        <View key={run.date} style={styles.runCard}>
                            <View>
                                <Text style={styles.runDate}>{run.date}</Text>
                                <Text style={styles.runMeta}>{run.employees} employees · {run.total}</Text>
                            </View>
                            <View style={styles.runStatus}>
                                <View style={[styles.statusDot, { backgroundColor: run.status === 'Ready' ? currentTheme.colors.success : colors.main }]} />
                                <Text style={styles.runStatusText}>{run.status}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payroll Tasks</Text>
                    <View style={styles.taskCard}>
                        {tasks.map((task, index) => (
                            <View
                                key={task.title}
                                style={[
                                    styles.taskRow,
                                    index < tasks.length - 1 ? styles.taskRowSpacing : null
                                ]}
                            >
                                <Ionicons
                                    name={task.tone === 'success' ? 'checkmark-circle' : task.tone === 'warning' ? 'alert-circle' : 'alert'}
                                    size={18}
                                    color={task.tone === 'success' ? currentTheme.colors.success : task.tone === 'warning' ? currentTheme.colors.warning : currentTheme.colors.error}
                                />
                                <View style={styles.taskText}>
                                    <Text style={styles.taskTitle}>{task.title}</Text>
                                    <Text style={styles.taskDetail}>{task.detail}</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={16} color={currentTheme.colors.textSecondary} />
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Team Snapshot</Text>
                    <View style={styles.snapshotCard}>
                        <View style={styles.snapshotItem}>
                            <Text style={styles.snapshotLabel}>Active</Text>
                            <Text style={styles.snapshotValue}>39</Text>
                        </View>
                        <View style={styles.snapshotDivider} />
                        <View style={styles.snapshotItem}>
                            <Text style={styles.snapshotLabel}>On Leave</Text>
                            <Text style={styles.snapshotValue}>2</Text>
                        </View>
                        <View style={styles.snapshotDivider} />
                        <View style={styles.snapshotItem}>
                            <Text style={styles.snapshotLabel}>New Hires</Text>
                            <Text style={styles.snapshotValue}>1</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
