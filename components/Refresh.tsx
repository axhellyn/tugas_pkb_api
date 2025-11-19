import React, { useState, useCallback } from 'react';
import { View, FlatList, Text, StyleSheet, RefreshControl } from 'react-native';

// Import interface DataItem yang telah kita definisikan
interface DataItem {
  id: string;
  title: string;
}

// Data awal dengan tipe DataItem[]
const INITIAL_DATA: DataItem[] = [
  { id: '1', title: 'Data Awal - Item 1' },
  { id: '2', title: 'Data Awal - Item 2' },
  { id: '3', title: 'Data Awal - Item 3' },
];

const PullToRefreshExampleTS: React.FC = () => {
  // State diinisialisasi dengan tipe boolean dan DataItem[]
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [data, setData] = useState<DataItem[]>(INITIAL_DATA);

  // --- Fungsi Simulasi API ---
  const loadNewData = (): Promise<DataItem[]> => {
    return new Promise(resolve => {
      // Tambahkan item baru dan jeda untuk simulasi loading
      setTimeout(() => {
        const timestamp = new Date().toLocaleTimeString();
        
        // Pastikan objek baru sesuai dengan tipe DataItem
        const newItem: DataItem = { 
            id: String(Date.now()), 
            title: `Data Diperbarui pada ${timestamp}` 
        };
        
        // Data baru akan diletakkan di atas data lama
        const newData: DataItem[] = [newItem, ...INITIAL_DATA]; 
        resolve(newData);
      }, 2000); // Jeda 2 detik
    });
  };

  // --- Fungsi Refresh Utama ---
  // Menggunakan useCallback untuk performa
  const onRefresh = useCallback(async () => {
    setRefreshing(true); // Mulai loading
    
    const newData = await loadNewData();
    setData(newData); // Update data

    setRefreshing(false); // Selesai loading
  }, []);

  // --- Render Item ---
  // Menentukan tipe `item` secara eksplisit sebagai DataItem
  const renderItem = ({ item }: { item: DataItem }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      // Implementasi RefreshControl
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#007AFF"
          progressBackgroundColor="#F8F8F8"
          colors={['#007AFF']}
        />
      }
    />
  );
};

// ... (Styling)

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default PullToRefreshExampleTS;