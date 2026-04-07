// App.tsx
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme, StatusBar } from 'react-native';
import "./global.css";
import { Ionicons } from '@expo/vector-icons';
import { darkTheme, lightTheme } from './app/constants/theme';
import { HomeScreen } from './app/screens/HomeScreen';
import { PayrollScreen } from './app/screens/PayrollScreen';
import { OnboardingScreen } from './app/screens/OnboardingScreen';
import { SettingsScreen } from './app/screens/SettingsScreen';
import { SettingsProvider } from './app/contexts/SettingsContext';
import { RootTabParamList } from './app/types/navigation';
const Tab = createBottomTabNavigator<RootTabParamList>();

const TabNavigator = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? 'dark' : 'light';
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Payroll') {
                        iconName = focused ? 'cash' : 'cash-outline';
                    } else if (route.name === 'Onboarding') {
                        iconName = focused ? 'scan' : 'scan-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    } else {
                        iconName = 'help-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: currentTheme.colors.primary,
                tabBarInactiveTintColor: currentTheme.colors.textSecondary,
                tabBarStyle: {
                    backgroundColor: currentTheme.colors.surface,
                    borderTopColor: currentTheme.colors.border,
                    borderTopWidth: 1,
                    elevation: 0,
                    shadowOpacity: 0,
                    shadowRadius: 0,
                    shadowOffset: { width: 0, height: 0 },
                },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
            <Tab.Screen name="Payroll" component={PayrollScreen} options={{ title: 'Payroll' }} />
            <Tab.Screen name="Onboarding" component={OnboardingScreen} options={{ title: 'Onboarding' }} />
            <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />

        </Tab.Navigator>
    );
};

export default function App() {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? 'dark' : 'light';

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SettingsProvider>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
                        <TabNavigator />
                    </NavigationContainer>
                </SafeAreaProvider>
            </SettingsProvider>
        </GestureHandlerRootView>
    );
}
