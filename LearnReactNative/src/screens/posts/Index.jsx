//import component React Native
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';

//import hook
import React, {useState, useEffect, useRef} from 'react';

//import api
import Api from '../../services/api';

//import BACKEND_API_URL from .env file
import {BACKEND_API_URL} from '@env';

const PRIMARY = '#2F80C8';

export default function PostIndex({navigation}) {
  //init state
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  //ref untuk scroll ke atas
  const scrollRef = useRef(null);

  //method fetchDataPosts
  const fetchDataPosts = async () => {
    setLoading(true);
    try {
      const response = await Api.get('/api/posts');
      setPosts(response.data.data);
    } catch (error) {
      console.log('ERROR:', error.message);
      ToastAndroid.show('Gagal memuat data', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataPosts();
  }, []);

  //method deletePost
  const deletePost = async id => {
    try {
      await Api.delete(`/api/posts/${id}`);
      fetchDataPosts();
      ToastAndroid.show('Teman berhasil dihapus!', ToastAndroid.LONG);
    } catch (error) {
      console.log('ERROR:', error.message);
      ToastAndroid.show('Gagal menghapus', ToastAndroid.SHORT);
    }
  };

  //konfirmasi sebelum hapus
  const confirmDelete = (id, title) => {
    Alert.alert('Hapus Teman', `Yakin mau hapus "${title}"?`, [
      {text: 'Batal', style: 'cancel'},
      {text: 'Hapus', style: 'destructive', onPress: () => deletePost(id)},
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />

      {/* Header biru */}
      <View style={styles.header}>
        <Text style={styles.headerSmall}>Aji's Friends</Text>
        <Text style={styles.headerTitle}>Daftar Teman Teman Aji</Text>
      </View>

      {/* List */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Daftar Teman</Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color={PRIMARY}
            style={{marginTop: 30}}
          />
        ) : (
          <ScrollView
            ref={scrollRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 110}}>
            {posts.length === 0 && (
              <Text style={styles.empty}>Belum ada teman, tambah dulu yuk!</Text>
            )}

            {posts.map(post => (
              <View key={post.id} style={styles.row}>
                <Image
                  source={{uri: `${BACKEND_API_URL}/uploads/${post.image}`}}
                  style={styles.avatar}
                />

                <View style={styles.content}>
                  <Text style={styles.name} numberOfLines={1}>
                    {post.title}
                  </Text>
                  <Text style={styles.subtitle} numberOfLines={1}>
                    {post.content}
                  </Text>
                  <View style={styles.actions}>
                    <TouchableOpacity
                      onPress={() => navigation.push('PostEdit', {id: post.id})}>
                      <Text style={styles.actionEdit}>Edit</Text>
                    </TouchableOpacity>
                    <Text style={styles.dot}>•</Text>
                    <TouchableOpacity
                      onPress={() => confirmDelete(post.id, post.title)}>
                      <Text style={styles.actionDelete}>Hapus</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.check}>
                  <Text style={styles.checkText}>✓</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Tombol bawah */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.push('PostCreate')}>
          <Text style={styles.addButtonText}>+ Tambah Teman</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.upButton}
          onPress={() => scrollRef.current?.scrollTo({y: 0, animated: true})}>
          <Text style={styles.upText}>︿</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },
  header: {
    backgroundColor: PRIMARY,
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 22,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerSmall: {
    color: '#D6E8F8',
    fontSize: 13,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: -35,
    marginHorizontal: 16,
    borderRadius: 26,
    paddingHorizontal: 18,
    paddingTop: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1B2B3A',
    marginBottom: 8,
  },
  empty: {
    textAlign: 'center',
    color: '#8A97A5',
    marginTop: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF1F5',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 14,
    backgroundColor: '#E3E9F0',
    borderWidth: 2,
    borderColor: '#E3EEF9',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B2B3A',
  },
  subtitle: {
    fontSize: 12,
    color: '#8A97A5',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  actionEdit: {
    color: PRIMARY,
    fontSize: 13,
    fontWeight: '600',
  },
  actionDelete: {
    color: '#E5484D',
    fontSize: 13,
    fontWeight: '600',
  },
  dot: {
    marginHorizontal: 8,
    color: '#B8C2CC',
  },
  check: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  checkText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 24,
    left: 28,
    right: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 14,
    elevation: 6,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  upButton: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  upText: {
    color: PRIMARY,
    fontSize: 20,
    fontWeight: 'bold',
  },
});