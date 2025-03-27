import { View } from '@library/View';

import { HomeLayout } from '@/pages/home/home';
import StoreProvider from '@/provider/storeProvider';

export default function HomePage() {
    return (
        <StoreProvider>
            <View as={'main'}>
                <HomeLayout />
            </View>
        </StoreProvider>
    );
}
