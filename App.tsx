// App.tsx
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme, StatusBar } from 'react-native';
import "./global.css";
import { Ionicons } from '@expo/vector-icons';
import { darkTheme, lightTheme } from './app/constants/theme';
import { WeatherScreen } from './app/screens/WeatherScreen';
import { SettingsScreen } from './app/screens/SettingsScreen';
import { SettingsProvider } from './app/contexts/SettingsContext';
import { BackgroundProvider } from './app/contexts/BackgroundContext';
import { CaptureStormScreen } from './app/screens/CaptureStormScreen';
import { StormListScreen } from './app/screens/StormListScreen';
import { StormDetailScreen } from './app/screens/StormDetailScreen';
import { RootTabParamList, StormStackParamList } from './app/types/navigation';
import { WeatherProvider } from './app/contexts/WeatherContext';


const Stack = createNativeStackNavigator<StormStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const StormStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="StormList" component={StormListScreen} />
            <Stack.Screen name="CaptureStorm" component={CaptureStormScreen} />
            <Stack.Screen name="StormDetail" component={StormDetailScreen} />
        </Stack.Navigator>
    );
};


const TabNavigator = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? 'dark' : 'light';
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;

                    if (route.name === 'Weather') {
                        iconName = focused ? 'partly-sunny' : 'partly-sunny-outline';
                    } else if (route.name === 'Storms') {
                        iconName = focused ? 'thunderstorm' : 'thunderstorm-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    } else {
                        iconName = 'help-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#1e293b',
                tabBarInactiveTintColor: '#64748b',
                tabBarStyle: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderTopColor: 'rgba(255, 255, 255, 0.3)',
                    borderTopWidth: 1,
                    elevation: 0,
                    shadowOpacity: 0,
                    shadowRadius: 0,
                    shadowOffset: { width: 0, height: 0 },
                },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Weather" component={WeatherScreen} options={{ title: 'Weather' }} />
            <Tab.Screen name="Storms" component={StormStack} options={{ title: 'Nota' }} />
            <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />

        </Tab.Navigator>
    );
};

export default function App() {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? 'dark' : 'light';
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <WeatherProvider>
                <SettingsProvider>
                    <BackgroundProvider>
                        <SafeAreaProvider>
                            <NavigationContainer>
                                <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
                                <TabNavigator />
                            </NavigationContainer>
                        </SafeAreaProvider>
                    </BackgroundProvider>
                </SettingsProvider>
            </WeatherProvider>
        </GestureHandlerRootView>
    );
}
