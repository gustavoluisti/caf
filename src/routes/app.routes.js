import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DocumentDetector } from '../screens/DocumentDetector';
import { PassiveFaceLiveness } from '../screens/PassiveFaceLiveness';

import { FaceAuthenticator } from '../screens/FaceAuthenticator';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#5636D3',
                tabBarInactiveTintColor: '#FF872C',
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    height: 88,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                }
            }}
        >
            <Screen name="Document" component={DocumentDetector}/>
            <Screen name="PassiveFaceLiveness" component={PassiveFaceLiveness} />
            <Screen name="FaceAuthenticator" component={FaceAuthenticator} />
        </Navigator>
    )
}